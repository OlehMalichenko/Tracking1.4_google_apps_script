function main()
{
  var dictDom = rowPosition();
  var arrDom = Object.keys(dictDom);
  
  for each(var dom in arrDom)
  {
    var rowEs = dictDom[dom]["Estimates"];
    var rowF  = dictDom[dom]["Finals"];
    var rowC  = dictDom[dom]["Cost"];
    var rowRe = dictDom[dom]["Return"];
    var rowRo = dictDom[dom]["ROI"];
    var rowCl = dictDom[dom]["CLICKS"];
    var rowUn = dictDom[dom]["UNIQUES"];
    var rowCT = dictDom[dom]["CTR"];
    var rowEP = dictDom[dom]["EPC"];
    
//    formulaEstFinCos(rowEs);
//    formulaEstFinCos(rowF);
//    formulaEstFinCos(rowC);
//    formulaReturn(rowF, rowC, rowRe);
//    formulaROI(rowF, rowC, rowRo);
    formula_CL_UN(rowCl, rowUn);
    formula_CTR_EPC(rowCT, rowEP, rowCl, rowUn, rowF);
  }
}




function formulaToNewDomain()
{
  var dictDom = rowPositionLast();
  var arrDom = Object.keys(dictDom);
  
  for each(var dom in arrDom)
  {
    var rowEs = dictDom[dom]["Estimates"];
    var rowF  = dictDom[dom]["Finals"];
    var rowC  = dictDom[dom]["Cost"];
    var rowRe = dictDom[dom]["Return"];
    var rowRo = dictDom[dom]["ROI"];
    var rowCl = dictDom[dom]["CLICKS"];
    var rowUn = dictDom[dom]["UNIQUES"];
    var rowCT = dictDom[dom]["CTR"];
    var rowEP = dictDom[dom]["EPC"];
    
    formulaEstFinCos(rowEs);
    formulaEstFinCos(rowF);
    formulaEstFinCos(rowC);
    formulaReturn(rowF, rowC, rowRe);
    formulaROI(rowF, rowC, rowRo);
    formula_CL_UN(rowCl, rowUn);
    formula_CTR_EPC(rowCT, rowEP, rowCl, rowUn, rowF);
  }
}




function rowPosition()
{
  var dict = {};
  var as = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var cDom = 4;
  var cNam = 5;
  var cVal = 6;
  
  var lastRow = as.getLastRow();
  
  for each(var row = 15; row <= lastRow; row++)
  {
    var dictR = {};
    var dom = as.getRange(row, cDom).getValue();
    
    if(dict[dom] == undefined)
    {
      dict[dom] = {}; 
    }
    
    var n = as.getRange(row, cNam).getValue();
    
    if(n ==  "Finals" || n ==  "Cost" || n ==  "Return" || n ==  "ROI" || n == "Estimates" || n == "CTR" || n == "EPC" || n == "CLICKS" || n == "UNIQUES")
    {
      dict[dom][n] = row;
    }
  }
  //Logger.log(dict);
  return dict;
}




function rowPositionLast()
{
  var dict = {};
  var as = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var cDom = 4;
  var cNam = 5;
  var cVal = 6;
  
  var lastRow = as.getLastRow();
  var row = lastRow - 8;
  
  for each(row; row <= lastRow; row++)
  {
    var dictR = {};
    var dom = as.getRange(row, cDom).getValue();
    
    if(dict[dom] == undefined)
    {
      dict[dom] = {}; 
    }
    
    var n = as.getRange(row, cNam).getValue();
    
    if(n ==  "Finals" || n ==  "Cost" || n ==  "Return" || n ==  "ROI" || n == "Estimates" || n == "CTR" || n == "EPC" || n == "CLICKS" || n == "UNIQUES")
    {
      dict[dom][n] = row;
    }
  }
  return dict;
}




function formulaEstFinCos(row)
{
  var as    = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = as.getRange(+row, 6);
  //var formula = "=SUM(R[0]C[1]:R[0]))";
  range.setFormula("=SUMIFS(R[0]C[1]:R[0];R2C[1]:R2;\"\")");
  range.setNumberFormat("0.00€");
}




function formulaReturn(rowF, rowC, rowR)
{
  var as      = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range   = as.getRange(+rowR, 6);
  var formula = "=F"+rowF+"-F"+rowC+"";
  
  range.setFormula(formula);
  range.setNumberFormat("0.00€");
}


 

function formulaROI(rowF, rowC, rowR)
{
  var as   = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var valF = as.getRange(+rowF, 6).getValue();
  var valC = as.getRange(+rowC, 6).getValue();
//  if(valF == 0 || valF == ""){
//   as.getRange(rowF, 6).setValue(0.001); 
//  }
//  if(valC == 0 || valC == ""){
//   as.getRange(rowC, 6).setValue(0.001); 
//  }
  var range   = as.getRange(+rowR, 6);
  var formula = "=F"+rowF+"/F"+rowC+"-1";
  range.setFormula(formula);
  range.setNumberFormat("0.00%");
}




function formula_CTR_EPC(rowCT, rowEP, rowCl, rowUn, rowF)
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rangeCT = sheet.getRange(+rowCT, 6);
  var rangeEP = sheet.getRange(+rowEP, 6);
  
  var formulaCT = "=R"+ rowCl +"C[0]/R"+ rowUn +"C[0]";
  var formulaEP = "=R"+ rowCl +"C[0]/R"+ rowF +"C[0]";
  
  var formula_subtotal = "=SUBTOTAL(109;R[0]C[5])";
  
  rangeCT.setFormula(formulaCT);
  rangeEP.setFormula(formulaEP);
  
  rangeCT.setNumberFormat("0.00%");
  rangeEP.setNumberFormat("0.00€");
  
  sheet.getRange(rowCT, 1).setFormula(formula_subtotal);
  sheet.getRange(rowEP, 1).setFormula(formula_subtotal);
}



function formula_CL_UN(rowCl, rowUn)
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var formula = "=SUMIFS(R[0]C[1]:R[0];R2C[1]:R2;\"\")";
  var formula_subtotal = "=SUBTOTAL(109;R[0]C[5])";
  
  sheet.getRange(rowCl, 6).setFormula(formula);
  sheet.getRange(rowUn, 6).setFormula(formula);
  
  sheet.getRange(rowCl, 1).setFormula(formula_subtotal);
  sheet.getRange(rowUn, 1).setFormula(formula_subtotal);
  
  sheet.getRange(rowCl, 6).setNumberFormat("0");
  sheet.getRange(rowUn, 6).setNumberFormat("0");
  
  sheet.getRange(rowCl, 6).setFontColor("black");
  sheet.getRange(rowUn, 6).setFontColor("black");
}




function tmp_run_on_rows()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var last = sheet.getLastRow();
  
  for (var row = 1; row<=last; row++) 
  {
    var row_name = sheet.getRange(row, 5).getValue();
    if (row_name == "EPC" || row_name == "CTR")
    {
      sheet.getRange(row, 6).setFontColor("black");
//      sheet.getRange(row, 6).setNumberFormat("0.00€");
    }
  }
}










