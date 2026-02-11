sap.ui.define([
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/base/Log"
], (MessageToast, MessageBox, Log) => {
  "use strict";

  return ({
    onProductsTableV4SelectedItemsChanged(oEvent) {
      this.configModel.setProperty("/isDeleteButtonEnabled", !!oEvent.getSource().getSelectedItems().length);
    },

    onOpenProductsV4DeleteConfirmationDialog() {
      const oBundle = this.getView().getModel("i18n").getResourceBundle();

      MessageBox.confirm(oBundle.getText("productsDeleteConfirmationDialogText"), {
        actions: [MessageBox.Action.YES, MessageBox.Action.CLOSE],
        onClose: (sAction) => {
          if (sAction === MessageBox.Action.YES) {
            this.onDeleteV4Products();
          }
        },
      });
    },

    async onDeleteV4Products() {
      const oList = this.byId("productsListV4");
      const aProductContexts = oList.getSelectedItems().map((item) => item.getBindingContext("DataV4"));

      try {
        aProductContexts.forEach((product) => product.delete("defferedGroup"));

        await this.dataV4Model.submitBatch("defferedGroup");

        const sSuccessMsg = this.oBundle.getText(oList.getSelectedItems().length > 1 ? "deletionSuccessMessagePlural" : "deletionSuccessMessage");
        MessageToast.show(sSuccessMsg);
      } catch {
        const sErrorMsg = this.oBundle.getText("deletionErrorMessage");
        MessageBox.error(sErrorMsg)
      }

      oList.removeSelections();
    },
  });
});