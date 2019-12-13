// ==================================MONTH===================================== //
function main_collapse_month() {
  // ===DATE=== //
  var earlierDays = 8;
  var date_d      = getDateEarlierDays_(earlierDays);
  var date        = date_d[0];
  var weekDay     = date_d[1];
  var weekNumber  = date_d[2];
  var monthDay    = date_d[3];
  var month_now   = date_d[4];
  var year_now    = date_d[5];
  
  if (monthDay == 1) {
    
    // date
    var date_ago = get_predate_str(month_now, year_now);
    var date_ago_nums = get_predate_num(date_ago);
    var month = date_ago_nums[0];
    var year  = date_ago_nums[1];
    var month_title    = Utilities.formatDate(new Date(date_ago), "Europe/Kiev", "MMMM ',' YYYY");  
  
    // collapse month
    month_collapse(month, year, month_title);
    
  }
}



// ====================================WEEK====================================== //
function main_collapse_week() {
  // ===DATE=== //
  var earlierDays = 8;
  var date_d      = getDateEarlierDays_(earlierDays);
  var date        = date_d[0];
  var weekDay     = date_d[1];
  var weekNumber  = date_d[2];
  var monthDay    = date_d[3];
  var month_now   = date_d[4];
  var year_now    = date_d[5];
  
  if (monthDay == 1) {
    
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
}