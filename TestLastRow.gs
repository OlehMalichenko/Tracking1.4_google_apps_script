function testLastRow(){
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  
 
  var row = 11;
  var lastRow = actS.getLastRow();
  var dict = {};
  for(row; row<=lastRow; row++){
    actS.getRange(row, 1).setFormula("=SUBTOTAL(109;F"+row+")");
    var domain = actS.getRange(row, 4).getValue();  // domain column
    if(domain == ""){continue;}
    
    if(dict[domain] == undefined){dict[domain] = {};}
    var nameData = actS.getRange(row, 5).getValue(); // nameData column
    if(nameData == ""){continue;}
    dict[domain][nameData] = row;
  }
  Logger.log(dict);
}

//function getHiddenAndFilteredRows() {
//  var sheet = SpreadsheetApp.getActiveSheet();
//  var data = sheet.getDataRange().getValues();
//  for (var d=0; d<data.length; d++) {
//    var r = d + 1;
//    if (sheet.isRowHiddenByFilter(d+1)) {
//      sheet.getRange(r, 6).setFormula("=SUM(G"+r+":H"+r+")");//sheet.getRange(d+1, 6).setFormula("=SUM(G"+d+1+":H"+d+1+")");
//      Logger.log("Row #" + d + " is filtered - value: " + data[d][0]);
//      continue;
//    }
//    if (sheet.isRowHiddenByUser(d+1)) { 
//      sheet.getRange(d+1, 6).setValue(5);//setFormula("=SUM(G"+d+1+":H"+d+1+")");
//      Logger.log("Row #" + d + " is hidden - value: " + data[d][0]);
//      continue;
//    }
//    // processRow(d)    
//  }
//}

