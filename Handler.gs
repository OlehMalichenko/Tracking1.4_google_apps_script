//checks if there is a date in the 6th column, which is included in the parameter
function checkColumnDate(date){
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  var col = 8;
  var d = actS.getRange(3, col).getValue();
  var dat = new Date(d);
  var dateSheet   = Utilities.formatDate(dat, "Europe/Berlin", "yyyy-MM-dd");
  var dateInout = Utilities.formatDate(new Date(date), "Europe/Berlin", "yyyy-MM-dd");
  var result = true;
  if(dateSheet != dateInout) {result = false;}
  return result;
}



function defineAndSetColor(column, rowCheck, rowSet){
  var actS = getSheet();
  var ch = +(actS.getRange(rowCheck, column).getValue());
  var color = (ch == 0) ? "black":((ch < 0) ? "red" : "green");
  //actS.getRange(rowCheck, column).setFontColor(color);
  actS.getRange(rowSet, column).setFontColor(color); 
}


function colorsForOneDomain(){
 
  var as = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var column = 8;
  var lastC = as.getLastColumn();
  for(column;column<=lastC;column++){
   defineAndSetColor(column, 84, 85); 
  }
  
}


function colorForTitleColumn(){
 
  var dictDom = rowPosition();
  var arrDom = Object.keys(dictDom);
  
  for each(var dom in arrDom){
    var rowRe = dictDom[dom]["Return"];
    var rowRo = dictDom[dom]["ROI"];
    defineAndSetColor(6, rowRe, rowRo);
  }
}



function getSheet(){
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  return actS;
}



function remove_filters() 
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  sheet.getFilter().remove(); 
}



function getDateEarlierDays_(numDays)
{
  var MPD     = (1000 * 60 * 60 * 24) * numDays; //MILLIS_PER_DAY
  var now     = new Date();
  var earlier = new Date(now.getTime() - MPD);
  var date    = Utilities.formatDate(earlier, "Europe/Berlin", "yyyy-MM-dd");
  var day_num = earlier.getDate();
  var weekDay = earlier.getDay();
  var week    = Utilities.formatDate(earlier, "Europe/Berlin", "w");
  var month   = earlier.getMonth();
  var year    = earlier.getFullYear();
  
  return [date, weekDay, week, day_num, month, year];
}



function test_earlier()
{
  var result = getDateEarlierDays_(4);
  Logger.log(result);
}
