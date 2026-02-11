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

    setCreationDialogV4InitialControlsValueState() {
      const aControls = this.oProductV4DataChangingDialog.getContent()[0].getItems();

      aControls.forEach((oControl) => {
        oControl.setValueState("None");
      });
    },

    async _onOpenProductV4DataChangingDialog(oSource = {}, bIsCreate = true) {
      let oContext = {};

      try {
        if (!this.oProductCreationDialog) {
          this.oProductV4DataChangingDialog ??= await this.loadFragment({
            name: "project1.view.fragments.ProductV4DataChangingDialog",
            id: 'productCreationV4Dialog',
          });
        }

        if (bIsCreate) {
          const oList = this.byId("productsListV4");
          oList.removeSelections();
        }

        this.oProductV4DataChangingDialog.setBindingContext({}, "DataModel");

        this.configModel.setProperty('/buttonSubmitText', this.oBundle.getText(bIsCreate ? "dialogAddButtonText" : "dialogSaveButtonText"));
        this.configModel.setProperty('/headerText', this.oBundle.getText(bIsCreate ? "productCreationDialogHeaderText" : "productEditDialogHeaderText"));
        
        this.setCreationDialogV4InitialControlsValueState();
        this.oProductV4DataChangingDialog.open();
      } catch {
        Log.error("Cannot load product create dialog");
      }
    },

    onOpenProductV4DataCreateDialog() {
      this._onOpenProductV4DataChangingDialog();
    },

    async onSubmitV4Product(oEvent) {
      const sText = oEvent.getSource().getText();
      const bIsCreate = sText === this.oBundle.getText("dialogAddButtonText");

      if (!this.validateDataV4Form()) {
        return;
      }

      const sSuccessMsg = this.oBundle.getText(bIsCreate ? "createSuccessMessage" : "editSuccessMessage");
      const sErrorMsg = this.oBundle.getText(bIsCreate ? "createErrorMessage" : "editErrorMessage");
      const aControls = this.oProductV4DataChangingDialog.getContent()[0].getItems();

      try {
        this.dataV4Model.bindList("/Products").create({
          Name: aControls[0].getValue(),
          Description: aControls[1].getValue(),
          Rating: aControls[2].getValue(),
          Price: aControls[3].getValue(),
          ReleaseDate: aControls[4].getValue(),
          DiscontinuedDate: aControls[5].getValue(),
        });

        await this.dataV4Model.submitBatch("defferedGroup");
        MessageToast.show(sSuccessMsg);
        this.oProductV4DataChangingDialog.close();
        this._resetDialogControlsValues();
        this.byId("productsListV4").getBinding("items").refresh();
      } catch {
        MessageBox.error(sErrorMsg);
      }
    },

    async onOpenProductV4DataEditDialog(oEvent) {
      this._onOpenProductV4DataChangingDialog(oEvent.getSource(), false);
    },

    onCancelProductV4DataChanging() {
      this.oProductV4DataChangingDialog.close();
      this._resetDialogControlsValues();
    },

    _resetDialogControlsValues() {
      const aControls = this.oProductV4DataChangingDialog.getContent()[0].getItems();
      aControls.forEach((oControl) => oControl.setValue(""));
    },

    validateDataV4Form() {
      const aControls = this.oProductV4DataChangingDialog.getContent()[0].getItems();
      let isAllControlsValid = true;

      aControls.forEach((oControl) => {
        const isValid = this._validateControl(oControl);

        if (!isValid) {
          isAllControlsValid = false;
        }
      });

      return isAllControlsValid;
    },
  });
});