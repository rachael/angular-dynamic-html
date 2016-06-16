var del = require('del');
var es = require('event-stream');
var fs = require('fs');

var gulp = require('gulp');
var babel = require("gulp-babel");
var connect = require('gulp-connect');
var header = require('gulp-header');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var open = require('gulp-open');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var karma = require('karma').Server;

var config = {
  pkg : JSON.parse(fs.readFileSync('./package.json')),
  banner:
      '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n\n\n'
};

gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(['./demo/*.html', '.src/*.html'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./demo/**/*.html'], ['html']);
  gulp.watch(['./**/*.less'], ['styles']);
  gulp.watch(['./src/**/*.js','./demo/**/*.js', './**/*.html'], ['scripts']);
});

gulp.task('clean', function(cb) {
  del(['dist/**/*'], cb);
});

gulp.task('scripts', ['clean'], function() {
  gulp.src('src/directive.js')
    .pipe(plumber({errorHandler: handleError}))
    .pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(babel({presets:['es2015']}))
    .pipe(uglify({
      preserveComments: 'some',
      mangle: false
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('open', function(){
  gulp.src('./demo/demo.html')
  .pipe(open('', {url: 'http://localhost:8080/demo/demo.html'}));
});

gulp.task('jshint-test', function() {
  gulp.src('./test/**/*.js')
    .pipe(plumber({errorHandler: handleError}))
    .pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
      done(); // anonymous function fixes formatError
  });
});

gulp.task('karma-serve', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, function() {
      done(); // anonymous function fixes formatError
  });
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('build', ['scripts']);
gulp.task('serve', ['build', 'connect', 'watch', 'open']);
gulp.task('default', ['build', 'test']);
gulp.task('test', ['build', 'jshint-test', 'karma']);
gulp.task('serve-test', ['build', 'watch', 'jshint-test', 'karma-serve']);
