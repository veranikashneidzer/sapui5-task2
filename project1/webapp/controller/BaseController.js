sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.BaseController", {
        getBooksModel() {
            return this.getView().getModel("booksModel");
        },

        getODataV2BooksModel() {
            return this.getView().getModel("oDataV2BooksModel");
        },
    });
});