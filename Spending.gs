// call to sheet at ID 1p7pFjyjn3EbidjPuBrL0FncnKYeY-u65VwjDRFnCGhE
function getSpending_old(forDate) {
  var sheet = getSheetSpendingOverview();
  var lastRow = sheet.getLastRow();
  var dictDomain = {};
  for(var i = 2; i<=lastRow; i++){
    var domain = sheet.getRange(i, 2).getValue();
    var date = sheet.getRange(i, 3).getValue();
    var spending = sheet.getRange(i, 4).getValue();
    var cur = sheet.getRange(i, 5).getValue();
    var rdp = sheet.getRange(i, 1).getValue();
    if(dictDomain[domain] == undefined){
      dictDomain[domain] = {};     
    } 
    dictDomain[domain][date] = [spending,cur,rdp];
  }
  var arrDom = Object.keys(dictDomain);
  for each(var dom in arrDom){
    var arrDate = Object.keys(dictDomain[dom]);
    var maxDate = getMaxDate(arrDate, forDate);
    if(dictDomain[dom][maxDate] != undefined){
      var cSpending = dictDomain[dom][maxDate][0];
      var currency = dictDomain[dom][maxDate][1];
      var rdp = dictDomain[dom][maxDate][2];
      if(currency == "$"){
        var dtf = Utilities.formatDate(new Date(forDate), "Europe/Berlin", "yyyy-MM-dd");
        cSpending = convertFromUSD(cSpending,dtf);
      }
      dictDomain[dom] = [cSpending, rdp];
    }
  }
  return dictDomain;
}



// call to sheet at ID 1p7pFjyjn3EbidjPuBrL0FncnKYeY-u65VwjDRFnCGhE
function getSpending(forDateTmp) {
  var sheet = getSheetSpendingOverview();
  var lastRow = sheet.getLastRow();
  var forDate = Utilities.formatDate(new Date(forDateTmp), "Europe/Berlin", "yyyy-MM-dd");
  var dictDomain = {};
  for(var i = 2; i<=lastRow; i++){
    var domain = (sheet.getRange(i, 2).getValue()).trim();
    var dateTmp = sheet.getRange(i, 3).getValue();
    var date = Utilities.formatDate(new Date(dateTmp), "Europe/Berlin", "yyyy-MM-dd");
    var spending = sheet.getRange(i, 4).getValue();
    var cur = (sheet.getRange(i, 5).getValue()).trim();
    var rdp = sheet.getRange(i, 1).getValue();
    if(dictDomain[domain] == undefined){
      dictDomain[domain] = {};     
    } 
    dictDomain[domain][date] = [spending,cur,rdp];
  }
  var arrDom = Object.keys(dictDomain);
  for each(var dom in arrDom){
    var arrDate = Object.keys(dictDomain[dom]);
    var maxDateTmp = getMaxDate(arrDate, forDate);
    var maxDate = Utilities.formatDate(new Date(maxDateTmp), "Europe/Berlin", "yyyy-MM-dd");
    if(dictDomain[dom][maxDate] != undefined){
      var cSpending = dictDomain[dom][maxDate][0];
      var currency = dictDomain[dom][maxDate][1];
      var rdp = dictDomain[dom][maxDate][2];
      if(currency == "$"){
        var dtf = Utilities.formatDate(new Date(forDate), "Europe/Berlin", "yyyy-MM-dd");
        cSpending = convertFromUSD(cSpending,dtf);
      }
      dictDomain[dom] = [cSpending, rdp];
    } else {
      dictDomain[dom] = undefined;
    }
  }
  return dictDomain;
}




function convertFromUSD(amount, date){ 
  var url = "https://api.exchangeratesapi.io/" + date;
  var result = UrlFetchApp.fetch(url);
  var json = result.getContentText();
  var data = JSON.parse(json);
  var usd = data["rates"]["USD"];
  var eur = +amount / +usd;
  return eur;
}




function getSheetSpendingOverview(){
  var app  = SpreadsheetApp.openById("1p7pFjyjn3EbidjPuBrL0FncnKYeY-u65VwjDRFnCGhE");
  var ss   = app.getActiveSheet();
  return ss;
}



// nearest date for date in parametr
function getMaxDate(arr, forDate){
  var arrRes = [];
  var dateFor = new Date(forDate);
  for each(var el in arr){
    var elD = new Date(el);
    if(elD > dateFor){continue;}
    if(elD == dateFor){arrRes[0] = elD; break;}
    if (arrRes.length == 0){
      arrRes[0] = elD;
      continue;
    }else{
      if(elD > arrRes[0]) {
        arrRes[0] = elD;
      }
    }
  }
  var maxDate = new Date(arrRes[0]);
  return maxDate;
}

