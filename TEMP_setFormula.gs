function setAllNewFormula(){
 
  var actS = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var dictRow = getDictWithRows();
  var arrDom = Object.keys(dictRow);
  
  var lastColumn = actS.getLastColumn();
  var lastRow = actS.getLastRow();
  
  for (var column = 8; column <= lastColumn; column++){
   
    var tRetRow = 7;
    var tRoiRow = 8;
    
    var tRetVal = actS.getRange(tRetRow, column).getValue();
    actS.getRange(tRoiRow, column).setFormula("=R[-3]C[0] / R[-2]C[0] - 1");
    actS.getRange(tRoiRow, column).setNumberFormat("0.00%");
    var color = (+tRetVal == 0) ? "black":((+tRetVal < 0) ? "red" : "green");
    actS.getRange(tRoiRow, column).setFontColor(color);
    
    
    for each(var dom in arrDom){
     
      var dictData = dictRow[dom];
      var retRow = dictData["Return"];
      var roiRow = dictData["ROI"];
      
      var retVal = actS.getRange(retRow, column).getValue();
      if(retVal == "" || retVal == undefined){continue;}
      
      //actS.getRange(roiRow, column).setFormula("=F"+finRow+"/F"+cosRow+"-1");
      actS.getRange(roiRow, column).setFormula("=R[-3]C[0] / R[-2]C[0] - 1");
      actS.getRange(roiRow, column).setNumberFormat("0.00%");
      var color = (+retVal == 0) ? "black":((+retVal < 0) ? "red" : "green");
      actS.getRange(roiRow, column).setFontColor(color); 

    }
    
  }
  
}



function ddd(){
 
  var actS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
  
  var col = actS.getRange(2, 2).setFormula("=R[1]C[-1] + R[2]C[-1] - 1");
  
}