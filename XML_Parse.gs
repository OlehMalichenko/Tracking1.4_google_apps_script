function getContentFrom_(xml){
  var document    = XmlService.parse(xml);
  var root        = document.getRootElement();
  var items       = root.getChildren("item");
  var dictDomain  = {}; // dictionary wen key is domain and value is array with all "item-blocks" in form dictionary
  if(items != null){
    // run for all items in xml
    for(var i = 0; i<items.length; i++){
      var item = items[i];
      // create one "item-block"
      var dict = {
      "DOMAIN"   :item.getChild("domain").getValue(),
      "DATE"     :item.getChild("date").getValue(),
      "C1"       :item.getChild("c1").getValue(),
      "C2"       :item.getChild("c2").getValue(),
      "C3"       :item.getChild("c3").getValue(),  
      "EARNINGS" :item.getChild("earnings").getValue()
      }
      var domain = dict["DOMAIN"]; // get domain for key
      // key is domain. value is array with dicts. And if not this key - create array with first dict
      if(dictDomain[domain] == undefined){
        dictDomain[domain] = [dict];
      }else{
        dictDomain[domain].push(dict);
      }
    }// end "for" in items
  // variant wen "faultcode"  
  }else if(root.getChild("faultcode") != null){
    var dictDomain = [{"FAULT" : root.getChild("faultcode").getValue() + " - " + root.getChild("faultstring").getValue()}];
  }else{
    var dictDomain = [{"FAULT" : "Error"}];
  }
  // dictDomain has need proccesing
  var dictResult = proccesing_(dictDomain);
  return dictResult;
}



function proccesing_(dictDomain){
  var dictResult = {};
  for each(var arr in dictDomain){
    var dict = {
      "DOMAIN"   :arr[0]["DOMAIN"],
      "DATE"     :arr[0]["DATE"], 
      "EARNINGS" :0 };
    for each(var itemDict in arr){
      if(itemDict["C1"] != null || itemDict["C2"] != null || itemDict["C3"] != null){       
        dict["EARNINGS"] = +dict["EARNINGS"] + +itemDict["EARNINGS"];
      }
    }
    dictResult[dict["DOMAIN"]] = dict;
  }
  return dictResult;
}



function mix_content(dict_main, dict_ctr)
{
   for (var domain in dict_main) 
   {
     try {
       var ctr = dict_ctr[domain]["CTR"];
       var epc = dict_ctr[domain]["EPC"];
       var uni = dict_ctr[domain]["UNIQUES"];
       var clc = dict_ctr[domain]["CLICKS"];
     } catch (e) {
       continue;
     }
     
     if (ctr != undefined && epc != undefined) 
     {
       dict_main[domain]["CTR"]     = ctr;
       dict_main[domain]["EPC"]     = epc;
       dict_main[domain]["UNIQUES"] = uni;
       dict_main[domain]["CLICKS"]  = clc;
     }
   }
  
  try {
    var dictAll = dict_ctr["ALL"]; 
    dict_main["ALL"] = dictAll;
  } catch (e) {
    Logger.log(e);
  }
  
  return dict_main;
}
















