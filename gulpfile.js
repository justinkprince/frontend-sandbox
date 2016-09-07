var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var path = require('path');

// "Constant" properties
var PATHS = {
    scss: './src/sass',
    css: './web/css',
    jsSrc: './src/js',
    jsEntry: 'main.js',
    jsDist: './web/js'
};

/**
 * Copy vendors source files to app/vendors
 */
gulp.task('vendor-sass', function () {
    var nodeVendorDirs = [
        './node_modules/normalize-scss/sass/**/*.*',
        './node_modules/susy/sass/**/*.*',
        './node_modules/breakpoint-sass/stylesheets/**/*.*',
    ];

    var appVendorDir = path.join(PATHS.scss, 'vendor');

    return gulp.src(nodeVendorDirs)
        .pipe(gulp.dest(appVendorDir));
});

/**
 * Compile the SCSS files into CSS
 */
gulp.task('sass', function () {
    return gulp.src(path.join(PATHS.scss, '**/*.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(PATHS.css));
});

/**
 * Run Webpack to compile the JavaScript
 */
gulp.task('webpack', function () {
    return gulp.src(path.join(PATHS.jsSrc, PATHS.jsEntry))
        .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest(PATHS.jsDist));
});

/**
 * Watch
 */
gulp.task('watch', function () {
    gulp.watch(path.join(PATHS.scss, '**/*.scss'), ['sass']);
    gulp.watch(path.join(PATHS.jsSrc, '**/*.js'), ['webpack']);
});

/**
 * @TODO: Change this to list commands
 */
gulp.task('default', ['vendor-sass', 'watch']);
