 function createColumnFor_(date){
   var app  = SpreadsheetApp;
   var ss   = app.getActiveSpreadsheet();
   var actS = ss.getActiveSheet();
   
   var col = 8;
   
   actS.insertColumns(col);
   
   // date row - 3
   var dateF = Utilities.formatDate(new Date(date), "Europe/Berlin", "yyyy-MM-dd");
   actS.getRange(3, col).setValue(dateF);
   // estimates row - 4
   actS.getRange(4, col).setFormula("=SUMIF(E11:E;\"Estimates\"; H11:H)");
   actS.getRange(4, col).setNumberFormat("0.00€");
   // finals row - 5
   actS.getRange(5, col).setFormula("=SUMIF(E11:E;\"Finals\"; H11:H)");
   actS.getRange(5, col).setNumberFormat("0.00€");
   // cost row - 6
   actS.getRange(6, col).setFormula("=SUMIF(E11:E;\"Cost\"; H11:H)");
   actS.getRange(6, col).setNumberFormat("0.00€"); 
   // clicks row - 9
   actS.getRange(9, col).setFormula("=SUMIF(E11:E;\"CLICKS\"; H11:H)");
   actS.getRange(9, col).setNumberFormat("0");
   actS.getRange(9, col).setFontColor("black");
   // uniques row - 10
   actS.getRange(10, col).setFormula("=SUMIF(E11:E;\"UNIQUES\"; H11:H)");
   actS.getRange(10, col).setNumberFormat("0");
   actS.getRange(10, col).setFontColor("black");
//   // ctr row - 9
//   actS.getRange(9, col).setFormula("=AVERAGEIF(E11:E;\"CTR\"; H11:H)");
//   actS.getRange(9, col).setNumberFormat("0.00%"); 
//   // epc row - 10
//   actS.getRange(10, col).setFormula("=AVERAGEIF(E11:E;\"EPC\"; H11:H)");
//   actS.getRange(10, col).setNumberFormat("0.00%");
   
   return col;
}


function nextFormulaForTitleColumn(){
 
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  var col = 8;
  actS.getRange(7, col).setFormula("=H5-H6");
  actS.getRange(7, col).setNumberFormat("0.00€");
  actS.getRange(8, col).setFormula("=H5/H6-1");
  actS.getRange(8, col).setNumberFormat("0.00%"); 
}


function createFormula(dictRow){
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  var column = 6;
  var arrDom = Object.keys(dictRow);
  for each(var dom in arrDom){
    if(dictRow[dom]["Estimates"] != undefined){
      var rowE = dictRow[dom]["Estimates"];
      actS.getRange(rowE, column).setFormula("=SUM(G"+rowE+":ZZZ"+rowE+")");
      actS.getRange(rowE, column).setNumberFormat("0.00€");
    }
    if(dictRow[dom]["Finals"] != undefined){
      var rowF = dictRow[dom]["Finals"];
      actS.getRange(rowF, column).setFormula("=SUM(G"+rowF+":ZZZ"+rowF+")");
      actS.getRange(rowF, column).setNumberFormat("0.00€");
    }
    if(dictRow[dom]["Cost"] != undefined){
      var rowC = dictRow[dom]["Cost"];
      actS.getRange(rowC, column).setFormula("=SUM(G"+rowC+":ZZZ"+rowC+")");
      actS.getRange(rowC, column).setNumberFormat("0.00€");
    }
    if(dictRow[dom]["Return"] != undefined){
      var rowR = dictRow[dom]["Return"];
      actS.getRange(rowR, column).setFormula("=F"+rowF+"-F"+rowC+"");
      actS.getRange(rowR, column).setNumberFormat("0.00€");
    }
    if(dictRow[dom]["ROI"] != undefined){
      if(actS.getRange(rowF, column).getValue() != "" && actS.getRange(rowC, column).getValue() != ""){
        var rowRoi = dictRow[dom]["ROI"];
        actS.getRange(rowRoi, column).setFormula("=F"+rowF+"/F"+rowC+"-1");
        actS.getRange(rowRoi, column).setNumberFormat("0.00%");
      }
    }
    if(dictRow[dom]["Return"] != undefined && dictRow[dom]["ROI"] != undefined){
      defineAndSetColor(column, dictRow[dom]["Return"], dictRow[dom]["ROI"]);
    }
  }
}
