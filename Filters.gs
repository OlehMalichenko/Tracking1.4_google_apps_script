//function remove_filters() 
//{
//  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  var sheet = ss.getActiveSheet();
//  
//  sheet.getFilter().remove(); 
//}

function resetFilter() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ssId = ss.getId();
  var dataSheet = ss.getActiveSheet();
  var lastRow = dataSheet.getLastRow();
  var lastColumn = dataSheet.getLastColumn();
  var sheetId = dataSheet.getSheetId();
  
  var filterSettings = {
    "range": {
      "sheetId": sheetId,
      "startRowIndex": 0,
      "endRowIndex": lastRow,
      "startColumnIndex": 0,
      "endColumnIndex": lastColumn
    }
  };
  var requests = [{
    "setBasicFilter": {
      "filter": filterSettings
    }
  }];
  Sheets.Spreadsheets.batchUpdate({'requests': requests}, ssId);
  
}