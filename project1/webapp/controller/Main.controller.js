sap.ui.define([
  "project1/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast"
], (BaseController, JSONModel, Filter, FilterOperator, MessageToast) => {
  "use strict";

  const CONFIRMATION_TEXT_YES = "yes";

  return BaseController.extend("project1.controller.Main", {
    onInit() {
      const aBooks = [
        {
          ID: "0",
          Name: "Sherlock Holmes Series",
          Author: "Arthur Conan Doyle",
          Genre: "Detective fiction",
          ReleaseDate: 2590363440000,
          AvailableQuantity: 1,
          isEditable: false
        },
        {
          ID: "1",
          Name: "Hercule Poirot",
          Author: "Agatha Christie",
          Genre: "Detective fiction",
          ReleaseDate: 1554256800000,
          AvailableQuantity: 5,
          isEditable: false
        },
        {
          ID: "2",
          Name: "Alice's Adventures in Wonderland",
          Author: "Lewis Carroll",
          Genre: "Children's fiction",
          ReleaseDate: 510202800000,
          AvailableQuantity: 10,
          isEditable: false
        },
        {
          ID: "3",
          Name: "Fahrenheit 451",
          Author: "Ray Bradbury",
          Genre: "Dystopian",
          ReleaseDate: 511326000000,
          AvailableQuantity: 3,
          isEditable: false
        },
        {
          ID: "4",
          Name: "1984",
          Author: "George Orwell",
          Genre: "Dystopian",
          ReleaseDate: 522817200000,
          AvailableQuantity: 15,
          isEditable: false
        }
      ];

      const aGenres = [{ key: 0, title: 'All' }, ...Array.from(new Set(aBooks.map(book => book.Genre))).map((genre, index) => ({ key: index + 1, title: genre }))];

      const oInitialBookModel = aBooks.map(book => ({ ...book, Genre: aGenres.find(genre => genre.title === book.Genre) }));

      this.oBookModel = new JSONModel({
        initialBooks: [...oInitialBookModel].map(bookData => ({ ...bookData })),
        currentBooks: oInitialBookModel,
        genres: aGenres,
        searchedName: '',
        selectedGenre: '',
      });

      this.getView().setModel(this.oBookModel, "booksModel");
    },

    onAddRecord() {
      const oList = this.byId("booksList");
      const oBinding = oList.getBinding("items");
      const oModel = this.getBooksModel();

      const aUpdatedBooksList = [...oBinding.getContexts().map(el => el.getObject()), {
        ID: `${Math.floor(Math.random() * 10000)}`,
        Name: "",
        Author: "",
        Genre: "",
        ReleaseDate: new Date(),
        AvailableQuantity: 0,
        isEditable: true
      }
      ];

      oModel.setProperty("/currentBooks", aUpdatedBooksList);
      oModel.setProperty("/initialBooks", [...aUpdatedBooksList]);
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

      const oModel = this.getBooksModel();
      oModel.setProperty("/currentBooks", aUpdatedBooksList);
      oModel.setProperty("/initialBooks", [...aUpdatedBooksList]);
      oList.removeSelections();
    },

    onSetSearchedName(oEvent) {
      const sValue = oEvent.getSource().getValue();
      const oModel = this.getBooksModel();
      oModel.setProperty("/searchedName", sValue);
    },

    onSetSelectedGenre(oEvent) {
      const selectedKey = oEvent.getSource()?.getSelectedKey();
      const oModel = this.getBooksModel();
      oModel.setProperty("/selectedGenre", selectedKey);
    },

    onFilterTable() {
      const oModel = this.getBooksModel();
      const sSelectedGenre = oModel.getData().selectedGenre;
      const sSearchedName = oModel.getData().searchedName;

      const oList = this.byId("booksList");
      const oBinding = oList.getBinding("items");

      const aFilter = [];
      if (sSelectedGenre) {
        if (sSelectedGenre === '0') {
          aFilter = [];
        } else {
          aFilter.push(new Filter("Genre/key", FilterOperator.EQ, sSelectedGenre));
        }
      }

      if (sSearchedName) {
        aFilter.push(new Filter("Name", FilterOperator.Contains, sSearchedName));
      }
      oBinding.filter(aFilter);
    },

    onEditTitle(oEvent) {
      const oModel = this.getBooksModel();
      const sBookPath = oEvent.getSource().getBindingContext("booksModel").getPath();
      oModel.setProperty(`${sBookPath}/isEditable`, true);
    },

    onSaveTitle(oEvent) {
      const oModel = this.getBooksModel();
      const sBookPath = oEvent.getSource().getBindingContext("booksModel").getPath();

      oModel.setProperty(`${sBookPath}/isEditable`, false);

      const oBooksData = oModel.getProperty("/currentBooks");
      oModel.setProperty("/initialBooks", [...oBooksData].map(bookData => ({ ...bookData })));
    },

    onCancelUpdateTitle(oEvent) {
      const oModel = this.getBooksModel();
      const sBookPath = oEvent.getSource().getBindingContext("booksModel").getPath();
      oModel.setProperty(`${sBookPath}/isEditable`, false);

      const oBooksData = oModel.getProperty("/initialBooks");
      oModel.setProperty("/currentBooks", [...oBooksData].map(bookData => ({ ...bookData })));
    },

    async onOpenDialog(oEvent) {
      const oList = this.byId("booksList");
      const bIsItemSelected = !!oList?.getSelectedContexts()?.length;

      if (bIsItemSelected) {
        this.oDialog ??= await this.loadFragment({
          name: "project1.view.ConfirmationDioalog"
        });

        this.oDialog.open();
      } else {
        const oBundle = this.getView().getModel("i18n").getResourceBundle();
        const sMsg = oBundle.getText("confirmationDialogSelectItemError");

        MessageToast.show(sMsg);
      }

    },

    onCloseDialog(oEvent) {
      if (oEvent.getSource().getProperty("text").toLowerCase() === CONFIRMATION_TEXT_YES) {
        this.onDeleteRecord(oEvent);
      }

      this.byId("confirmationDialog").close();
    }
  });
});