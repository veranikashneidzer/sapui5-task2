sap.ui.define([
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/base/Log"
], (MessageToast, MessageBox, Log) => {
  "use strict";

  return ({
    onProductsTableV2SelectedItemsChanged(oEvent) {
      this.oConfigModel.setProperty("/productsSelectedItems", oEvent.getSource().getSelectedItems());
    },

    onDeleteV2Products() {
      const oModel = this.getView().getModel("oDataV2");
      const oList = this.byId("productsListV2");
      const oBundle = this.getView().getModel("i18n").getResourceBundle();
      const selectedIDs = oList?.getSelectedContexts().map(record => record.getObject()?.["ID"]);
      oModel.setDeferredGroups(["deleteGroup"]);

      oList?.getSelectedContexts()?.forEach((oContext, index) => {
        oModel.remove(oContext.getPath(), {
          groupId: "deleteGroup"
        });
      });

      const sSuccessMsg = oBundle.getText(selectedIDs.length > 1 ? "deletionSuccessMessagePlural" : "deletionSuccessMessage");
      const sErrorMsg = oBundle.getText("deletionErrorMessage");

      oModel.submitChanges({
        groupId: "deleteGroup",
        success: () => MessageToast.show(sSuccessMsg),
        error: () => MessageBox.error(sErrorMsg),
      });

      oList.removeSelections();
    },

    async onOpenProductCreationV2Dialog() {
      this.oConfigModel.setProperty("/newProductData", {});

      try {
        if (!this.oProductCreationDialog) {
          this.oProductCreationV2Dialog ??= await this.loadFragment({
            name: "project1.view.fragments.ProductCreationV2Dialog"
          });

          this.oProductCreationV2Dialog.bindElement({
            path: "/newProductData",
            model: "oConfigModel"
          });
        }

        this.oProductCreationV2Dialog.open();
      } catch {
        Log.error("Cannot load product creation dialog");
      }
    },

    onSubmitV2ProductCreation() {
      const { Name, Description, Rating, Price, ReleaseDate, DiscontinuedDate } = this.oConfigModel.getProperty("/newProductData");

      const oModel = this.getView().getModel("oDataV2");
      const oBundle = this.getView().getModel("i18n").getResourceBundle();
      const sSuccessMsg = oBundle.getText("creationSuccessMessage");
      const sErrorMsg = oBundle.getText("creationErrorMessage");

      oModel.create("/Products", { Name, Description, Rating, Price, ReleaseDate, DiscontinuedDate }, {
        success: () => {
          MessageToast.show(sSuccessMsg),
          this.oProductCreationV2Dialog.close();
        },
        error: () => MessageBox.error(sErrorMsg),
      });
    },

    onCancelV2ProductCreation() {
      this.oProductCreationV2Dialog.close();
    },

    validateData(oEvent) {
      const inputId = oEvent.getParameter("id").split('--').pop();
      const inputType = oEvent.getSource().getBindingInfo("value").type.getName();
      const inputValue = oEvent.getSource().getValue();

      const sPropertyName = inputId.replace("productCreationDialog", '').replace("Input", '');
      let isValid = false;

      switch(inputType) {
        case "Date":
          isValid = !isNaN(Date.parse(inputValue))
          break;
        case "String":
          isValid = !!(`${inputValue}`.length)
        case "Integer":
          isValid = Number(inputValue) && inputValue > 0;
          break;
      }

      this.oConfigModel.setProperty(`/newProductData/is${sPropertyName}Valid`, isValid);
    }
  });
});