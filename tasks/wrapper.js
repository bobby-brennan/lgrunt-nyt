/*
 * rest-api-client
 * http://www.bbrennan.info
 *
 * Copyright (c) 2014 Bobby Brennan
 * Licensed under the MIT license.
 */

'use strict';

function camelCase(input) {
  var ret = input.replace(/([A-Z]{2})/g, function(m, g) {return g.toLowerCase()})
         .replace(/^([\w])/, function(m, g) {return g.toLowerCase()})
         .replace(/[^\w\s-]/g, '')
         .replace(/[-\s]+(.)/g, function(match, group1) {return group1.toUpperCase()});
  return ret;
}

module.exports = function (grunt) {
  grunt.registerTask('nyt_wrapper', 'A grunt plugin for generating wrappers the NYTimes API', function () {
    var config = grunt.config.get('nyt_wrapper');
    config.swagger = grunt.file.readJSON(__dirname + '/../swagger/swagger.json');

    for (var i = 0; i < config.functions.length; ++i) {
      config.functions[i].functionName = camelCase(config.functions[i].alias);
    }

    config.uiComponents = {
      'articleSearch': { type: 'ejs', file: 'views/article-list.ejs' }
    }

    try {
      FS.mkdirSync('views');
    } catch (e) {}
    FS.createReadStream(__dirname + '/partials/article-list.ejs').pipe(FS.createWriteStream('views/article-list.ejs'))

    grunt.file.expand(__dirname + '/../node_modules/lucy-rest-api-client/tasks').forEach(function(inpt) {console.log('tsk:' + inpt); grunt.loadTasks(inpt)});
    grunt.config('rest_api_client', {default_config: config});
    grunt.task.run('rest_api_client');
  });
}
