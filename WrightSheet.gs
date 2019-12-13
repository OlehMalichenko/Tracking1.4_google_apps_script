function writeDataToSheetFrom_(dictContent, dictSpending, dictRow, finalMarker, check){
  
  // ===sheet
  var app  = SpreadsheetApp;
  var ss   = app.getActiveSpreadsheet();
  var actS = ss.getActiveSheet();
  
  // ===prepare domain, content and start column
  var arrDomains  = Object.keys(dictContent);
  var dateContent = dictContent[arrDomains[0]]["DATE"];
  var column      = 8; // column for put all data anyway "8"
  
  // ===check need column. if need - create for dateContent
  if(finalMarker == 0 && check == false)
  {
    createColumnFor_(dateContent);
  }
  
  // ===marker for formula SUMIF
  if(finalMarker == 0)
  {
    actS.getRange(2, column).setValue("Est only");
  }
  else
  {
    actS.getRange(2, column).setValue("");
  }
  
  // ===run on dictContent
  for each(var domain in arrDomains)
  { 
    try {
      // domain has standart data
      if (domain != "ALL")
      {
        // wen domain is find in sheet and in Spending
        if(dictRow[domain] != undefined && dictSpending[domain] != undefined)
        {
          // rows for name data for domain
          var rowEstimates = dictRow[domain]["Estimates"];
          var rowFinals    = dictRow[domain]["Finals"];
          var rowCost      = dictRow[domain]["Cost"];
          var rowReturn    = dictRow[domain]["Return"];
          var rowROI       = dictRow[domain]["ROI"];
          var rowCl        = dictRow[domain]["CLICKS"];
          var rowUn        = dictRow[domain]["UNIQUES"];
          var rowCT        = dictRow[domain]["CTR"];
          var rowEP        = dictRow[domain]["EPC"];
          
          // check rows
          if (rowEstimates == undefined || rowFinals == undefined || rowCost == undefined || rowReturn == undefined || rowROI == undefined || rowCl == undefined || rowUn == undefined || rowCT == undefined || rowEP == undefined)
          { 
            continue;
          }
          
          // Estimates or Finals
          var rangeFin = actS.getRange(rowFinals, column);
          if (finalMarker == 0) 
          {
            rangeFin = actS.getRange(rowEstimates, column);
          }
          rangeFin.setValue(dictContent[domain]["EARNINGS"]);
          rangeFin.setNumberFormat("0.00€");
          
          // Cost
          if(dictSpending[domain][0] != undefined)
          {
            actS.getRange(rowCost, column).setValue(dictSpending[domain][0]);
            actS.getRange(rowCost, column).setNumberFormat("0.00€");
          }
          
          // Roi and Return
          var fin = actS.getRange(rowFinals, column).getValue();
          var cos = actS.getRange(rowCost, column).getValue();
          
          // check final and cost
          if (cos != 0 && cos != "")
          {
            if (fin != 0 && fin != "")
            { 
              // ROI number and dependent color
              var roiN = (+fin / +cos) - 1;
              var color = (roiN == 0) ? "black":((roiN < 0) ? "red" : "green");
              
              // set ROI in cell and percent format and color
              actS.getRange(rowROI, column).setValue(roiN);
              actS.getRange(rowROI, column).setNumberFormat("0.00%");
              actS.getRange(rowROI, column).setFontColor(color);
              
              // return number and evro format and color
              var returnN = +fin - +cos;
              actS.getRange(rowReturn, column).setValue(returnN);
              actS.getRange(rowReturn, column).setNumberFormat("0.00€");
            }  
          }
          
          // clicks
          actS.getRange(rowCl, column).setValue(dictContent[domain]["CLICKS"]);
          actS.getRange(rowCl, column).setFontColor("black");
          
          // uniques
          actS.getRange(rowUn, column).setValue(dictContent[domain]["UNIQUES"]);
          actS.getRange(rowUn, column).setFontColor("black");
          
          // ctr
          actS.getRange(rowCT, column).setValue(dictContent[domain]["CTR"]);
          actS.getRange(rowCT, column).setNumberFormat("0.00%");
          actS.getRange(rowCT, column).setFontColor("black");
          
          // epc
          actS.getRange(rowEP, column).setValue(dictContent[domain]["EPC"]);
          actS.getRange(rowEP, column).setNumberFormat("0.00€");
          actS.getRange(rowEP, column).setFontColor("black");
          
        } else { continue; } // continue if sheet is not has domain from Sedo
        
        // domain has All for CTR EPC
      } else {
        // CTR row for all - 11
        actS.getRange(11, column).setValue(dictContent[domain]["CTR"]);
        actS.getRange(11, column).setNumberFormat("0.00%");
        actS.getRange(11, column).setFontColor("black");
        
        // EPC row for all - 12
        actS.getRange(12, column).setValue(dictContent[domain]["EPC"]);
        actS.getRange(12, column).setNumberFormat("0.00€");
        actS.getRange(12, column).setFontColor("black");
      }
    }
    catch (e) {
      continue;
    }
  }
  
  
  // set color on title rows in start Column - 8 (return - 7 row, roi - 8 row)
  if(finalMarker == 1)
  {
    nextFormulaForTitleColumn();
    defineAndSetColor(column, 7, 8);
    colorForTitleColumn();
  }
  
  create_filter();
}


function create_filter() 
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var last_col = sheet.getLastColumn();
  var last_row = sheet.getLastRow();
  var range = sheet.getRange(14, 1, last_row, last_col);
  
  range.createFilter();
}