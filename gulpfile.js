/**
 * Test gulp file
 */
'use strict';

// Required dependencies
var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence');

// Clean dist folder
gulp.task('clean', function() {
    return del(['dist/**/*']);
});

// SASS task
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concat files
gulp.task('concat', function() {
    return gulp.src('dist/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/'));
});

// Minify css
gulp.task('cssmin', function() {
    return gulp.src('dist/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

// Run sequence
gulp.task('build', function(cb) {
    runSequence(
        'clean',
        'sass',
        'concat',
        'cssmin',
        cb
    );
});

// Default tasks
gulp.task('default', ['build']);
