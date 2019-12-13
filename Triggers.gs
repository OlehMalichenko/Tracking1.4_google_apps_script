//-------------------MAIN-FUNCTION--------------------//
/* Two daily triggers
started mainFinal at hour_
started mainEstimated at hour_
*/
function triggerStart(){

  ScriptApp.newTrigger("mainFinal")
  .timeBased()
  .atHour(1)
  .everyDays(1)
  .inTimezone("Europe/Berlin")
  .create(); 
  
  ScriptApp.newTrigger("mainEstimated")
  .timeBased()
  .atHour(9)
  .everyDays(1)
  .inTimezone("Europe/Berlin")
  .create(); 
  
//  ScriptApp.newTrigger("main_collapse_month")
//  .timeBased()
//  .atHour(2)
//  .everyDays(1)
//  .inTimezone("Europe/Berlin")
//  .create(); 
//  
//  ScriptApp.newTrigger("main_collapse_week")
//  .timeBased()
//  .atHour(3)
//  .everyDays(1)
//  .inTimezone("Europe/Berlin")
//  .create(); 
}