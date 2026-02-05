sap.ui.define([
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], (MessageToast, MessageBox) => {
  "use strict";

  return ({
    onBooksTableV2SelectedItemsChanged(oEvent) {
      this.oConfigModel.setProperty("/booksSelectedItems", oEvent.getSource().getSelectedItems());
    },

    onDeleteV2Books() {
      const oModel = this.getView().getModel("oDataV2");
      const oList = this.byId("booksListV2");
      this.oBundle = this.getView().getModel("i18n").getResourceBundle();
      const selectedIDs = oList?.getSelectedContexts().map(record => record.getObject()?.["ID"]);
      oModel.setDeferredGroups(["deleteGroup"]);

      oList?.getSelectedContexts()?.forEach((oContext, index) => {
        oModel.remove(oContext.getPath(), {
          groupId: "deleteGroup"
        });
      });

      const sSuccessMsg = this.oBundle.getText(selectedIDs.length > 1 ? "deletionSuccessMessagePlural" : "deletionSuccessMessage");
      const sErrorMsg = this.oBundle.getText("deletionErrorMessage");

      oModel.submitChanges({
        groupId: "deleteGroup",
        success: () => MessageToast.show(sSuccessMsg),
        error: () => MessageBox.error(sErrorMsg),
      });

      oList.removeSelections();
    }
  });
});