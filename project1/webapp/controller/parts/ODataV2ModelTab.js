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
      const aControls = this.oProductCreationV2Dialog.getContent()[0].getItems();

      aControls.forEach((oControl) => {
        oControl.setValueState("None");
      });
    },

    async onOpenProductCreationV2Dialog() {
      const oList = this.byId("productsListV2");
      oList.removeSelections();

      try {
        if (!this.oProductCreationDialog) {
          this.oProductCreationV2Dialog ??= await this.loadFragment({
            name: "project1.view.fragments.ProductCreationV2Dialog",
            id: 'productCreationV2Dialog',
          });
        }

        const oNewContext = this.dataV2Model.createEntry("/Products");
        this.oProductCreationV2Dialog.setBindingContext(oNewContext, "DataV2");
        this.setCreationDialogInitialControlsValueState();
        this.oProductCreationV2Dialog.open();
      } catch {
        Log.error("Cannot load product creation dialog");
      }
    },

    onSubmitV2ProductCreation() {
      if (!this.validateForm()) {
        return;
      }

      const sSuccessMsg = this.oBundle.getText("creationSuccessMessage");
      const sErrorMsg = this.oBundle.getText("creationErrorMessage");

      this.dataV2Model.submitChanges({
        success: () => {
          MessageToast.show(sSuccessMsg),
          this.oProductCreationV2Dialog.close();
        },
        error: () => MessageBox.error(sErrorMsg),
      });
    },

    onCancelV2ProductCreation() {
      this.dataV2Model.resetChanges();
      this.oProductCreationV2Dialog.close();
    },

    onCreationDialogControlChange(oEvent) {
      const oControl = oEvent.getSource();

      this._validateControl(oControl);
    },

    validateForm() {
      const aControls = this.oProductCreationV2Dialog.getContent()[0].getItems();
      let isAllControlsValid = true;

      aControls.forEach((oControl) => {
        const isValid = this._validateControl(oControl);

        if (!isValid) {
          isAllControlsValid = false;
        }
      });

      return isAllControlsValid;
    },

    _validateControl(oControl) {
      let isValid = false;

      if (oControl.isA("sap.m.Input")) {
        const inputValue = oControl.getValue();
        isValid = oControl.getType() === "Number" ? Number(inputValue) && inputValue > 0 : !!(`${inputValue}`.length);
      } else if (oControl.isA("sap.m.DatePicker")) {
        isValid = oControl.isValidValue() && !!oControl.getValue().length;
      }

      oControl.setValueState(isValid ? "None" : "Error");

      return isValid;
    },

    async onOpenProductEditV2Dialog(oEvent) {
      const oProductData = oEvent.getSource().getBindingContext("oDataV2").getObject();
      this.oConfigModel.setProperty("/newProductData", {
        ...oProductData,
        isNameValid: true,
        isDescriptionValid: true,
        isRatingValid: true,
        isPriceValid: true,
        isReleaseDateValid: true,
        isDiscontinuedDateValid: true,
        isEditable: true,
      });

      try {
        if (!this.oProductEditDialog) {
          this.oProductEditDialog ??= await this.loadFragment({
            name: "project1.view.fragments.ProductCreationV2Dialog",
            id: 'productUpdateV2Dialog',
          });

          this.oProductEditDialog.bindElement({
            path: "/newProductData",
            model: "oConfigModel"
          });
        }

        this.oProductEditDialog.open();
      } catch {
        Log.error("Cannot load product creation dialog");
      }
    },

    onCancelV2ProductUpdate() {
      this.oProductEditDialog.close();
    },

    onSubmitV2ProductUpdate() {
      const { ID, Name, Description, Rating, Price, ReleaseDate, DiscontinuedDate } = this.oConfigModel.getProperty("/newProductData");

      const oModel = this.getView().getModel("oDataV2");
      const oBundle = this.getView().getModel("i18n").getResourceBundle();
      const sSuccessMsg = oBundle.getText("editSuccessMessage");
      const sErrorMsg = oBundle.getText("editErrorMessage");

      oModel.update(`/Products(${ID})`, { Name, Description, Rating, Price, ReleaseDate, DiscontinuedDate }, {
        success: () => {
          MessageToast.show(sSuccessMsg),
          this.oProductEditDialog.close();
        },
        error: () => MessageBox.error(sErrorMsg),
      });
    }
  });
});