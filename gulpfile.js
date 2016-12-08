var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    jade         = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    watch        = require('gulp-watch'),
    include      = require('gulp-include'),
    rename       = require('gulp-rename'),
    eslint       = require('gulp-eslint'),
    browserSync  = require('browser-sync').create(),
    debug        = require('gulp-debug'),
    runSequence  = require('run-sequence'),
    jsBuildInfo  = {
                      'util': {
                        src: './js/util/index.js',
                        dest: './js/',
                        rename: 'util.js'
                      },
                      'components': {
                        src: './js/components/index.js',
                        dest: './js/',
                        rename: 'components.js'
                      },
                      'vendor': {
                        src: './js/vendor/index.js',
                        dest: './js/',
                        rename: 'vendor.js'
                      },
                      'services': {
                        src: './js/services/index.js',
                        dest: './js/',
                        rename: 'services.js'
                      }
                    };

//reload the browserSync instance
var reloadBrowsers = function(){
  return browserSync.reload();
};

var executeTask = function(args) {
  return runSequence.apply({}, args);
}

//executes the tasks on the args array and calls to reloadBrowsers task at the end
var executeTaskAndReload = function(args){
  args.push('reloadBrowsers');
  return executeTask(args);
}

// Static server
var server = function() {
  browserSync.init({
    server: './assets'
  });

  //watch for changes on jade, scss js and images
  watch('./assets/**/**/*.jade', executeTaskAndReload.bind(null, ['html']));
  watch('./assets/scss/**/**/*.scss', executeTaskAndReload.bind(null, ['sass']));
  watch(['./assets/js/**/**/*.js', '!./assets/js/components.js', '!./assets/js/util.js', '!./assets/js/vendor.js'], executeTaskAndReload.bind(null, ['util','vendor','components']));
};

var html_build = function () {

  var pretty = true;
  var jadeVars = {};

  return gulp
          .src( './assets/*.jade' )
          .pipe( debug({title: 'jade'}))
          .pipe( jade( {"pretty":pretty, "locals": jadeVars } ) )
          .pipe( gulp.dest( "./assets" ) );
};

var sass_task = function() {
  return gulp
          .src('./scss/style.scss')
                .pipe(plumber())
                .pipe(sass.sync({
                  outputStyle: 'expanded',
                  precision: 10
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                      browsers: ['last 2 versions', 'last 4 iOS versions', 'ie >= 10'],
                      cascade: false
                    })
                  )
                .pipe(gulp.dest('./css/'));
};

var getJSBuild = function(name){
  return function(){
    return gulp
          .src( jsBuildInfo[name].src )
          .pipe( include() )
              .on( 'error', console.log )
          .pipe( rename( jsBuildInfo[name].rename ) )
          .pipe( gulp.dest( jsBuildInfo[name].dest ) );
  };
};

var js_util_build       = getJSBuild('util'),
    js_components_build = getJSBuild('components'),
    js_vendor_build     = getJSBuild('vendor'),
    js_services_build   = getJSBuild('services');


var watch_task = function(){
  watch('./scss/**/*.scss', sass_task);
  watch('./js/util/**/*.js', js_util_build);
  watch('./js/vendor/**/*.js', js_vendor_build);
  watch('./js/components/**/*.js', js_components_build);
  watch('./js/services/**/*.js', js_services_build)
};

var lint = function() {
  var notIncludeTheseFiles = [
                              '!./js/**/**/index.js',
                              '!./js/vendor/**/**',
                              '!./js/components.js',
                              '!./js/util.js',
                              '!./js/vendor.js',
                              '!./js/services.js',
                              '!./js/util/is_mobile.js',
                              ];
  var filesToLint = ['./js/**/*.js'];
  
  return gulp
            .src(filesToLint.concat(notIncludeTheseFiles))
            .pipe(eslint())
            .pipe(eslint.format());
            // Break on failure to be super strict
            // .pipe(eslint.failOnError());
};

gulp.task('watch', watch_task );
gulp.task('sass', sass_task );
gulp.task('js_util', js_util_build );
gulp.task('js_vendor', js_vendor_build );
gulp.task('js_components', js_components_build );
gulp.task('js_services', js_services_build );
gulp.task('lint', lint );
gulp.task('server', server);
gulp.task('reloadBrowsers', reloadBrowsers);
gulp.task('html', html_build);

gulp.task('build', ['js_util', 'js_vendor', 'js_components', 'js_services', 'sass', 'html'] );
gulp.task('default', ['build','server']);