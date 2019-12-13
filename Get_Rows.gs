/* 
collect all rows for data distribution
!!! start - 13 row; domain in 4 column; dataNames in 5 column
dict[domain][nameData] -> row
for used return dict - indicate dataNames only those that are listed in sheet
*/
function getDictWithRows()
{
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  
  actS.getFilter().remove();
  
  var row     = 15;
  var lastRow = actS.getLastRow();
  
  var dict = {};
  
  for(row; row<=lastRow; row++)
  {
    //actS.getRange(row, 1).setFormula("=SUBTOTAL(109;F"+row+")");
    
    // domain 
    var domain = actS.getRange(row, 4).getValue();  
   
    if(domain == "") { continue; }
    
    // new domain element if this element not found
    if(dict[domain] == undefined) { dict[domain] = {}; }
    
    // name data
    var nameData = actS.getRange(row, 5).getValue(); 
    if(nameData == "") { continue; }
    
    // create dictionary element
    dict[domain][nameData] = row;
  }
  return dict;
}



/*
domain verification in dictSpending and in dictRow
if domain is in the dictSpending and is not in the dictRow - create rows with domain
structure dictSpending: dictSpending[domain][0] -> spending, dictSpending[domain][1] -> rdp
structure dictRow: dict[domain][nameData] -> row
nameData: Estimates, Finals, Cost, Return, ROI
*/
function domainPresenceChecking(dictSpending, dictRow, dictContent)
{
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  
  var arrDomSpending = Object.keys(dictSpending);
  var arrDomSheet    = Object.keys(dictRow);
  
  for each(var dom in arrDomSpending)
  {
    var dict = {};
    if(dictRow[dom] == undefined && dictContent[dom] != undefined && dictSpending[dom] != undefined)
    {
      var rowEs = actS.getLastRow() + 1;
      var rowF  = actS.getLastRow() + 2;
      var rowC  = actS.getLastRow() + 3;
      var rowRe = actS.getLastRow() + 4;
      var rowRo = actS.getLastRow() + 5;
      var rowCl = actS.getLastRow() + 6;
      var rowUn = actS.getLastRow() + 7;
      var rowCT = actS.getLastRow() + 8;
      var rowEP = actS.getLastRow() + 9;
      
      // set dom at 4 column
      actS.getRange(rowEs, 4, 9).setValue(dom);
      
      // set rdps
      actS.getRange(rowEs, 3, 9).setValue(dictSpending[dom][1]); 
      
      // set estimates
      actS.getRange(rowEs, 5).setValue("Estimates");
      actS.getRange(rowEs, 1).setFormula("=SUBTOTAL(109;F"+rowEs+")");
      dict["Estimates"] = rowEs;
      
      // set finals
      actS.getRange(rowF, 5).setValue("Finals");
      actS.getRange(rowF, 1).setFormula("=SUBTOTAL(109;F"+rowF+")");
      dict["Finals"] = rowF;
      
      // set cost
      actS.getRange(rowC, 5).setValue("Cost");
      actS.getRange(rowC, 1).setFormula("=SUBTOTAL(109;F"+rowC+")");
      dict["Cost"] = rowC;
      
      // set return
      actS.getRange(rowRe, 5).setValue("Return"); 
      actS.getRange(rowRe, 1).setFormula("=SUBTOTAL(109;F"+rowRe+")");
      dict["Return"] = rowRe;
      
      // set roi
      actS.getRange(rowRo, 5).setValue("ROI");
      actS.getRange(rowRo, 1).setFormula("=SUBTOTAL(109;F"+rowRo+")");
      dict["ROI"] = rowRo;
      
      // set clicks
      actS.getRange(rowCl, 5).setValue("CLICKS");
      actS.getRange(rowCl, 1).setFormula("=SUBTOTAL(109;F"+rowCl+")");
      dict["CLICKS"] = rowCl;
      
      // set uniques
      actS.getRange(rowUn, 5).setValue("UNIQUES");
      actS.getRange(rowUn, 1).setFormula("=SUBTOTAL(109;F"+rowUn+")");
      dict["UNIQUES"] = rowUn;
      
      // set ctr
      actS.getRange(rowCT, 5).setValue("CTR");
      actS.getRange(rowCT, 1).setFormula("=SUBTOTAL(109;F"+rowCT+")");
      dict["CTR"] = rowCT;
      
      // set epc
      actS.getRange(rowEP, 5).setValue("EPC");
      actS.getRange(rowEP, 1).setFormula("=SUBTOTAL(109;F"+rowEP+")");
      dict["EPC"] = rowEP;
      
      // element for dictRow - domain
      dictRow[dom] = dict;
      
      formulaToNewDomain();
    } 
  }
  return dictRow; 
}