var FS = require('fs');
var Mkdirp = require('mkdirp');

module.exports.copy = function(grunt) {
    var files = grunt.file.expand(__dirname + '/../src/**/{\.*,*}');
    files.forEach(function(file) {
      var outfile = file.substring(file.indexOf('src/') + 4);
      if (grunt.file.isDir(file)) {
        Mkdirp.sync(outfile);
      } else {
        var contents = FS.readFileSync(file);
        FS.writeFileSync(outfile, contents);
      }
    })
}
