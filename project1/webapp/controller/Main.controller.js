sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("project1.controller.Main", {
    onInit() {
      const oBookModel = new JSONModel({
        books: [
          {
            ID: "1",
            Name: "Sherlock Holmes Series",
            Author: "Arthur Conan Doyle",
            Genre: "Detective fiction",
            ReleaseDate: 2590363440000,
            AvailableQuantity: 1
          },
          {
            ID: "2",
            Name: "Hercule Poirot",
            Author: "Agatha Christie",
            Genre: "Detective fiction",
            ReleaseDate: 1554256800000,
            AvailableQuantity: 5
          },
          {
            ID: "3",
            Name: "Alice's Adventures in Wonderland",
            Author: "Lewis Carroll",
            Genre: "Children's fiction",
            ReleaseDate: 510202800000,
            AvailableQuantity: 10
          },
          {
            ID: "4",
            Name: "Fahrenheit 451",
            Author: "Ray Bradbury",
            Genre: "Dystopian",
            ReleaseDate: 511326000000,
            AvailableQuantity: 3
          },
          {
            ID: "5",
            Name: "1984",
            Author: "George Orwell",
            Genre: "Dystopian",
            ReleaseDate: 522817200000,
            AvailableQuantity: 15
          }
        ]
      });

      this.getView().setModel(oBookModel, "books");
    },

    onBeforeRendering: function () {
    },

    onAfterRendering: function () {
    },

    onExit: function () {
    },
  });
});