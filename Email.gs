function myFunction() {
  var str = "123";
  var bStr = Utilities.newBlob(str);
  MailApp.sendEmail('olehmhelo@gmail.com', 'Attachment example', str);
  
}
