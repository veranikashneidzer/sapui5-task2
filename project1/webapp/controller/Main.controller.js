sap.ui.define([
  "project1/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], (BaseController, JSONModel, Filter, FilterOperator) => {
  "use strict";

  return BaseController.extend("project1.controller.Main", {
    onInit() {
      const aBooks = [
        {
          ID: "0",
          Name: "Sherlock Holmes Series",
          Author: "Arthur Conan Doyle",
          Genre: "Detective fiction",
          ReleaseDate: 2590363440000,
          AvailableQuantity: 1
        },
        {
          ID: "1",
          Name: "Hercule Poirot",
          Author: "Agatha Christie",
          Genre: "Detective fiction",
          ReleaseDate: 1554256800000,
          AvailableQuantity: 5
        },
        {
          ID: "2",
          Name: "Alice's Adventures in Wonderland",
          Author: "Lewis Carroll",
          Genre: "Children's fiction",
          ReleaseDate: 510202800000,
          AvailableQuantity: 10
        },
        {
          ID: "3",
          Name: "Fahrenheit 451",
          Author: "Ray Bradbury",
          Genre: "Dystopian",
          ReleaseDate: 511326000000,
          AvailableQuantity: 3
        },
        {
          ID: "4",
          Name: "1984",
          Author: "George Orwell",
          Genre: "Dystopian",
          ReleaseDate: 522817200000,
          AvailableQuantity: 15
        }
      ];

      const aGenres = [{ key: 0, title: 'All' }, ...Array.from(new Set(aBooks.map(book => book.Genre))).map((genre, index) => ({ key: index + 1, title: genre }))];

      this.oBookModel = new JSONModel({
        books: aBooks.map(book => ({ ...book, Genre: aGenres.find(genre => genre.title === book.Genre) })),
        genres: aGenres,
      });

      this.getView().setModel(this.oBookModel, "books");
    },

    onAddRecord() {
      const oList = this.byId("booksList");
      const oBinding = oList.getBinding("items");

      this.setBooksModelProperty("/books", [...oBinding.getContexts().map(el => el.getObject()), {
        ID: `${Math.floor(Math.random() * 10000)}`,
        Name: "",
        Author: "",
        Genre: "",
        ReleaseDate: new Date(),
        AvailableQuantity: 0
      }
      ]);
      oList.removeSelections();
    },

    onDeleteRecord(oEvent) {
      const oList = this.byId("booksList");
      const oBinding = oList.getBinding("items");
      const selectedIDs = oList?.getSelectedContexts().map(record => record.getObject()?.["ID"]);

      const aUpdatedBooksList = [];

      oBinding.getContexts().forEach(element => {
        if (selectedIDs.every(id => id !== element.getObject()?.["ID"])) {
          aUpdatedBooksList.push(element.getObject());
        }
      });

      this.setBooksModelProperty("/books", aUpdatedBooksList);
      oList.removeSelections();
    },

    onSetSearchedName(oEvent) {
      const sValue = oEvent.getSource().getValue();
      this.setBooksModelProperty("/searchedName", sValue);
    },

    onSetSelectedGenre(oEvent) {
      const selectedKey = oEvent.getSource()?.getSelectedKey();
      this.setBooksModelProperty("/selectedGenre", selectedKey);
    },

    onFilterTable() {
      const oModel = this.getBooksModel();
      const selectedGenre = oModel.getData().selectedGenre;
      const searchedName = oModel.getData().searchedName;

      const oList = this.byId("booksList");
      const oBinding = oList.getBinding("items");

      let aFilterForGenre = [];
      if (selectedGenre) {
        if (selectedGenre === '0') {
          aFilterForGenre = [];
        } else {
          aFilterForGenre.push(new Filter("Genre/key", FilterOperator.EQ, selectedGenre));
        }
      }

      const aFilter = [];
      if (searchedName) {
        aFilter.push(new Filter("Name", FilterOperator.Contains, searchedName));
      }
      oBinding.filter([...aFilterForGenre, ...aFilter]);
    }
  });
});