/*
 * rest-api-client
 * http://www.bbrennan.info
 *
 * Copyright (c) 2014 Bobby Brennan
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {
  var Mkdirp = require('mkdirp');
  var FS = require('fs');

  grunt.registerTask('nyt_wrapper', 'A grunt plugin for generating wrappers the NYTimes API', function () {
    var config = grunt.config.get('nyt_wrapper');
    if (config.destDir) {
      Mkdirp.sync(config.destDir);
      process.chdir(config.destDir);
      config.destDir = null;
    }
    config.swagger = grunt.file.readJSON(__dirname + '/../swagger/swagger.json');

    config.secrets = ["apiKey"];

    config.ui = {
       components: {
        'articleSearch': { type: 'angular', file: 'article-list.html' },
       },
       pageHeader: 'header.html',
       pageFooter: 'footer.html'
    }

    require('./copy-src-files.js').copy(grunt);

    grunt.file.expand(__dirname + '/../node_modules/lucy-rest-api-client/tasks').forEach(function(inpt) {console.log('tsk:' + inpt); grunt.loadTasks(inpt)});
    grunt.config('rest_api_client', {default_config: config});
    grunt.task.run('rest_api_client');
  });
}
