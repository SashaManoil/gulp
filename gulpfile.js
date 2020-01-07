'use strict';

var gulp = require('gulp'),
    pug =  require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

gulp.task('pug', function(){
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build')); 
});

gulp.task('sass', function(){
    return gulp.src('src/static/styles/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({outputStyles: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/styles'));
});

gulp.task('watch', function () {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'))
    gulp.watch('src/static/styles/**/*.sass', gulp.series('sass'))
});

gulp.task('default',
    gulp.series(
        gulp.parallel('pug','sass'),
        'watch'
));