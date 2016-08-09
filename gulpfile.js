var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    util = require('gulp-util'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),
    clean = require('gulp-clean'),
    gulpNgConfig = require('gulp-ng-config'),
    replace = require('gulp-replace'),
    environmentConfig = require('./environment.js'),
    Server = require('karma').Server;


// load all gulp plugins into the plugins object
var plugins = require('gulp-load-plugins')(),
    currentEnv; // TODO - make build tasks for dynamic instead of separate tasks //

// set paths and glob patterns
var src = {
    vendor: {
        bootstrap: 'src/vendor/bootstrap-sass'
    },
    html: 'src/**/*.html',
    jade: 'src/**/*.jade',
    sass: 'src/**/*.scss',
    libs: 'src/libs/**',
    images: 'src/images/**/*',
    data: 'src/data/**/*',
    scripts: {
        all: 'src/**/*.js',
        app: 'src/app.js',
        test: 'src/scripts/test.js'
    }
};

// build folder
var build = 'build/';

// destination path
var out = {
    libs: build + 'libs/',
    css: 'app.min.css',
    scripts: {
        file: 'app.min.js',
        folder: build + 'scripts/'
    }
};


// compile all javascript files into one output minified JS file.
gulp.task('scripts', ['jshint'],  function() {

    var sources = browserify({
        //entries: src.scripts.test,
        entries: src.scripts.app,
        debug: true // Build source maps
    })
        .transform(babelify.configure({
            presets: ["es2015"]
            // You can configure babel here!
            // https://babeljs.io/docs/usage/options/
        }));

    return sources.bundle()
        .pipe(vinylSourceStream(out.scripts.file))
        .pipe(vinylBuffer())
        .pipe(plugins.sourcemaps.init({
            loadMaps: true // Load the sourcemaps browserify already generated
        }))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./', {
            includeContent: true
        }))
        .pipe(gulp.dest(out.scripts.folder));
});

// serve on default port 3000 //
gulp.task('serve', ['env-config', 'build', 'watch-all'], function() {
    browserSync.init({
        server: {
            baseDir: build
        }
    });

    gulp.watch(src.sass, ['inject-sass']);
});

gulp.task('inject-sass', function() {
    return gulp.src(src.sass)
        .pipe(sass())
        .pipe(gulp.dest(build))
        .pipe(browserSync.stream());
});

// watch files //
gulp.task('watch-all', function() {
    //gulp.watch(src.html, ['reload']);
    gulp.watch(src.jade, ['reload-templates']);
    //gulp.watch(src.sass, ['reload-sass']);
    gulp.watch(src.scripts.all, ['reload-scripts']);
});

// rebuilds scripts and reload //
gulp.task('reload-scripts', function() {
    runSequence('scripts', 'reload');
});

// rebuilds jade to html and reload //
gulp.task('reload-templates', function() {
    runSequence('jade','reload');
});

// rebuilds scss to css and reload //
gulp.task('reload-sass', function() {
    runSequence('sass','reload');
});

// gulp dist
gulp.task('dist', function () {
    runSequence('build','zip');
});

// gulp dist dev
gulp.task('dist-dev', function () {
    currentEnv = 'dev';
    runSequence('env-config','build','zip');
});

// gulp dist qa
gulp.task('dist-qa', function () {
    currentEnv = 'qa';
    runSequence('env-config','build','zip');
});

// gulp dist prod
gulp.task('dist-prod', function () {
    currentEnv = 'prod';
    runSequence('env-config','build','zip');
});


// build task //
gulp.task('build', ['copy-data', 'copy-images', 'scripts', 'sass', 'jade', 'copy-fonts']);

// set default task as serve //
gulp.task('default', ['serve']);

// reload browsers //
gulp.task('reload', browserSync.reload);

// jade to html conversion //
gulp.task('jade', function() {
    return gulp.src(src.jade)
        .pipe(jade({}))
        .pipe(gulp.dest(build));
});

// scss to css, concatenating, minifying //
gulp.task('sass', function () {
  return gulp.src(src.sass)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(build));
});

// watch sass files //
gulp.task('sass:watch', function () {
  gulp.watch(src.sass, ['sass']);
});

// move the bootstrap sass folder //
gulp.task('move', function(){
  return gulp.src('node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**/*')
  .pipe(gulp.dest(src.vendor.bootstrap));
});

// The jshint task runs jshint with ES6 support. //
gulp.task('jshint', function() {
    return gulp.src(src.scripts.all)
        .pipe(plugins.jshint({
            esnext: true // Enable ES6 support
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// copy images to build folder //
gulp.task('copy-images', function () {
    return gulp.src([src.images, 'node_modules/angular-tree-control/images/**/*'])
            .pipe(gulp.dest(build + '/images'))
})

// copy images to build folder //
gulp.task('copy-data', function () {
    return gulp.src([src.data])
            .pipe(gulp.dest(build + '/data'))
})

// copy fonts to build folder //
gulp.task('copy-fonts', function () {
    return gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*')
            .pipe(gulp.dest(build + '/styles/fonts/bootstrap/'))
})

// zip the build folder //
gulp.task('zip', function () {
    return gulp.src('build/**/*')
        .pipe(zip('ClassificationTool.war'))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
        .pipe(clean());
});

// generic task for environment configuration for all environments //
gulp.task('env-config', function() {
  var env = environmentConfig[currentEnv] || environmentConfig['local'],
      api_stem = environmentConfig.api;
  gulp.src(['constants.js'])
    .pipe(replace('environment_goes_here', env.URL))
    .pipe(replace('apistem_goes_here', api_stem.API_STEM))
    .pipe(replace('image_path_goes_here', env.IMG_PATH))
    .pipe(gulp.dest('src/core'));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});
