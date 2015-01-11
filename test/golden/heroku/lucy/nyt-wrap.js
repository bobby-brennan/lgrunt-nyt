var Client = require('././nyt-swag.js');
Client.API('http://api.nytimes.com');

var Secrets = null;
exports.initialize = function(secrets, callback) {
  if (Client.initialize) {
    Client.initialize(secrets, callback);
  } else {
    Secrets = secrets;
    callback();
  }
}
exports.initialized = function() {
  return Client.initialize ? Client.initialized() : Secrets !== null;
}

exports.search = function(query, sort, page, callback) {
  var params = {
    'q': 'obama',
    'q': query,
    'sort': sort,
    'page': page,
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.articleSearch(params)
  .then(function(result) {callback(null, JSON.parse(result.response.body))},
        function(err) {callback(err)});
}

