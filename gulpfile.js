'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

// Compile sass into css & auto-inject into browser
gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
})

// Bundle js and copy to dist folder
gulp.task('js', function () {
    return browserify({
        entries: './src/js/index.js',
        debug: true,
        transform: [
            ['babelify', {
                'presets': ['es2015']
            }]
        ]
    })
        .bundle()
        .on('error', function (err) {
            gutil.log('Browserify Error', gutil.colors.red(err.message))
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
})

// Copy vendor files
gulp.task('vendor', function () {
    gulp.src([
        './node_modules/leaflet/dist/**/*'
    ])
        .pipe(gulp.dest('./dist/vendor/leaflet'))

    gulp.src([
        './node_modules/jquery/dist/**/*'
    ])
        .pipe(gulp.dest('./dist/vendor/jquery'))
});

// Static Server + watching js/scss/html files
gulp.task('browser-sync', ['sass', 'js', 'vendor'], function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
