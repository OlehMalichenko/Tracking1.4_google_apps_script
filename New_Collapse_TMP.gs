// ==================================MONTH===================================== //
function month_collapse_tmp(month_now, year_now) {
  
  // date
  var date_ago = get_predate_str(month_now, year_now);
  var date_ago_nums = get_predate_num(date_ago);
  var month = date_ago_nums[0];
  var year  = date_ago_nums[1];
  var month_title    = Utilities.formatDate(new Date(date_ago), "Europe/Kiev", "MMMM ',' YYYY");  
  
  // collapse month
  month_collapse(month, year, month_title);
  
}




function week_collapse_tmp(month_now, year_now) {
  // date
  var date_ago = get_predate_str(month_now, year_now);
  var date_ago_nums = get_predate_num(date_ago);
  var month = date_ago_nums[0];
  var year  = date_ago_nums[1];
  
  // first and last columns
  var arr_columns = get_arrColumns(month, year);
  var first_last  = get_need_columns(arr_columns);
  var first       = first_last["first"];
  var last        = first_last["last"];
  
  // collapse week
  week_collapse(first, last);
}




function extra_week_collapse() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var value = undefined;
  
  
  for (var col = 66; col<=68; col++) {
    
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


function set_number_column() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var last = sheet.getLastColumn();
  
  for (var col = 1; col<=last; col++) {
    sheet.getRange(1, col).setValue(col); 
  }
  
}


function rrr() {
//  month_collapse_tmp(10, 2019); 
  week_collapse_tmp(10, 2019);
}