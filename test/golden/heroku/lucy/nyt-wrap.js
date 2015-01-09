var Client = require('./nyt-swag.js');
Client.API('http://api.nytimes.com');

exports.search = function(query, sort, page, callback) {
  var params = {
    'q': query,
    'sort': sort,
    'page': page,
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

