// ========= //
//MAIN function wen collapse
function collapse_work(weekNumber) 
{
  var sheet = getSheet();
  
  // insert columns and prepeare numbers needed columns
  var after_column = 8;
  var delta_column = insert_column_to(sheet, after_column);
  var prev_column  = delta_column + 8;
  
  // set week number to the columns title
  sheet.getRange(3, delta_column).setValue((weekNumber-1).toString());
  
  // collapse week and return how match columns in week
  var num_columns_in_week = collapse_week(sheet, delta_column);
  
  set_formulas_to_column(delta_column, num_columns_in_week);
  
  // set colors to ROI in delta_week column
  set_colors_to_column(delta_column);
  
  // get number week in quarter order weeks
  var prev_value = sheet.getRange(2, prev_column).getValue();
  
  var now_value  = prepeare_value_for_collapse_week_from(prev_value);
  
  // set quater-number week
  sheet.getRange(2, delta_column).setValue(now_value);
  
  // check month (4 weeks) for collapse
  if (now_value == 4)
  {
    // insert month column and get start column in month group and set marker to 2 row
    var start_month = insert_delta_month_column(sheet, delta_column);
    var delta_month = delta_column;
    
    // how match columns in month group and get array with numbers of weeks
    var num_and_title = get_number_columns_for_month_group(sheet, start_month);
    
    // collapse month and return how match columns in month
    var num_month = collapse_month(sheet,start_month,num_and_title[0]);
    
    // set title to month column (from array)
    set_title_to_month(sheet, num_and_title[1], delta_month);
    
    // set formulas to delta month column
    set_formulas_to_column(delta_month, num_month);
    
    // set colors to ROI in delta_month column
    set_colors_to_column(delta_month);
  }
}





// ========= //
// insert column after start column
function insert_column_to(sheet, after_column)
{
  sheet.insertColumnAfter(after_column);
  
  // temp marker to 2 row for cancel count all formulas
  sheet.getRange(2, after_column + 1).setValue("w");
  
  return after_column + 1;
}





// ========= //
function collapse_week(sheet, delta_column)
{
  var week_columns_step = 7;
  var first_for_colapse = delta_column + 1;
  
  var rangeBlock = sheet.getRange(3,first_for_colapse,1,week_columns_step);
  rangeBlock.shiftColumnGroupDepth(1);
  rangeBlock.collapseGroups();
  
  return week_columns_step;
}





// ========= //
function prepeare_value_for_collapse_week_from(prev_value)
{
  var val = +prev_value;
  
  if (isNaN(val) || val == 0 || val >= 4)
  {
    return 1;
  }
  return val + 1;
}





// ========= //
function insert_delta_month_column(sheet, col_start)
{
  sheet.insertColumnBefore(col_start);
  
  // marker to 2 row. after inserting col_start is delta column
  sheet.getRange(2, col_start).setValue("m");
  
  return col_start + 1;
}





// ========= //
function get_number_columns_for_month_group(sheet, start_col) 
{
  var end_col = 0;
  var num_columns_all = 0;
  var titles_weeks = [];
  
  // run four iteration (four week)
  for (var i = 1; i<=4; i++)
  {
    try 
    { 
      // get next column group starting from start_col
      var col_group = sheet.getColumnGroup(start_col, 1); 
    } 
    
    catch (e) 
    {
      Logger.log(e)
      break;
    }
    
    // num_columns in one group
    var control_index = col_group.getControlIndex();
    var num_columns = col_group.getRange().getNumColumns();
    
    // get indexes for start next group and added to all number columns 
    end_col = control_index + num_columns;
    start_col = end_col + 1;
    num_columns_all = num_columns_all + num_columns + 1;
    
    // get title weeks for title month
    var title_week = sheet.getRange(3,control_index).getValue();
    titles_weeks.push(title_week);
  
  }
  
  return [num_columns_all, titles_weeks];
}





// ========= //
function collapse_month(sheet, col_start, num_columns)
{  
  var range = sheet.getRange(3, col_start, 1, num_columns);
  range.shiftColumnGroupDepth(1);
  range.collapseGroups();
  
  return num_columns;
}





// ========= //
function set_title_to_month(sheet, arr_title_weeks, column_month)
{
  var last = arr_title_weeks.length - 1;
  var arr = [arr_title_weeks[0], arr_title_weeks[last]];
  var title = arr.join(' - ');
  
  sheet.getRange(3, column_month).setValue(title);

}






























//// ========= //
//function check_need_collapse_for_four_weeks(sheet, delta_column)
//{
//  var last_column = sheet.getLastColumn();
//  
//  // list with symbols in row-2 wen
//  var data_list = sheet.getRange(2,delta_column,1,last_column).getValues();
//  
//  var need = false;
//  
//  // find first no_empty data and check by 4 and break
//  for each (var d in data_list[0]) // deep data_list is 2 lists
//  {
//    if (d != "")
//    {
//       if (d == 4) 
//       { 
//         need = true; 
//       }
//       break;
//    }
//    else { continue; }
//  }
//  
//  return need;
//}

