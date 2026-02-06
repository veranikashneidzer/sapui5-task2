sap.ui.define([
  "project1/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "./parts/JSONModelTab",
  "./parts/ODataV2ModelTab",
  "./parts/ODataV4ModelTab",
], (BaseController, JSONModel, JSONModelTab, ODataV2ModelTab, ODataV4ModelTab) => {
  "use strict";

  return BaseController.extend("project1.controller.Main", Object.assign({}, JSONModelTab, ODataV2ModelTab, ODataV4ModelTab, {
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

      this.oModel = this.getBooksModel();

      this.configModel = new JSONModel({
        productsSelectedItems: [],
        isNewProductValid: false,
        newProductData: {
          isNameValid: false,
          isDescriptionValid: false,
          isRatingValid: false,
          isPriceValid: false,
          isReleaseDateValid: false,
          isDiscontinuedDateValid: false,
        },
      });

      this.getView().setModel(this.configModel, "configModel");

      this.configModel = this.getConfigModel();

      this.dataV2Model = this.getOwnerComponent().getModel("DataV2");

      this.oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },
  }))
});