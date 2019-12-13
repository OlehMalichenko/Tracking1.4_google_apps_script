function testMain(){
  
  mainEstimated();
  mainFinal();
  
}

/*
Сontrol function to get final data
finalMarker - marker (1) for URL
earlierDays - num days before for get date
if no column on this date (check) at first get Estimade data and requrse call mainFinal
url -> get xml -> get array from xml -> get spending data -> get rows with domains in sheet
with received data -> processing his data and put to sheet
create formuls to 5 column
*/
function mainFinal()
{
  var finalMarker = 1;
  
  // ===DATE=== //
  var earlierDays = 2;
  var date_d      = getDateEarlierDays_(earlierDays);
  var date        = date_d[0];
  var weekDay     = date_d[1];
  var weekNumber  = date_d[2];
  var monthDay    = date_d[3];
  var month       = date_d[4];
  var year        = date_d[5];
  
  // ===CHECK DATE IN COLUMN=== //
  var check = checkColumnDate(date);
  
  if(check == false){
       finalMarker = 0; 
  }
  
  // ===URL TO SEDO=== //
  var url = createURL(date, finalMarker);
  
  // ===CONTENT=== //
  var xml          = getApiResultFrom_(url);
  var dict_main    = getContentFrom_(xml);
  var dict_ctr     = get_data_CTR_EPC(date);
  var dictContent  = mix_content(dict_main, dict_ctr);

  // ===SPENDING=== //
  var dictSpending = getSpending(date);
  
  // ===ROWS & NEW DOMAIN=== //
  var dictRowF = getDictWithRows();
  var dictRow  = domainPresenceChecking(dictSpending, dictRowF, dictContent); 
  
  
  // ===WRITE=== //
  writeDataToSheetFrom_(dictContent, dictSpending, dictRow, finalMarker, check);
  
  // ===REPEAT=== //
  if(check != true)
  {
       mainFinal();
  } 
  
  // ===COLORS=== //
  defineAndSetColor(6, 7, 8);
}


/*
Сontrol function to get estimated data
work this function is similar to mainFinal except check()
*/
function mainEstimated()
{
  
  var finalMarker = 0;
  
  var earlierDays = 1;
  
  var date_d = getDateEarlierDays_(earlierDays);
  
  var date = date_d[0];
  
//  remove_filters();
  
  var check = checkColumnDate(date);
  
  var url  = createURL(date, finalMarker);
  
  var xml  = getApiResultFrom_(url);
  
  var dictContent = getContentFrom_(xml);
  
  var dictSpending = getSpending(date);
  
  var dictRowF = getDictWithRows();
  
  var dictRow = domainPresenceChecking(dictSpending, dictRowF, dictContent); 
  
  writeDataToSheetFrom_(dictContent, dictSpending, dictRow, finalMarker, check);
  
}
