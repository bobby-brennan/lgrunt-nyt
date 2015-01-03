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
    res.redirect('/setSecrets');
  } else {
    next();
  }
});

App.get('/setSecrets', function(req, res) {
  res.render('views/secrets.ejs', {
    secrets: ["apiKey"]
  });
});

App.post('/setSecrets', function(req, res) {
  NYTimes.Secrets = {};
  NYTimes.Secrets.apiKey = req.body.apiKey
  res.redirect('/');
});

App.get('/', function(req, res) {
  res.redirect('home.html');
});


App.get('/sortByOldest', function(req, res) {
  NYTimes.sortByOldest(req.query.q, req.query.apiKey, function(err, result) {
    if (err) {
      console.log('err:' + JSON.stringify(err));
      throw err;
    }
    res.render('views/article-list.ejs', result);
    res.end();
  });
})

App.use(Express.static(__dirname + '/static'));

App.listen(App.get('port'), function() {
  console.log("Node App is running at localhost:" + App.get('port'));
});
