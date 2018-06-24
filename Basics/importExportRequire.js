var importedFun = require('./function'); // this calls the module.exports line of function.js
console.log(importedFun());

var stuff = require('./stuff');
console.log(stuff.sub(stuff.pi, 1));
console.log(stuff.adder(10, 20));
