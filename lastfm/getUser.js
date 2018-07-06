var md5 = require('md5');
const request = require('request');
var parseString = require('xml2js').parseString;

const api_key = "d85554ca2d50a84c022662e8e7c48304";
const secret_key = "ff095133a86a6cf6874ccf652cb7d2a8";
var user = function(token, callback) {
  var api_sign = getApiSign(token);
  var url = 'http://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=' + token + '&api_key=' + api_key + '&api_sig=' + api_sign + '&format=json';
  console.log(url);
  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    // console.log(body.session.name);
    // console.log(body.session.key);
    callback(body.session.name);
  });
}

var getApiSign = function(token) {
  api_sign_string = 'api_key' + api_key + 'methodauth.getSessiontoken' + token + secret_key;
  api_sign = md5(api_sign_string);
  console.log(api_sign);
  return api_sign;
}

module.exports = {
  user : user
}
