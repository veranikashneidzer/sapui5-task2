sap.ui.define([
  "sap/m/MessageToast"
], (MessageToast) => {
  "use strict";

  return ({
    onBooksTableV2SelectedItemsChanged(oEvent) {
      this.oDataV2BooksModel.setProperty("/booksSelectedItems", oEvent.getSource().getSelectedItems());
    },

    onDeleteODataV2Books() {
      const oModel = this.getView().getModel("oDataV2");
      const oList = this.byId("booksListV2");

      oList?.getSelectedContexts()?.forEach((oRecord) => {
        oModel.remove(`/Products(${oRecord.getObject()?.["ID"]})`);
      });

      const oBundle = this.getView().getModel("i18n").getResourceBundle();
      const sSuccessMsg = oBundle.getText(selectedIDs.length > 1 ? "deletionSuccessMessagePlural" : "deletionSuccessMessage");
      const sErrorMsg = oBundle.getText("deletionErrorMessage");

      oModel.submitChanges({
        success: () => MessageToast.show(sSuccessMsg),
        error: () => MessageToast.show(sErrorMsg),
      });

      oList.removeSelections();
    }
  });
});