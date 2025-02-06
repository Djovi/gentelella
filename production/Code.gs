var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

  function addNewSheetToDoc(docId, sheetName) {
  // Create a new spreadsheet and get the sheet object
  var spreadsheet = SpreadsheetApp.create("Temp Spreadsheet");
  var sheet = spreadsheet.getActiveSheet();

  // Set the sheet name (optional)
  if (sheetName) {
    sheet.setName(sheetName);
  }

  // Add your data to the sheet (replace this with your actual logic)
  var data = [["Header 1", "Header 2"]];
  sheet.appendRow(data);

  // Get the document object by ID
  var doc = DocumentApp.openById(docId);

  // Insert a new sheet at the end of the document
  var newSheet = doc.insertSheets([sheetName || "New Sheet"]);

  // Get the new sheet object
  var newSheetObject = newSheet[newSheet.length - 1];

  // Copy the data from the temporary sheet to the new document sheet
  newSheetObject.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
      .setValues(sheet.getDataRange().getValues());

  // Close the temporary spreadsheet (optional)
  SpreadsheetApp.getUi().alert('New sheet created in your document!');
  spreadsheet.getRange("A1").setValue("This sheet will be deleted"); // Optional message
  SpreadsheetApp.deleteActiveSpreadsheet();
}

// Example usage: Replace 'YOUR_DOC_ID' with the actual ID of your document
//addNewSheetToDoc('YOUR_DOC_ID', 'My New Sheet');


function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
  //console.log(activeSpreadsheet.getId())
    // var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    // var sheet = doc.getSheetByName(SHEET_NAME);
    //var email = e.parameter['email']; // Assuming 'email' is the field containing the email address

  // Check for duplicate email in Sheet11
  // var duplicateCheck = sheet.getRange("C:C").getValues(); // Assuming email addresses are in column C
  // for (var i = 0; i < duplicateCheck.length; i++) {
  //   if(duplicateCheck[i][0]!=='')
  //  console.log(duplicateCheck[i][0]) 
     
  // }
}
// Usage
//  1. Enter sheet name where data is to be written below
        var SHEET_NAME = "Sheet1";
        
//  2. Run > setup
//
//  3. Publish > Deploy as web app 
//    - enter Project Version name and click 'Save New Version' 
//    - set security level and enable service (most likely execute as 'me' and access 'anyone, even anonymously) 
//
//  4. Copy the 'Current web app URL' and post this in your form/script action 
//
//  5. Insert column names on your destination sheet matching the parameter names of the data you are passing in (exactly matching case)

var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

// If you don't want to expose either GET or POST methods you can comment out the appropriate function
function doGet(e){
  return handleResponse(e);
}
/*function doOptions(e) {
    var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Set CORS headers
  output.append(JSON.stringify({status: 'success', data: e.postData.contents}));
  output.setHeaders({ 
    'Access-Control-Allow-Methods': 'OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });return output;
}*/
function doPost(e){
  return handleResponse(e);
}
function fillUpWithCard(doc){
return doc.getSheetByName("sheet2");
}
function unsub(doc){
return doc.getSheetByName("sheet3");
}
function sub(doc){
return doc.getSheetByName("sheet4");
}
function scraft(doc){
   doc= SpreadsheetApp.openById('1MsBEh0y7fxQGkV0g4ynrS-BoIzoMFsmNc7X-l4LN5co');
return doc.getSheetByName("sheet1");
}
function handleResponse(e) {
  
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(35000);  // wait 30 seconds before conceding defeat.
  var emmail="";
  const data = JSON.parse(e.postData.contents);
  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    var email = e.parameter['email']; // Assuming 'email' is the field containing the email address
    emmail=email;
if(e.parameter['cardnum']!==undefined && e.parameter['cardnum']!==''){sheet=fillUpWithCard(doc); }

if(e.parameter['unsubemail']!==undefined && e.parameter['unsubemail']!==''){sheet=unsub(doc); }
  if(e.parameter['subemail']!==undefined && e.parameter['subemail']!==''){sheet=sub(doc); 
  ContentService
        .createTextOutput(JSON.stringify({ "result": "Redirect.", "success ": "data" }))
        .setMimeType(ContentService.MimeType.JSON);
  }
if(e.parameter['product_url']!==undefined && e.parameter['product_url']!==''){}sheet=scraft(doc);
ContentService
        .createTextOutput(JSON.stringify({ "result": "Redirect.", "success ": data }))
        .setMimeType(ContentService.MimeType.JSON);
  // Check for duplicate email in Sheet11
  var duplicateCheck = sheet.getRange("C:C").getValues(); // Assuming email addresses are in column C
var passw = sheet.getRange("D:D").getValues();
  if(email!==undefined || email=='')
  for (var i = 0; i < duplicateCheck.length; i++) {
    if(duplicateCheck[i][0]!=='')
    if (duplicateCheck[i][0].toLowerCase() == email.toLowerCase()) {
      //break;
      // Duplicate found, throw error message

      if(e.parameter['password']==passw[i][0])
      return ContentService
        .createTextOutput(JSON.stringify({ "result": "Redirect.", "success ": e.parameter['email'] }))
        .setMimeType(ContentService.MimeType.JSON);
        else
      return ContentService
        .createTextOutput(JSON.stringify({ "result": "An account already exists for this email.", "error ": "Cannot fetch at all" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(headRow, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = []; 
    // loop through the header columns
    for (i in headers){
      if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else { // else use header name to get data
        row.push(e.parameter[headers[i]]);
      }
    }
       
    // more efficient to set values as [][] array than individually
     sheet.appendRow([data.name,data.price,data.author,data.item_url,data.item_image,new Date()]);
    //sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return json success results
 
    return ContentService
          .createTextOutput(JSON.stringify({"result":emmail, "row":data.title}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e){
    // if error return this
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error Katt": e.message}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
  
}
 /*function doGet(e) {
  try {
    // Implement locking for concurrency control
    var lock = LockService.getScriptLock();
    lock.tryLock(10000); // Adjust timeout as needed

    // Retrieve the necessary data (assuming similar structure to doPost)
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Determine content or actions for GET requests
    // Options:
    // 1. Return a static message
    var message = "Hello from doGet!";

    // 2. Retrieve and return data from the sheet
    // var dataToReturn = sheet.getDataRange().getValues();

    // 3. Display a UI for data entry or interaction
    // var htmlOutput = HtmlService.createHtmlOutputFromFile('index'); // Assuming an HTML file for UI

    return ContentService
      .createTextOutput(message) // Replace with selected content or UI
      .setMimeType(ContentService.MimeType.TEXT); // Adjust MIME type if needed

  } catch (e) {
    // Handle errors gracefully
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    // Always release the lock
    lock.releaseLock();
  }
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
function appendJsonData(sheetName, jsonData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headerRow = sheet.getRange(1, 1).getValue();

  // Check if the header row is empty
  if (!headerRow) {
    // If the header row is empty, create it from the first JSON object
    var firstObject = jsonData[0];
    var headers = Object.keys(firstObject);
    sheet.getRange(1, 1).setValue(headers.join(','));
  }

  // Get the last row with data
  var lastRow = sheet.getLastRow();

  // Prepare data for appending
  var dataToAppend = jsonData.map(function(obj) {
    return Object.values(obj);
  });

  // Append the data to the sheet, starting from the next empty row
  sheet.getRange(lastRow + 1, 1).setValues(dataToAppend);
}
*/
