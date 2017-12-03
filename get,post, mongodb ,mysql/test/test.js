
module.exports = function(app){
  app.get('/', function(req, res) {
  	 res.json({test:'Hello World!'});
  });
  app.get('/jk', function(req, res) {
  	 res.json({test:'Hello World!'});
  });
}
