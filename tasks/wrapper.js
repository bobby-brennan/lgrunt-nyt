/*
 * rest-api-client
 * http://www.bbrennan.info
 *
 * Copyright (c) 2014 Bobby Brennan
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {
  var FS = require('fs');
  grunt.registerTask('nyt_wrapper', 'A grunt plugin for generating wrappers the NYTimes API', function () {
    var config = grunt.config.get('nyt_wrapper');
    config.swagger = grunt.file.readJSON(__dirname + '/../swagger/swagger.json');

    config.secrets = ["apiKey"];

    config.uiComponents = {
      'articleSearch': { type: 'ejs', file: 'views/article-list.ejs' },
      'secretsPage': 'views/secrets.ejs'
    }

    config.dependencies = {
      bower: {
        "bootstrap": "~3.3.1",
        "angular": "~1.3.7"
      }
    };

    try {
      FS.mkdirSync('views');
    } catch (e) {}
    FS.createReadStream(__dirname + '/../partials/article-list.ejs').pipe(FS.createWriteStream('views/article-list.ejs'))
    FS.createReadStream(__dirname + '/../partials/secrets.ejs').pipe(FS.createWriteStream('views/secrets.ejs'))
    grunt.file.expand(__dirname + '/../node_modules/lucy-rest-api-client/tasks').forEach(function(inpt) {console.log('tsk:' + inpt); grunt.loadTasks(inpt)});
    grunt.config('rest_api_client', {default_config: config});
    grunt.task.run('rest_api_client');
  });
}
