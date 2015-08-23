'use strict';

var fs = require('fs');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function(options) {
  var dictPath = options.dict;
  var pattern = new RegExp(options.pattern, "g");

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-replace-ids', 'Streams not supported!'));
      return cb();
    }

    fs.readFile(dictPath, function(err, data) {
      if (err) {
        this.emit('error', new gutil.PluginError('gulp-replace-ids', 'gulp-replace-ids failed: ' + err, {
          fileName: file.path
        }));
      } else {
        var dict = JSON.parse(data);
        var contents = file.contents.toString('utf8');

        contents = contents.replace(pattern, function(m, p1) {
          return dict[p1] || p1;
        });

        file.contents = new Buffer(contents);
        this.push(file);
      }

      cb();
    }.bind(this));
  });
};
