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
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    useref       = require('gulp-useref'),
    gulpIf       = require('gulp-if'),
    cssnano      = require('gulp-cssnano'),
    del          = require('del'),
    jsBuildInfo  = {
                      'util': {
                        src: './assets/js/util/index.js',
                        dest: './assets/js/',
                        rename: 'util.js'
                      },
                      'components': {
                        src: './assets/js/components/index.js',
                        dest: './assets/js/',
                        rename: 'components.js'
                      },
                      'vendor': {
                        src: './assets/js/vendor/index.js',
                        dest: './assets/js/',
                        rename: 'vendor.js'
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
  watch(['./assets/js/**/**/*.js', '!./assets/js/components.js', '!./assets/js/util.js', '!./assets/js/vendor.js'], executeTaskAndReload.bind(null, ['js_util','js_vendor','js_components']));
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
          .src('./assets/scss/style.scss')
                .pipe(plumber())
                .pipe(sass.sync({
                  outputStyle: 'compressed',
                  precision: 10
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                      browsers: ['last 2 versions', 'last 4 iOS versions', 'ie >= 10'],
                      cascade: false
                    })
                  )
                .pipe(gulp.dest('./assets/css/'));
};

var getJSBuild = function(name){
  return function(){
    return gulp
          .src( jsBuildInfo[name].src )
          .pipe( include() )
              .on( 'error', console.log )
          .pipe(uglify())
          .pipe( rename( jsBuildInfo[name].rename ) )
          .pipe( gulp.dest( jsBuildInfo[name].dest ) );
  };
};

var js_util_build       = getJSBuild('util'),
    js_components_build = getJSBuild('components'),
    js_vendor_build     = getJSBuild('vendor');


var watch_task = function(){
  watch('./assets/scss/**/*.scss', sass_task);
  watch('./assets/js/util/**/*.js', js_util_build);
  watch('./assets/js/vendor/**/*.js', js_vendor_build);
  watch('./assets/js/components/**/*.js', js_components_build);
};

var lint = function() {
  var notIncludeTheseFiles = [
                              '!./assets/js/**/**/index.js',
                              '!./assets/js/vendor/**/**',
                              '!./assets/js/components.js',
                              '!./assets/js/util.js',
                              '!./assets/js/vendor.js',
                              '!./assets/js/util/is_mobile.js',
                              ];
  var filesToLint = ['./assets/js/**/*.js'];
  
  return gulp
            .src(filesToLint.concat(notIncludeTheseFiles))
            .pipe(eslint())
            .pipe(eslint.format());
            // Break on failure to be super strict
            // .pipe(eslint.failOnError());
};

var generateJSForProd = function(){
  return gulp
          .src( ['./assets/js/components.js', './assets/js/util.js', './assets/js/vendor.js'] )
          .pipe( include() )
              .on( 'error', console.log )
          .pipe(concat('main.js'))
          .pipe(rename({suffix: '.min'}))
          .pipe(uglify())
          .pipe( gulp.dest('dist/assets/js') );
};

var generateSCSSForProd = function() {
  return gulp
          .src('./assets/scss/style.scss')
                .pipe(plumber())
                .pipe(sass.sync({
                  outputStyle: 'compressed',
                  precision: 10
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                      browsers: ['last 2 versions', 'last 4 iOS versions', 'ie >= 10'],
                      cascade: false
                    })
                  )
                .pipe(gulp.dest('dist/assets/css'));
};

var gulpUseRef = function(){
  return gulp.src('assets/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist/assets'));
};

var clean = function() {
    return del(['dist/assets/css', 'dist/assets/js']);
};

gulp.task('watch', watch_task );
gulp.task('sass', sass_task );
gulp.task('js_util', js_util_build );
gulp.task('js_vendor', js_vendor_build );
gulp.task('js_components', js_components_build );
gulp.task('lint', lint );
gulp.task('server', server);
gulp.task('reloadBrowsers', reloadBrowsers);
gulp.task('html', html_build);

gulp.task('generateJSForProd', generateJSForProd);
gulp.task('generateSCSSForProd', generateSCSSForProd);

gulp.task('gulpUseRef', gulpUseRef);
gulp.task('clean', clean);

gulp.task('build', ['js_util', 'js_vendor', 'js_components', 'sass', 'html'] );
gulp.task('default', ['build','server']);
gulp.task('dist', ['clean','gulpUseRef','generateSCSSForProd']);