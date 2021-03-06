var express = require("express"); 
var app = express(); 
var path = require("path"); 
 
 
app.get('/', function(req, res){ 
  res.sendFile(path.join(__dirname + '/index.html')); 
}); 

app.use('/', express.static(__dirname)); 

var port = process.env.PORT || 5000; 
  app.listen(port, function() { 
    console.log("Listening on " + port); 
});
