var Client = require('./nyt-swag.js');
Client.API('http://api.nytimes.com');

exports.sortByOldest = function(query, callback) {
  var params = {
    'sort': 'oldest',
    'q': query,
  };
  if (exports.Secrets) {
    for (var secret in exports.Secrets) {
      params[secret] = exports.Secrets[secret];
    }
  }
  return Client.articleSearch(params)
  .then(function(result) {callback(null, JSON.parse(result.response.body))},
        function(err) {callback(err)});
}

