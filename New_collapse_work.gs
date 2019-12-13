// ================================================================================= //
function week_collapse(first, last) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var count = 1;
  
  for (first; first >= last; first--) {
    
    var val = sheet.getRange(3, first).getValue();
    var date = new Date(val);
    var week_day = date.getDay(); 
    
    if ((week_day == 0 || first == last) && count != 0) {
      // insert column delta
      sheet.insertColumnBefore(first);
      
      // collapse week
      var rangeBlock = sheet.getRange(1,first + 1,1,count);
      rangeBlock.shiftColumnGroupDepth(1);
      rangeBlock.collapseGroups();
      
      // title
      var week_title = +(Utilities.formatDate(new Date(date), "Europe/Kiev", "w")) - 1; 
      if (week_day != 0 && first == last) {
        week_title++; 
      }
      sheet.getRange(3, first).setValue(week_title.toString());
      sheet.getRange(2, first).setValue("w");
      
      
      // formula
      set_formulas_to_column(first, count);
      set_colors_to_column(first);
      
      count = 1;
    } 
    else {
      if (week_day == 0) {
        count = 1; 
      } else {
        count++;
      }
    }
  }
}



// ================================================================================= //
function month_collapse(month_check, year_check, date_str) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var arr_check = get_arrColumns(month_check, year_check); 
  
  // first and last coluns for target month
  var first_last_month_columns = get_need_columns(arr_check);
  var first_month_column       = first_last_month_columns["first"];
  var last_month_column        = first_last_month_columns["last"];
  
  // insert column before last day in month and update position
  sheet.insertColumnBefore(last_month_column);
  sheet.getRange(3, last_month_column).setValue(date_str.toString());
  sheet.getRange(2, last_month_column).setValue("m");
  first_month_column++;
  last_month_column++;
  var num_columns = first_month_column - last_month_column +1;
  
  // collapse month
  var rangeBlock = sheet.getRange(1,last_month_column,1,num_columns);
  rangeBlock.shiftColumnGroupDepth(1);
  rangeBlock.collapseGroups();
  
  // delta-column
  var delta_col = last_month_column - 1;
  set_formulas_to_column(delta_col, num_columns);
  set_colors_to_column(delta_col);
  
  // return columns start and end month
  return [first_month_column, last_month_column];
}



// ================================================================================= //
function get_arrColumns(month_check, year_check) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var last_column = sheet.getLastColumn();
  var values = sheet.getRange(3, 1, 1, last_column).getValues();
  
  var arr_check = []; 
  for (var value in values[0]) {
    try {
      var date_value  = new Date(values[0][value]); 
      var month_value = date_value.getMonth();
      var year_value  = date_value.getFullYear();
    } 
    catch (e) {
      Logger.log(e);
      continue;
    }
    
    if (month_value == month_check && year_value == year_check) {
       arr_check.push(value);
    }
  }
  return arr_check;
}



// ================================================================================= //
function get_need_columns(arr)
{
  var dict_result = {};
  arr = arr.sort(function(a,b){return a-b});
  dict_result["last"] = +arr[0] + 1;
  dict_result["first"] = +arr[arr.length - 1] + 1;
  
  return dict_result;
}



// ================================================================================= //
function get_predate_num(date_str) {
  var date = new Date(date_str);
  var month = date.getMonth();
  var year  = date.getFullYear();
  return [month, year];
}

  

// ================================================================================= //
function get_predate_str(month_now, year_now){
  var month = get_month(month_now);
  
  if (month_now <= 1) {
    year_now = year_now - 1;
  }
  
  var date_to_format = month + " 1, " + year_now.toString();
  
  return date_to_format;
}



// ================================================================================= //
function get_month(month_now) {
  // in dict every number month corresponds with two month ago
  var dic_month = {
    0 : "November",
    1 : "December",
    2 : "January",
    3 : "February",
    4 : "March",
    5 : "April",
    6 : "May",
    7 : "June",
    8 : "July",
    9 : "August",
    10: "September",
    11: "October"
  }
  
  try {
    return dic_month[month_now];
  } catch (e) {
    return undefined;
  }
  
}
