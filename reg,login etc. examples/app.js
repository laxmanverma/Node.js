var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');

/**
* mongodb connection
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://laxman:laxman@ds161960.mlab.com:61960/laxman');

var userSchema = mongoose.Schema({
  local:{
    email: String,
    password: String,
    first_name: String,
    last_name: String
  }});

var User = mongoose.model('User', userSchema);
//---------------------------------
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','ejs');         //Set View Engine

/**
* Send html pages in Response to the Request
*/
app.get('/',function(req,res){
  res.render('register');
});

app.get('/login',function(req,res){
  res.render('login');
});

app.get('/success',function(req,res){
  res.render('success');
});
/*
Post methods
*/
app.post('/register',function(req,res){

    var newUser = new User();
    newUser.local.email = req.body.email;
    newUser.local.password = req.body.password;
    newUser.local.first_name = req.body.first_name;
    newUser.local.last_name = req.body.last_name;
    console.log(newUser.local.email + " : " + newUser.local.password);

    if(req.body.password == req.body.password2){
        newUser.save(function(err){
          if(err) throw err;
          else {
            console.log("Success Data saved successfully!");
            // window.open("REgistration successfull")
            res.redirect('/login');
          }
        });
      }else {
        console.log("Password didnot match!");
      }
});

app.listen(3000,function(){
	console.log("Server is running at 3000");
});
