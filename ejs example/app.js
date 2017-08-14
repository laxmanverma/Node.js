var express = require('express');

var app = express();

app.set('view engine','ejs');         //Set View Engine

app.get('/',function(req,res){
	res.send("Hello World");
});

app.get('/success',function(req,res){
  res.render('success');
});

app.listen(3000,function(){
	console.log("Server is running at 3000");
});