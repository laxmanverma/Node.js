const path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const request = require('request');
const PORT = process.env.PORT || 5000;

var app = express();

//for mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : 'sql12.freemysqlhosting.net',
   user     : 'sql12245682',
   password : 'fnIlpy3rwQ',
   port : 3306,
   database : 'sql12245682'
 });

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");
 } else {
     console.log("Error connecting database ... \n\n");
 }
 });

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.get('/cool', (req, res) => res.send(cool()));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'laxman'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

app.get('/',function(req,res){
  sess = req.session;
  //Session set when user Request our app via URL
  if(sess.token) {
      res.redirect('/admin');
  }
  else {
    console.log("here");
      res.redirect('http://www.last.fm/api/auth/?api_key=d85554ca2d50a84c022662e8e7c48304&cb=https://shielded-lake-23229.herokuapp.com/login');
  }
});

app.get('/login',function(req,res){
  sess = req.session;
  sess.token = req.query.token;
  // console.log(sess.token);
  var getUser = require('./getUser');
  getUser.user(sess.token, function(result) {
    // console.log(result);
    req.session.username = result;
    res.redirect('/admin?' + result);
  });
});

app.get('/admin',function(req,res){
  sess = req.session;
  console.log(sess);
  if(sess.token) {
    username = sess.username;
    res.render("index.html");
    // res.write('<h1>Hello '+sess.username+'</h1>');
    // res.end('<a href="http://localhost:3000/logout">Logout</a>');
  } else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href="/">Login</a>');
  }
});

app.get('/recent',function(req,res){
  sess = req.session;
  if(sess.token) {
    res.render("recentTracks.html");
  } else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href="/">Login</a>');
  }
});

app.get('/favorite',function(req,res){
  sess = req.session;
  if(sess.token) {
    res.render("favorite.html");
  } else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href="/">Login</a>');
  }
});

app.get('/userData',function(req,res){
  sess = req.session;
  var response;
  if(sess.token) {
    url = 'http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user='+ sess.username +'&api_key=d85554ca2d50a84c022662e8e7c48304&format=json';
    request(url, { json: true }, (err, resp, body) => {
      if (err) { return console.log(err); }
      res.json(body);
    });
  } else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href="/">Login</a>');
  }
});

app.get('/recentTracks',function(req,res){
  sess = req.session;
  var response;
  if(sess.token) {
    url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+ sess.username +'&api_key=d85554ca2d50a84c022662e8e7c48304&format=json';
    request(url, { json: true }, (err, resp, body) => {
      if (err) { return console.log(err); }
      res.json(body);
    });
  } else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href="/">Login</a>');
  }
});

app.get('/favoriteTracks',function(req,res){
  sess = req.session;
  var username = sess.username;
  if(sess.token) {
    connection.query("SELECT * from Favorite where userName= '" + username +"'", function(err, rows, fields) {
     // connection.end();
       if (!err) {
         console.log('The result is: ', rows);
         res.json(rows);
       }
       else
         console.log('Error while performing Query.');
       });
  } else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href="/">Login</a>');
  }
});

app.post('/markFavorite',function(req,res){
  sess = req.session;
  console.log(req.body.name);
  var a = 0;
  if(sess.token) {
    url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+ sess.username +'&api_key=d85554ca2d50a84c022662e8e7c48304&format=json';
    request(url, { json: true }, (err, resp, body) => {
      if (err) { return console.log(err); }
      for (data in body.recenttracks.track) {
        a = a + 1;
        if (a == req.body.name) {
          var username = sess.username;
          var name = body.recenttracks.track[data].name;
          var url = body.recenttracks.track[data].url;
          connection.query("insert ignore into Favorite (userName,trackName,trackUrl) values ('"+username+"','"+name+"','"+url+"')", function(err, rows, fields) {
           // connection.end();
             if (!err) {
               console.log('Done');
               // res.json(rows);
             }
             else
               console.log('Error while performing Query.', err);
             });
          break;
        }
      }
      res.json("added");
    });
  } else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href="/">Login</a>');
  }
});

app.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("successfully logout");
      res.redirect('/');
    }
  });

});

// app.listen(PORT, () => {
//   console.log('Server listening on: http://localhost:%s', PORT);
// });
// app.listen(3000,function(){
//   console.log("App Started on PORT 3000");
// });
