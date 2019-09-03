var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
    // url = 'https://www.indiabix.com/general-knowledge/indian-history/';
    // console.log(req.query.url);
    url = req.query.url;
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var qn = [];
            var q = [];
            var op = [];
            var ans = [];
            $('.bix-div-container .bix-tbl-container .bix-td-qno').each(function (i) {
                qn[i] = $(this).text();
            });
            $('.bix-div-container .bix-tbl-container .bix-td-qtxt').each(function (i) {
                q[i] = $(this).text();
            });
            $('.bix-div-container .bix-tbl-container .bix-td-miscell .bix-tbl-options .bix-td-option').each(function (i) {
                op[i] = $(this).text();
            });
            $('.bix-div-container .bix-tbl-container .bix-td-miscell .bix-div-answer .jq-hdnakqb').each(function (i) {
                ans[i] = $(this).text();
            });
            for (i = 0; i < q.length; i++) {
                console.log(qn[i] + q[i]);
                if (i==0) {
                    start = 0;
                }
                else {
                    start = 2* i * 4;
                }
                var end = start + 8;
                for (j = start; j < end; j=j+2) {
                    console.log(op[j] + " " + op[j+1]);
                }
                console.log("Anwser Option " + ans[i]);
            }
        }
        // console.log(error);
    })
});

app.listen('8081');
console.log('Active on port 8081');
exports = module.exports = app;