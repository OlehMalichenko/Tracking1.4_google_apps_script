// ================================INSERT NEW ROWS==================================== //
function insert_main() 
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var last_row = sheet.getLastRow();
  
  for (var row = 1; row<=last_row; row++) 
  {
    try 
    {
      var value_main   = (sheet.getRange(row, 5).getValue()).trim().toUpperCase(); 
      if (value_main == "ROI") 
      {
        var status = sheet.getRange(row, 2).getValue();
        var rdps   = sheet.getRange(row, 3).getValue();
        var domain = sheet.getRange(row, 4).getValue();
        insert_rows(row,status,rdps,domain); 
        last_row = last_row + 2;
        row = row + 2;
      }
    } 
    catch (e) { continue; }
  }
}



function insert_rows(after_row,status,rdps,domain) 
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // two rows after ROI
  sheet.insertRowsAfter(after_row, 2);
  
//  // ctr row
//  sheet.getRange(after_row+1, 2).setValue(status);
//  sheet.getRange(after_row+1, 3).setValue(rdps);
//  sheet.getRange(after_row+1, 4).setValue(domain);
//  sheet.getRange(after_row+1, 5).setValue("CTR");
//  
//  
//  // epc row
//  sheet.getRange(after_row+2, 2).setValue(status);
//  sheet.getRange(after_row+2, 3).setValue(rdps);
//  sheet.getRange(after_row+2, 4).setValue(domain);
//  sheet.getRange(after_row+2, 5).setValue("EPC");
  
  // ctr clicks
  sheet.getRange(after_row+1, 2).setValue(status);
  sheet.getRange(after_row+1, 3).setValue(rdps);
  sheet.getRange(after_row+1, 4).setValue(domain);
  sheet.getRange(after_row+1, 5).setValue("CLICKS");
  
  
  // epc uniques
  sheet.getRange(after_row+2, 2).setValue(status);
  sheet.getRange(after_row+2, 3).setValue(rdps);
  sheet.getRange(after_row+2, 4).setValue(domain);
  sheet.getRange(after_row+2, 5).setValue("UNIQUES");
}
// ==================================================================================== //




// ================================FORMULAS SET======================================= //
function formula_title_main()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  for (var row=1; row<=12; row++)
  {
    var name_data = (sheet.getRange(row, 5).getValue()).trim().toUpperCase(); 
    if (name_data == "CTR")
    {
      
    }
  }
}




























