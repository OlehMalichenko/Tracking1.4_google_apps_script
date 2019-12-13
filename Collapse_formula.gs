function set_formulas_to_column(delta, num) 
{
  var app   = SpreadsheetApp;
  var ss    = app.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  // start from 4 row (with title rows)
  var row      = 4;
  var last_row = sheet.getLastRow();
  
  for (row; row<=last_row; row++)
  {
    formula_for_(row, delta, num, sheet);
  }
}




function formula_for_(row,delta, num, sheet)
{
  var name_data = sheet.getRange(row, 5).getValue();
    
  if (name_data == "Estimates" || name_data == "Finals " || name_data == "Finals" || name_data == "Cost" || name_data == "Costs")
  {
    var formula_gorizontal = "=SUMIFS ( R[0]C[1]:R[0]C["+num+"]  ;  R2C[1]:R2C["+num+"];  \"\")";
    sheet.getRange(row, delta).setFormula(formula_gorizontal);
  }
  
  if (name_data == "Return")
  {
    var formula_return = "=R[-2]C[0] - R[-1]C[0]";
    sheet.getRange(row, delta).setFormula(formula_return);
  }
  
  if (name_data == "ROI" || name_data == "Roi")
  {
    var formula_roi = "=R[-3]C[0] / R[-2]C[0] - 1";
    sheet.getRange(row, delta).setFormula(formula_roi);
  }
}
  
  
  
  
  