sap.ui.define([
  "project1/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox",
  "sap/base/Log"
], (BaseController, JSONModel, Filter, FilterOperator, MessageBox, Log) => {
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
        booksSelectedItems: [],
        newBookData: {},
      });

      this.getView().setModel(this.oBookModel, "booksModel");
    },

    onAddRecord({ name, author, genre, availableQuantity, releaseDate }) {
      const oList = this.byId("booksList");
      const oBinding = oList.getBinding("items");
      const oModel = this.getBooksModel();

      const aUpdatedBooksList = [...oBinding.getContexts().map(el => el.getObject()), {
        ID: `${Math.floor(Math.random() * 10000)}`,
        Name: name,
        Author: author,
        Genre: genre,
        ReleaseDate: new Date(releaseDate),
        AvailableQuantity: availableQuantity,
        isEditable: false
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

    onOpenDeletionRecordConfirmationDialog(oEvent) {
      const oBundle = this.getView().getModel("i18n").getResourceBundle();

      MessageBox.confirm(oBundle.getText("confirmationDialogText"), {
        actions: [MessageBox.Action.YES, MessageBox.Action.CLOSE],
        onClose: (sAction) => {
          if (sAction === MessageBox.Action.YES) {
            this.onDeleteRecord(oEvent);
          }
        },
      });
    },

    onBooksTableSelectedItemsChanged(oEvent) {
      const oModel = this.getBooksModel();
      oModel.setProperty("/booksSelectedItems", oEvent.getSource().getSelectedItems());
    },

    async onOpenBookCreationDialog() {
      try {
        this.oBookCreationDialog ??= await this.loadFragment({
          name: "project1.view.BookCreationDialog"
        });

        this.oBookCreationDialog.open();
      } catch {
        Log.error("Cannot load book creation dialog");
      }
    },

    onSubmitBookCreation() {
      const oModel = this.getBooksModel();
      
      const name = oModel.getProperty("/newBookData/Name");
      const author = oModel.getProperty("/newBookData/Author");
      const genre = oModel.getProperty("/newBookData/Genre");
      const releaseDate = oModel.getProperty("/newBookData/ReleaseDate");
      const availableQuantity = oModel.getProperty("/newBookData/AvailableQuantity");

      if (!name || !author || !genre || !releaseDate || !availableQuantity) {
        const oBundle = this.getView().getModel("i18n").getResourceBundle();
        let sMsg = oBundle.getText("bookCreationDialogAddItemError");

        if (!releaseDate) {
          sMsg = oBundle.getText("bookCreationDialogReleaseDateError");
        }

        MessageToast.show(sMsg);
      } else {
        this.onAddRecord({ name, author, genre, availableQuantity, releaseDate });
        this.byId("bookCreationDialog").close();
      }
    },

    onCancelBookCreation() {
      this.byId("bookCreationDialog").close();
    },

    onChangeBookCreationDialogNameInput(oEvent) {
      const oModel = this.getBooksModel();
      oModel.setProperty("/newBookData/Name", oEvent.getSource().getValue());
    },

    onChangeBookCreationDialogAuthorInput(oEvent) {
      const oModel = this.getBooksModel();
      oModel.setProperty("/newBookData/Author", oEvent.getSource().getValue());
    },

    onChangeBookCreationDialogGenreInput(oEvent) {
      const oModel = this.getBooksModel();
      oModel.setProperty("/newBookData/Genre", oEvent.getSource().getValue());
    },

    onChangeBookCreationDialogReleaseDateInput(oEvent) {
      const oModel = this.getBooksModel();
      oModel.setProperty("/newBookData/ReleaseDate", oEvent.getSource().getValue());
    },

    onChangeBookCreationDialogAvailableQuantityInput(oEvent) {
      const oModel = this.getBooksModel();
      oModel.setProperty("/newBookData/AvailableQuantity", oEvent.getSource().getValue());
    }
  });
});