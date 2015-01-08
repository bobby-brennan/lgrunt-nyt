/*
 * rest-api-client
 * http://www.bbrennan.info
 *
 * Copyright (c) 2014 Bobby Brennan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
     nyt_wrapper: grunt.file.readJSON('test/config/heroku.json'),
     jsonlint: {
       sample: {
         src: [ 'swagger/swagger.json' ]
       }
     }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['nyt_wrapper']);

};
