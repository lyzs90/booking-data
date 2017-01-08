'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const gutil = require('gulp-util');

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
        entries: './src/index.js',
        debug: true,
        transform: [
            ['babelify', {
                'presets': ['es2015', 'react']
            }]
        ]
    })
        .bundle()
        .on('error', function (err) {
            gutil.log('Browserify Error', gutil.colors.red(err.message))
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/'))
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
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('default', ['browser-sync']);
