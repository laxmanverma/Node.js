//normal function expression
function sayHi() {
  console.log("hi");
}

sayHi(); //calling a function

//other
var sayBye = function() {
  return "bye";
}

sayBye(); //calling a function

module.exports = sayBye; //this is called whenever any file requires function.js

//other way of calling sayBye function
function callFunction(funName) {
  funName();
}

callFunction(sayBye);

var count = function(arr) {
  return "this array has " + arr.length + " elements";
}

console.log(count(["crystal", "diamond", "pukhraj"]));
