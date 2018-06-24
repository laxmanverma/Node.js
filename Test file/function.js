//normal function expression
function sayHi() {
  console.log("hi");
}

sayHi(); //calling a function

//other
var sayBye = function() {
  console.log("bye");
}

sayBye(); //calling a function

//other way of calling sayBye function
function callFunction(funName) {
  funName();
}

callFunction(sayBye);
