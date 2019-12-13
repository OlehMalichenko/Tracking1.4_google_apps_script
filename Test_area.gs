function myFunction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var value = undefined;
  
  
  for (var col = 60; col<=80; col++) {
    
    try {
      var index_2 = sheet.getColumnGroup(+col, 2).getControlIndex();
      var index_1 = sheet.getColumnGroup(+index_2, 1).getControlIndex();
      Logger.log("index_1 " + index_1);
      Logger.log("index_2 " + index_2);
      week_collapse(index_2 - 1, index_1 + 1);
      break;
    } 
    catch (e) {
      Logger.log(e);
      continue;
    } 
  }
}


function week_print(first, last) {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  
  for (first; first >= last; first--) { 
    var value = sheet.getRange(3, first).getValue();
    Logger.log(value);
  }
}


function clear_value()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var last_row = sheet.getLastRow();
  var formula_sum    = "=SUMIFS(R[0]C[1]:R[0];R2C[1]:R2;\"\")";
  var formula_return = "=R[-2]C[0]-R[-1]C[0]";
  var formula_roi    = "=R[-3]C[0]/R[-2]C[0]-1";
  var formula_ctr    = "=R[-2]C[0]/R[-1]C[0]";
  var formula_epc    = "=R[-3]C[0]/R[-7]C[0]";
  var euro = "0.00€";
  var per  = "0.00%";
  
  for (var row=15; row<=last_row; row++)
  {
    var name = (sheet.getRange(row, 5).getValue()).trim().toUpperCase();
    
    var range = sheet.getRange(row, 6);
    
//    if (name == "ESTIMATES" || name == "FINALS" || name == "COST" || name == "CLICKS" || name == "UNIQUES")
    if (name == "CLICKS" || name == "UNIQUES")
    {
//      range.setValue(0);
//      range.setFormula(formula_sum);
      range.setNumberFormat("0");
    }
//    
//    if (name == "RETURN")
//    {
//      range.setValue(0);
//      range.setFormula(formula_return);
//      range.setNumberFormat(euro);
//    }
    
    if (name == "ROI")
    {
      range.setValue(0);
      range.setFormula(formula_roi);
      range.setNumberFormat(per);
    }
    
//    if (name == "CTR")
//    {
//      range.setValue(0);
//      range.setFormula(formula_ctr);
//      range.setNumberFormat(per);
//    }
//    
//     if (name == "EPC")
//    {
//      range.setValue(0);
//      range.setFormula(formula_epc);
//      range.setNumberFormat(euro);
//    }
  }
}




