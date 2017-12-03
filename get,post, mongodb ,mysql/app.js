const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// var mongo = require(mongodb);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb');
var test = require('./test/test');
test(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var userSchema = mongoose.Schema({
  local:{
    first_name: String,
    last_name: String
  }});
//
app.get('/db', function(req, res) {
    var User = mongoose.model('User', userSchema);
    var newUser = new User();
    newUser.local.first_name = req.query.first_name;
    newUser.local.last_name = req.query.last_name;
    // console.log(newUser.local.last_name);
    newUser.save(function(err){
      // console.log("Success Data saved successfully1!");
              if(err) console.log(err);
              else {
                console.log("Success Data saved successfully!");
                res.json({test:'Hello World!'});
              }
            });
});
app.get('/getFromDb', function(req, res) {
  var User = mongoose.model('User', userSchema);
  var newUser = new User();
      newUser.collection.find().toArray(function(err, items) {
          res.json(items);
    });
  });

  app.post('/dbJson', function(req, res) {
    var User = mongoose.model('User', userSchema);
    var newUser = new User();
    newUser.local.first_name = req.body.first_name;
    newUser.local.last_name = req.body.last_name;
    // console.log(newUser.local.last_name);
    newUser.save(function(err){
      // console.log("Success Data saved successfully1!");
              if(err) console.log(err);
              else {
                console.log("Success Data saved successfully!");
                res.json({test:'Hello World!'});
              }
            });
});
// app.get('/jk', function(req, res) {
//    res.json({test:'Hello World!'});
// });
app.post('/register',function(req,res){
  console.log(req.body.test);
  res.json({ status: 'SUCCESS' });
});
//for mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'laxman'
 });

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");
 } else {
     console.log("Error connecting database ... \n\n");
 }
 });

 app.get("/firstQuery",function(req,res){
 connection.query('SELECT * from MyGuests', function(err, rows, fields) {
 connection.end();
   if (!err) {
     console.log('The solution is: ', rows);
     res.json(rows);
   }
   else
     console.log('Error while performing Query.');
   });
 });

app.listen(3000, '0.0.0.0', () => console.log('Example app listening on port 3000!'))
