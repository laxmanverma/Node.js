var sub = function(a, b) {
  return a - b;
}

var adder = function(a, b) {
  return a + b;
}

var pi = 3.14;

module.exports = {
  sub : sub,
  adder : adder,
  pi : pi
}

//other ways to export
// module.exports.adder = adder;
// module.exports.pi = pi;
