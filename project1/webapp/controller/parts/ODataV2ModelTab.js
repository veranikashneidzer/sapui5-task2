sap.ui.define([
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/base/Log"
], (MessageToast, MessageBox, Log) => {
  "use strict";

  return ({
    onProductsTableV2SelectedItemsChanged(oEvent) {
      this.configModel.setProperty("/productsSelectedItems", oEvent.getSource().getSelectedItems());
    },

    onOpenProductsDeleteConfirmationDialog(oEvent) {
      const oBundle = this.getView().getModel("i18n").getResourceBundle();

      MessageBox.confirm(oBundle.getText("productsDeleteConfirmationDialogText"), {
        actions: [MessageBox.Action.YES, MessageBox.Action.CLOSE],
        onClose: (sAction) => {
          if (sAction === MessageBox.Action.YES) {
            this.onDeleteV2Products();
          }
        },
      });
    },

    onDeleteV2Products() {
      const oList = this.byId("productsListV2");
      const selectedIDs = oList?.getSelectedContexts().map(record => record.getObject()?.["ID"]);
      this.dataV2Model.setDeferredGroups(["deleteGroup"]);

      oList?.getSelectedContexts()?.forEach((oContext, index) => {
        this.dataV2Model.remove(oContext.getPath(), {
          groupId: "deleteGroup"
        });
      });

      const sSuccessMsg = this.oBundle.getText(selectedIDs.length > 1 ? "deletionSuccessMessagePlural" : "deletionSuccessMessage");
      const sErrorMsg = this.oBundle.getText("deletionErrorMessage");

      this.dataV2Model.submitChanges({
        groupId: "deleteGroup",
        success: () => MessageToast.show(sSuccessMsg),
        error: () => MessageBox.error(sErrorMsg),
      });

      oList.removeSelections();
    },

    setCreationDialogInitialControlsValueState() {
      const aControls = this.oProductV2DataChangingDialog.getContent()[0].getItems();

      aControls.forEach((oControl) => {
        oControl.setValueState("None");
      });
    },

    async _onOpenProductV2DataChangingDialog(oSource = {}, bIsCreate = true) {
      let oContext = {};

      try {
        if (!this.oProductCreationDialog) {
          this.oProductV2DataChangingDialog ??= await this.loadFragment({
            name: "project1.view.fragments.ProductV2DataChangingDialog",
            id: 'productCreationV2Dialog',
          });
        }

        if (bIsCreate) {
          const oList = this.byId("productsListV2");
          oList.removeSelections();

           oContext = this.dataV2Model.createEntry("/Products");
        } else {
          oContext = oSource.getParent().getBindingContext("DataV2");
        }

        this.oProductV2DataChangingDialog.setBindingContext(oContext, "DataModel");

        this.configModel.setProperty('/buttonSubmitText', this.oBundle.getText(bIsCreate ? "dialogAddButtonText" : "dialogSaveButtonText"));
        this.configModel.setProperty('/headerText', this.oBundle.getText(bIsCreate ? "productCreationDialogHeaderText" : "productEditDialogHeaderText"));
        
        this.setCreationDialogInitialControlsValueState();
        this.oProductV2DataChangingDialog.open();
      } catch {
        Log.error("Cannot load product create dialog");
      }
    },

    onOpenProductV2DataCreateDialog() {
      this._onOpenProductV2DataChangingDialog();
    },

    onSubmitV2Product(oEvent) {
      const sText = oEvent.getSource().getText();
      const bIsCreate = sText === this.oBundle.getText("dialogAddButtonText");

      if (!this.validateForm()) {
        return;
      }

      const sSuccessMsg = this.oBundle.getText(bIsCreate ? "createSuccessMessage" : "editSuccessMessage");
      const sErrorMsg = this.oBundle.getText(bIsCreate ? "createErrorMessage" : "editErrorMessage");

      if (this.dataV2Model.hasPendingChanges()) {
        this.dataV2Model.submitChanges({
          success: () => {
            MessageToast.show(sSuccessMsg),
            this.oProductV2DataChangingDialog.close();
          },
          error: () => MessageBox.error(sErrorMsg),
        });
      }
    },

    async onOpenProductV2DataEditDialog(oEvent) {
      this._onOpenProductV2DataChangingDialog(oEvent.getSource(), false);
    },

    onCancelProductV2DataChanging() {
      this.dataV2Model.resetChanges();
      this.oProductV2DataChangingDialog.close();
    },

    validateForm() {
      const aControls = this.oProductV2DataChangingDialog.getContent()[0].getItems();
      let isAllControlsValid = true;

      aControls.forEach((oControl) => {
        const isValid = this._validateControl(oControl);

        if (!isValid) {
          isAllControlsValid = false;
        }
      });

      return isAllControlsValid;
    },

    onProductPress(oEvent) {
      const sProductId = oEvent.getSource().getBindingContext("DataV2").getObject()?.["ID"];
      this.oRouter.navTo("ProductDetailPage", { ProductID: sProductId });
    }
  });
});