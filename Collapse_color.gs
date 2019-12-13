function test_color()
{
  set_colors_to_column(9);
}


function set_colors_to_column(delta) 
{
  var app   = SpreadsheetApp;
  var ss    = app.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  // start from 4 row (with title rows)
  var row      = 4;
  var last_row = sheet.getLastRow();
  
  for (row; row<=last_row; row++)
  {
    color_roi(row, delta, sheet);
  }
}




function color_roi(row, delta, sheet)
{
  var name_data = sheet.getRange(row, 5).getValue();
  
  if (name_data == "ROI" || name_data == "Roi")
  {
    var roi_value = +(sheet.getRange(row, delta).getValue());
    
    if (isNaN(roi_value))
    {
      return;
    }
    
    var color = ((roi_value <= 0) ? "red" : "green");
    
    sheet.getRange(row, delta).setFontColor(color);
  }
}
