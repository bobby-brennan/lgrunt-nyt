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
  res.redirect('/sortByOldest');
});


App.get('/sortByOldest', function(req, res) {
  NYTimes.sortByOldest(function(err, result) {
    if (err) {
      console.log('err:' + JSON.stringify(err));
      throw err;
    }
    res.render('views/article-list.ejs', result);
  });
})

App.use(Express.static(__dirname + '/static'));

App.listen(App.get('port'), function() {
  console.log("Node App is running at localhost:" + App.get('port'));
});
