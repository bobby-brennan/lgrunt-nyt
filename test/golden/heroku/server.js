var Express = require('express');
var App = Express();
var BodyParser = require('body-parser');

App.set('views', __dirname);
App.set('view engine', 'ejs');

var NYTimes = require('./lucy/nyt-wrap.js');

App.set('port', (process.env.PORT || 3000));
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
  extended: true
}));

App.get('/', function(req, res, next) {
  if (!NYTimes.Secrets) {
    res.redirect('secrets.html');
  } else {
    next();
  }
});

App.post('/setSecrets', function(req, res) {
  if (!NYTimes.Secrets) {
    NYTimes.Secrets = {};
    NYTimes.Secrets.apiKey = req.body.apiKey
  }
  res.redirect('/');
});

App.get('/', function(req, res) {
  res.redirect('/search.html');
});


App.post('/search', function(req, res) {
  console.log('request' + JSON.stringify(req.body));
  NYTimes.search(req.body.q, req.body.sort, req.body.page, function(err, result) {
    if (err) {
      console.log('Error:' + JSON.stringify(err));
      res.statusCode(401);
      return res.end();
    }
    console.log('got data, returning');
    res.send(JSON.stringify(result));
  });
})

App.use(Express.static(__dirname + '/static'));

App.listen(App.get('port'), function() {
  console.log("Node App is running at localhost:" + App.get('port'));
});
