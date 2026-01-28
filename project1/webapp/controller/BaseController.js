sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.BaseController", {
        getBooksModel() {
            return this.getView().getModel("books");
        },

        setBooksModelProperty(propertyName = '/books', propertyValue) {
            const oModel = this.getBooksModel();
            oModel.setProperty(propertyName, propertyValue);
        },
    });
});