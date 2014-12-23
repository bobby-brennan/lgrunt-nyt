/*
 * rest-api-client
 * http://www.bbrennan.info
 *
 * Copyright (c) 2014 Bobby Brennan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.registerTask('nyt_wrapper', 'A grunt plugin for generating wrappers the NYTimes API', function () {
    var config = grunt.config.get('nyt_wrapper');
    console.log('conf:' + JSON.stringify(config));
    console.log('swag file:' + __dirname + '/../swagger/swagger.json');
    config.swagger = grunt.file.readJSON(__dirname + '/../swagger/swagger.json');
    console.log('swag:' + JSON.stringify(config.swagger));
    console.log('in dir:' + __dirname);
    grunt.file.expand(__dirname + '/../node_modules/lucy-rest-api-client/tasks').forEach(function(inpt) {console.log('tsk:' + inpt); grunt.loadTasks(inpt)});
    grunt.config('rest_api_client', config);
    grunt.task.run('rest_api_client');
  });
}
