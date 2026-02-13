# [Module 2] Lifecycle Events, JSON Model, Binding, Controls

## [Task 2-1] Create a New Git Repository

- Create a new repository for your SAPUI5 project at https://github.com/ . 
- Use Public repository. 
- Name the repository sapui5-task2. 

## [Theory] Lifecycle Events, JSON Model, Binding, Controls

- [Lifecycle Hooks](https://sapui5.hana.ondemand.com/sdk/#/topic/121b8e6337d147af9819129e428f1f75.html) 
- ﻿[Lifecycle Hooks Explained](https://community.sap.com/t5/technology-blogs-by-sap/sapui5-controller-lifecycle-methods-explained/ba-p/13364874) 
- ﻿[How to connect view and controller](https://sapui5.hana.ondemand.com/sdk/#/topic/50579ddf2c934ce789e056cfffe9efa9) 
- ﻿[Base Controller Concept](https://inui.io/sapui5-base-controller/#:~:text=A%20base%20controller%20is%20a,are%20used%20across%20multiple%20controllers) 
- ﻿[XML Views](https://sapui5.hana.ondemand.com/sdk/#/topic/91f292806f4d1014b6dd926db0e91070) 
- ﻿[JSON Model](https://sapui5.hana.ondemand.com/sdk/#/topic/96804e3315ff440aa0a50fd290805116#loio96804e3315ff440aa0a50fd290805116) 
- ﻿[What is a Control?](https://sapui5.hana.ondemand.com/sdk/#/topic/91f0a22d6f4d1014b6dd926db0e91070) 
﻿- [Button API Reference](https://sapui5.hana.ondemand.com/#/api/sap.m.Button%23overview) 
- ﻿[Associations](https://sapui5.hana.ondemand.com/sdk/#/topic/5ee3be4727864bb08b991414e0428e38) 
- ﻿[Aggregation](https://sapui5.hana.ondemand.com/sdk/#/topic/19eabf5b13214f27b929b9473df3195b.html) 
- ﻿[Association/Aggregation/Composition Blog](https://community.sap.com/t5/technology-blog-posts-by-members/association-aggregation-and-composition/ba-p/13214335) 
- ﻿[Custom Data](https://sapui5.hana.ondemand.com/sdk/#/topic/91f0c3ee6f4d1014b6dd926db0e91070) 
- ﻿[Binding Modes](https://sapui5.hana.ondemand.com/sdk/#/topic/68b9644a253741e8a4b9e4279a35c247) 
- ﻿[Binding Types](https://sapui5.hana.ondemand.com/sdk/#/topic/91f0d8ab6f4d1014b6dd926db0e91070)﻿
- ﻿[Binding Syntax](https://sapui5.hana.ondemand.com/sdk/#/topic/e2e6f4127fe4450ab3cf1339c42ee832)﻿
- ﻿[Composite Binding](https://sapui5.hana.ondemand.com/sdk/#/topic/a2fe8e763014477e87990ff50657a0d0)﻿
- ﻿[Expression Binding](https://sapui5.hana.ondemand.com/sdk/#/topic/daf6852a04b44d118963968a1239d2c0)

## [Task 2-2] Generate new empty application

- App could be generated via Fiori Application Generator in VS Code. This Generator is coming from SAP Extension pack that you should have from Task 1-1. 
- Open command pallet and type ‘Fiori Application Generator’, you should see it in the list. 
- Select ‘Basic’ template. 
- For Data Source select ‘None’. 
- For View name use ‘Main’. 
- On next screen ‘Project Attributes’ no changes are required, click on ‘Finish’. 
- If you want you can change module name and app’s title and description to something more logical, but this is not mandatory. 
- Push empty app to main branch. 
- Create a new branch (feature/task-1 ) from main (you will use this branch for development). 

Note: In case of any difficulties, you can take empty project from this repo. Link - [Repo with empty project](https://github.com/nulanovs/SAPUI5_Learning_Course)

## [Task 2-3] Display Data in the table

- Check one – empty project is generated and ready, you are in your new feature branch (feature/task-1) 
- Use lifecycle events to properly initialize JSON model. 
- JSON Model suggestion – implement JSON Model that stores book information, fields: 
  - ID (text) 
  - Name (Text) 
  - Author (Text) 

  - Genre (Text) 

  - ReleaseDate (Date) 

  - AvailableQuantity (number) 

- Fill JSON model with some dummy data (Add at least 5 records). 
- In view add control like – Table ([Table Samples from Documentation](https://sapui5.hana.ondemand.com/#/entity/sap.m.Table)) 
- Bind view to the JSON Model. You should see your data from JSON model in the table. 


## [Task 2-4] Record creation/deletion and filtering

- Merge Pull Request, create a new branch ‘feature/task-2’ from main, checkout to it and start next task. 
- Add Toolbar control to the table ([Toolbar Samples from Documentation](https://sapui5.hana.ondemand.com/#/entity/sap.m.Toolbar)). 
- In table’s tollbar add 2 buttons ‘Add Record’ and ‘Delete Record’ ([Button Samples from Documentation](https://sapui5.hana.ondemand.com/#/entity/sap.m.Button)). 
- Enable multiple records selection for the table. 
- On click of ‘Add Record’ – new empty record should be added to the table (as last record). 
- On click of ‘Delete Record’ – selected record should be deleted. 
- Implement Base Controller, implement function to get the model in the base controller. 
- In main controller use functions from Base Controller to access the model. 
- Explore different controls – Use table toolbar and a separator to separate it from 2 buttons that you already have there 
  - A sap.m.Input for filtering books by title (condition - contains). 
  - A sap.m.Select for filtering by genre, populated with unique genres from the model. 
  - A "Filter" button to apply filters to the table. 

## [Task 2-5] Title edit

- Merge Pull Request, create a new branch ‘feature/task-3’ from main, checkout to it and start next task. 
- Add a new column “Actions” with a button “Edit Title”. On click of button corresponding cell with Title in corresponding row in the table (where button was pressed) should become editable (hint - replace text with sap.m.Input fields for that row, we might need to add a new property into the model to track if record is in editMode or not) 
- When line is in edit mode button ‘Save’ should be visible instead of ‘Edit’. On click of ‘Save’ button changes should be saved in the model and row should be moved back to display mode. -> ‘Edit’ button is visible, ‘Save’ button is not visible, Text field is displayed instead of input. 

# [Module 3] Formatter, Fragments, i18n file, oData model, mock server

## [Theory] Formatter, Fragments, i18n file, oData model, mock server

- ﻿[Formatter](https://sapui5.hana.ondemand.com/sdk/#/topic/07e4b920f5734fd78fdaa236f26236d8.html)  
- ﻿[Formatter Code Example](https://sapui5.hana.ondemand.com/sdk/#/topic/0f8626ed7b7542ffaa44601828db20de.html)  
- ﻿[Fragments Overview](https://sapui5.hana.ondemand.com/sdk/#/topic/36a5b130076e4b4aac2c27eebf324909)

- [Translatable Texts](https://sapui5.hana.ondemand.com/sdk/#/topic/df86bfbeab0645e5b764ffa488ed57dc)  
- ﻿[What is CRUD?](https://www.codecademy.com/article/what-is-crud-explained)  
- ﻿[OData V2 Model](https://sapui5.hana.ondemand.com/sdk/#/topic/6c47b2b39db9404582994070ec3d57a2#loio6c47b2b39db9404582994070ec3d57a2)  
- ﻿[OData V4 Model](https://sapui5.hana.ondemand.com/sdk/#/topic/5de13cf4dd1f4a3480f7e2eaaee3f5b8)  
- ﻿[OData V2 vs V4 Differences in Protocol](https://help.sap.com/docs/successfactors-platform/sap-successfactors-api-reference-guide-odata-v4/summary-of-differences-between-odata-v2-and-v4)  
- ﻿[oData V2 vs V4 Difference in CRUD (examples)](https://community.sap.com/t5/technology-blog-posts-by-members/ui5-odatamodel-v4-vs-v2-custom-odata-requests/ba-p/13544380)  
- ﻿[What is metadata?](https://help.sap.com/docs/SAP_JAM_COLLABORATION/9981b6fb8453459d8103a04d674ebe0f/dacad2174f654e62a75754d71fee9da2.html)  
- ﻿[Mock Server](https://sapui5.hana.ondemand.com/sdk/#/topic/69d3cbd4150c4ffb884e788f7f60fd93)

## [Task 3-1] Confirmation Dialog

- Create a new branch ‘feature/task-3-1’ from main, checkout to it. 
- Add a confirmation dialog ([Dialog Samples from Documentation](https://sapui5.hana.ondemand.com/#/entity/sap.m.Dialog)) when deleting the error. - On click of delete button show popup with text “Are you sure you want to delete selected records?”. 
  - On click of “Yes” button – selected records are deleted. 
  - On click of ‘No’ button – nothing happens, popup is closed. 

## [Task 3-2] Record creation

- Create a new branch ‘feature/task-3-2’ from main, checkout to it. 
- Enhance creation functionality: 
  - On click of ‘Add Record’ button, instead of adding empty record open a dialog with fields (please create and use Fragment), where user can fill all information about the book 

  - On click of ‘Add’ button new record is created based on provided information. 

  - On click of ‘Cancel’ button no record is created, just close the dialog. 

- Do not forget about validation, make sure that entered data is valid, do not allow to save any empty field. 

## [Task 3-3] Formatter & i18n file

- Create a new branch ‘feature/task-3-3’ from main, checkout to it. 
- Implement a formatter to display the year as "Published: {Year}" instead of current value in date column. Note: do not display full date, just Year should be taken from the date. 
- Integrate i18n: Move all button texts, table headers, messages and labels to the i18n resource bundle.  

## [Task 3-4] Mock Server configuration

- Create a new branch ‘feature/task-3-4’ from main, checkout to it. 
- Configure Mock Server: 
  - Mock Server is a local simulation of a server. We will configure a simulation of these services :

     - [Public oData V2 Service ](https://services.odata.org/V2/(S(e2j30ivvdcrso1qd14rx5tjm))/OData/OData.svc/) 

     - [Public oData V4 Service ](https://services.odata.org/V4/OData/(S(m520qzhdjlyeejbdthrvvmsk))/OData.svc/)﻿

- It serves local files, but it simulates a back-end system more realistically than just loading the local data.

- Add new data sources in manifest (one for oData v2 and one for oData v4) 

- Add new models in manifest that will be connected to newly created data sources (one for oData v2 and one for oData v4) 

- Create local metadata files for each service (one for oData v2 and one for oData v4). Files should be created in ‘localService’ folder, you can name them like ‘metadataV2.xml’ and ‘metadataV4.xml’ .
- Open URLs with the service metadata 
  - [Public oData V2 Service Metadata](https://services.odata.org/V2/(S(e2j30ivvdcrso1qd14rx5tjm))/OData/OData.svc/$metadata)
  - [Public oData V4 Service Metadata](https://services.odata.org/V4/OData/(S(m520qzhdjlyeejbdthrvvmsk))/OData.svc/$metadata) 
 - and copy the content of the URL into local files. 

- Make sure that in manifest file the data source is linked to the correct corresponding metadata file. 

- Update or create ui5-mock.yaml file if it does not exist. Example of ui5-mock.yaml content can be found [here](https://github.com/marianfoo/ui5-fe-mockserver-tutorial/blob/main/ex1/ui5-mock.yaml).

- You need to add 2 services configuration – one for oData V2 and one for oData V4. 

- Add new dependency in package.json and run "npm install' - @sap-ux/ui5-middleware-fe-mockserver

- Test your changes, Start your project with npm run start-mock command. 

- Example of updated package.json file with new library and command can be found [here](https://github.com/marianfoo/ui5-fe-mockserver-tutorial/blob/main/ex1/package.json).

- In the network tab in browser you should see that metadata for 2 new services is loaded without errors.

## [Task 3-5] oData Model integration

- Create a new branch ‘feature/task-3-5’ from main, checkout to it. 
- In your app wrap everything that was done into IconTabBar ([IconTabBar Samples from Documentation](https://sapui5.hana.ondemand.com/#/entity/sap.m.IconTabBar)). Please Create 3 Tabs – ‘JSON Model’ , ‘oData v2 Model’, ‘oData v4 Model’.  
  - In ‘JSON Model’ tab – place everything that was already developed by you. 

  - In ‘oData v2 Model’ tab – create a new table that will be linked to simulated by mock server [Public oData V2 Service](https://services.odata.org/V2/(S(e2j30ivvdcrso1qd14rx5tjm))/OData/OData.svc/), EntitySet name – Products. I will not name the fields here, please explore metadata to find proper naming of the fields.  

  - In ‘oData v4 Model’ tab – create a new table that will be linked to simulated by mock server [Public oData V4 Service ](https://services.odata.org/V4/OData/(S(m520qzhdjlyeejbdthrvvmsk))/OData.svc/), EntitySet name – Products. I will not name the fields here, please explore metadata to find proper naming of the fields.

## [Task 3-6] Replace auto-generated data

- Create a new branch ‘feature/task-3-6’ from main, checkout to it. 
- All needed steps are explained in this [Exercise](https://marianfoo.github.io/ui5-fe-mockserver-tutorial/exercises/custom-json-data.html) . 
- Follow the steps in tutorial and replace auto generated data with your own data.

# [Module 4] oData V2 Model

## [Theory] oData V2 Model

- ﻿[Creating the Model Instance](https://sapui5.hana.ondemand.com/sdk/#/topic/6c47b2b39db9404582994070ec3d57a2#loio218afa0780da42fd982b72e992fb57d2) 
- ﻿[Service Metadata](https://sapui5.hana.ondemand.com/sdk/#/topic/6c47b2b39db9404582994070ec3d57a2#loio71a3ae02691147abaf6d78a553d50161) 
- ﻿[Addressing Entities: Binding Path Syntax](https://sapui5.hana.ondemand.com/sdk/#/topic/6c47b2b39db9404582994070ec3d57a2#loioc4be40ce21ff4d0485b1d8f8114f7426) 
- ﻿[Creating Entities](https://sapui5.hana.ondemand.com/sdk/#/topic/6c47b2b39db9404582994070ec3d57a2#loio4c4cd99af9b14e08bb72470cc7cabff4) 
- ﻿[CRUD Operations](https://sapui5.hana.ondemand.com/sdk/#/topic/6c47b2b39db9404582994070ec3d57a2%23loioff667e12b8714f3595e68f3e7c0e7a14)  
- ﻿[Batch Processing](https://sapui5.hana.ondemand.com/sdk/#/topic/6c47b2b39db9404582994070ec3d57a2#loio8a6ae1d390534d05a560bf350af59c29)  
- ﻿[Sorting, Grouping, and Filtering for List Binding](https://sapui5.hana.ondemand.com/sdk/#/topic/ec79a5d5918f4f7f9cbc2150e66778cc)

## [Task 4-1] oData v2 – Record Deletion

- Create a new branch ‘feature/task-4-1’ from main, checkout to it. 
- Enhance tab ‘oData v2 Model’ with Delete operation:  
- In table’s toolbar add Button ‘Delete’.  
- Enable Multiple records selection in table ([Code Sample](https://sapui5.hana.ondemand.com/#/entity/sap.m.Table/sample/sap.m.sample.TableMultiSelectMode)). 
- Implement logic to delete selected records. Make sure that in case of multiple records deletion batch request is sent.  
- Show success messages (after call to the BE was done) (using [MessageToast](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast) ) for delete action.
- Show failure messages (after call to the BE was done) (using ﻿﻿[MessageBox](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox) ) for delete action. ﻿﻿
- Write "Done" in the answer, add link to the created Pull Request and press "Submit".

## [Task 4-2] oData v2 – Record Creation

- Create a new branch ‘feature/task-4-2’ from main, checkout to it. Enhance tab ‘oData v2 Model’ with Create operation:  
- In table’s toolbar add Button ‘Add Record’ . 
- On click of ‘Add Record’ button, dialog is opened with editable fields, values are empty (Please create and use Fragment). 
- On click of ‘Save’ Button – new record is created and visible in the table, dialog is closed. 
- On click of ‘Cancel’ Button – No record is created, close the dialog. 
- Implement validation for record creation - do not allow to save empty values. If user try to submit a new record with empty fields – highlight corresponding fields using ValueState (use Error state) and ValueStateText ([ValueState Example](https://sapui5.hana.ondemand.com/%22%20/l%20%22/entity/sap.m.Input/sample/sap.m.sample.InputValueState) ). If value is there – ValueState should be removed. 
- Show success messages (after call to the BE was done) (using [MessageToast](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast) ) for create action.
- Show failure messages (after call to the BE was done) (using ﻿﻿[MessageBox](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox) ) for create action.

## [Task 4-3] oData v2 – Edit Record

- Create a new branch ‘feature/task-4-3’ from main, checkout to it. Enhance tab ‘oData v2 Model’ with Edit operation:  
- Add a new column for each row with ‘Edit’ button. On click of ‘Edit’ button, dialog is opened with editable fields, values are populated based on row, where user click on ‘Edit’ button. 
- Use the same fragment that you have created for record creation in task 4-2. 
- On click of ‘Save’ Button – user’s changes are saved, changes are visible in the table. 
- On click of ‘Cancel’ Button – No changes were saved, discard them, close the dialog. 
- Implement validation for record edit - do not allow to save empty values. If user try to update record with empty fields – highlight corresponding fields using ValueState (use Error state) and ValueStateText ([ValueState Example](https://sapui5.hana.ondemand.com/%22%20/l%20%22/entity/sap.m.Input/sample/sap.m.sample.InputValueState) ). If value is there – ValueState should be removed. 
- Show success messages (after call to the BE was done) (using [MessageToast](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast) ) for edit action.
- Show failure messages (after call to the BE was done) (using ﻿﻿[MessageBox](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox) ) for edit action.

## [Task 4-4] oData v2 – Live Change Filter

- Create a new branch ‘feature/task-4-4’ from main, checkout to it. Enhance tab ‘oData v2 Model’ with Filter:  
- In table’s toolbar add new input field. 
- Set a placeholder – “Please enter Product Name” 
- Once user type something into this field (product name), it should filter the table based on provided product name (Explore the [documentation](https://sapui5.hana.ondemand.com/#/api/sap.m.Input%23overview) and events of input field). 
- No additional button should be clicked for filtering. 
- Example of how to filter a table can be found [here](https://sapui5.hana.ondemand.com/#/topic/5295470d7eee46c1898ee46c1b9ad763) and [here](https://sapui5.hana.ondemand.com/#/topic/ec79a5d5918f4f7f9cbc2150e66778cc).

## [Task 4-5] oData v2 – Sorting

- Create a new branch ‘feature/task-4-5’ from main, checkout to it. Enhance tab ‘oData v2 Model’ with Sorting:  
- In table’s toolbar add new dropdown field ComboBox. 
- Set a placeholder – “Please select Column”. 
- Populate ComboBox with all available columns from the table. 
- Once user has selected column, the table should be sorted by selected column in DESCENDING order (Explore the [documentation](https://sapui5.hana.ondemand.com/sdk/#/api/sap.m.ComboBox%23overview) and events of ComboBox). 
- No additional button should be clicked for sorting. 
- Example of manual sorting can be found [here](https://sapui5.hana.ondemand.com/#/topic/ec79a5d5918f4f7f9cbc2150e66778cc).

# [Module 5] Routing & Navigation

## [Theory] Routing & Navigation
- [Routing Configuration](https://sapui5.hana.ondemand.com/sdk/#/topic/902313063d6f45aeaa3388cc4c13c34e) 
- ﻿[Methods and Events for Navigation](https://sapui5.hana.ondemand.com/sdk/#/topic/516e477e7e0b4e188b19a406e7528c1e) 
- ﻿[Initializing and Accessing a Routing Instance](https://sapui5.hana.ondemand.com/sdk/#/topic/acdb6cd408ec4b9eb5e1fe45e607abdd) 
﻿- [Routing and Navigation - Example](https://sapui5.hana.ondemand.com/sdk/#/topic/e5200ee755f344c8aef8efcbab3308fb)  
- ﻿[Routing with Parameters - Example](https://sapui5.hana.ondemand.com/sdk/#/topic/2366345a94f64ec1a80f9d9ce50a59ef) 
- ﻿[Object Page Layout Explained](https://sapui5.hana.ondemand.com/sdk/#/topic/2e61ab6c68a2480eb666c1927a707658.html)

## [Task 5-1] Tab Bookmark

- Create a new branch ‘feature/task-5-1’ from main, checkout to it. 
- Implement the following requirement: 
- When the user opens any tab (With JSON Model, oData V2 or oData v4), the browser URL should be updated (e.g., via routing, query parameter). 
- The path should be defined like /tab/{tabKey}. Where {tabKey} is dynamic parameter that shows key of opened tab. 
- When this URL is bookmarked and later opened directly in the browser, the application should automatically open the bookmarked tab. 

## [Task 5-2] New page

- Create a new branch ‘feature/task-5-2’ from main, checkout to it. 
- In the tab where you have oData V2 Model enable navigation by clicking on a table row 
( [Explore properties of ColumnListItem](https://sapui5.hana.ondemand.com/sdk/#/api/sap.m.ColumnListItem%23controlProperties) , property - type).  
- Create new view - Product.view.xml, controller – Product.controller.js. 
- Connect new view and controller, add configuration in routing, manifest file. 
- On click of any record, you should navigate to the new empty page. 
- In the URL you should be able to identify which record was used for navigation, so the path should be like Product/{ProductID}, where {ProductID} is dynamic parameter, populated based on the selected record.

## [Task 5-3] New page’s content

- Create a new branch ‘feature/task-5-3’ from main, checkout to it. 
- In new Product.view.xml create object page layout ([Object Page Layout Code Sample](https://sapui5.hana.ondemand.com/sdk/#/entity/sap.uxap.ObjectPageSection/sample/sap.uxap.sample.ObjectPageSection))
- Header should display just Product’s name 
- Create 2 sections: 
  - In first section display all available information about the product using Form control ([Simple Form Examples](https://sapui5.hana.ondemand.com/#/entity/sap.ui.layout.form.SimpleForm) ). 
  - In second section with information about a supplier that sell this product. Based on your metadata, relationship between entities is defined so that each product can have only 1 linked supplier, so there  should be only one supplier visible. 
- If you have autogenerated data, it should work, but if you have custom data defined, do not forget to create data also for Supplier entity and properly connect it.
- For each product add property "SupplierID" with random value (0 or 1).
- For each supplier add:
```

"Products": {
  "__deferred": {
    "uri": "Products(0)"
  }
},
```

# [Module 6] oData V4 Model

## [Theory] oData V4 Model

- ﻿[Model Instantiation and Data Access](https://sapui5.hana.ondemand.com/sdk/#/topic/9613f1f2d88747cab21896f7216afdac) 
﻿- [Bindings](https://sapui5.hana.ondemand.com/sdk/#/topic/54e0ddf695af4a6c978472cecb01c64d) 
- ﻿[How to Creating Bindings](https://sapui5.hana.ondemand.com/sdk/#/topic/95cf4b16762a465b9237b18d033f0cd2) 
- ﻿[Context API (Context's methods to work with data)](https://sapui5.hana.ondemand.com/sdk/#/topic/22ee78b422614b40ad4c1938dc23d967) 
- ﻿[Accessing Data in Controller Code](https://sapui5.hana.ondemand.com/sdk/#/topic/17b30ac2d5474078be31e695e97450cc) 
- ﻿[CRUD Operations Comparison](https://community.sap.com/t5/technology-blog-posts-by-members/ui5-odatamodel-v4-vs-v2-custom-odata-requests/ba-p/13544380)  
﻿- [Batch Processing](https://sapui5.hana.ondemand.com/sdk/#/topic/74142a38e3d4467c8d6a70b28764048f)  
﻿- [Summary of Differences between oData v2 and v4](https://help.sap.com/docs/successfactors-platform/sap-successfactors-api-reference-guide-odata-v4/summary-of-differences-between-odata-v2-and-v4) 
﻿- [Changes Compared to OData V2 Model](https://sapui5.hana.ondemand.com/sdk/#/topic/abd4d7c7548d4c29ab8364d3904a6d74)

## [Task 6-1] oData v4 – Record Deletion

- Create a new branch ‘feature/task-6-1’ from main, checkout to it. 
- Enhance tab ‘oData v4 Model’ with Delete operation:
- In table’s toolbar add Button ‘Delete’.  
- Enable Multiple records selection in table ([Code Sample](https://sapui5.hana.ondemand.com/#/entity/sap.m.Table/sample/sap.m.sample.TableMultiSelectMode)). 
- Implement logic to delete selected records. Make sure that in case of multiple records deletion batch request is sent. 
- Show success messages (after call to the BE was done) (using [MessageToast](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast) ) for delete action. 
- Show failure messages (after call to the BE was done) (using [MessageBox](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox) ) for delete action.

## [Task 6-2] oData v4 – Record Creation

- Create a new branch ‘feature/task-6-2’ from main, checkout to it. Enhance tab ‘oData v4 Model’ with Create operation:  
- In table’s toolbar add Button ‘Add Record’ . 
- On click of ‘Add Record’ button, dialog is opened with editable fields, values are empty (Please create and use Fragment). 
- On click of ‘Save’ Button – new record is created and visible in the table, dialog is closed. 
- On click of ‘Cancel’ Button – No record is created, close the dialog. 
- Implement validation for record creation – do not allow to save empty values. If user try to submit a new record with empty fields – highlight corresponding fields using ValueState (use Error state) and ValueStateText ([ValueState Example](https://sapui5.hana.ondemand.com/%22%20/l%20%22/entity/sap.m.Input/sample/sap.m.sample.InputValueState) ). If value is there – ValueState should be removed. 
- Show success messages (after call to the BE was done) (using [MessageToast](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast)) for create action. 
- Show failure messages (after call to the BE was done) (using [MessageBox](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox)) for create action.

## [Task 6-3] oData v4 – Edit Record

- Create a new branch ‘feature/task-6-3’ from main, checkout to it. Enhance tab ‘oData v4 Model’ with Edit operation:  
- Add a new column for each row with ‘Edit’ button. On click of ‘Edit’ button, dialog is opened with editable fields, values are populated based on row, where user click on ‘Edit’ button. 
- Use the same fragment that you have created for record creation in task 6-2. 
- On click of ‘Save’ Button – user’s changes are saved, changes are visible in the table. 
- On click of ‘Cancel’ Button – No changes were saved, discard them, close the dialog. 
- Implement validation for record editing – do not allow to save empty values. If user try to update a record with empty fields – highlight corresponding fields using ValueState (use Error state) and ValueStateText ([ValueState Example](https://sapui5.hana.ondemand.com/%22%20/l%20%22/entity/sap.m.Input/sample/sap.m.sample.InputValueState) ). If value is there – ValueState should be removed. 
- Show success messages (after call to the BE was done) (using [MessageToast](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast)) for create action. 
- Show failure messages (after call to the BE was done) (using [MessageBox](https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox)) for create action.
