sap.ui.define([
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/date/UI5Date"
], (DateFormat, UI5Date) => {
	"use strict";

	return {
		rormatDate(sDate) {
			const oDateFormat = DateFormat.getInstance({
				relative: true
			});
			return oDateFormat.format(UI5Date.getInstance(sDate));
		}
	};
});