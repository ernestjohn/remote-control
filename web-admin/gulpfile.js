import gulp from 'gulp';
import concat from  'gulp-concat';
import size from 'gulp-size';
import clean from 'gulp-clean';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';

/*
const
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    terser = require('gulp-terser')
;*/

gulp.task('clean', function(){
    return gulp.src('dist/', {read: false})
        .pipe(clean())
});

gulp.task('styles', function(){
    return gulp.src([
        'css/main.css',
        'css/loader.css',
    ])
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS({
            keepBreaks: true
        }))
        .pipe(size({
            title: 'Size of CSS'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('deps-styles', function(){
    return gulp.src([
        'css/lib/bootstrap-4.3.1.min.css',
        'css/lib/font-awesome-4.6.2.min.css',
        'css/lib/toastr.min.css'
    ])
        .pipe(concat('deps.min.css'))
        .pipe(cleanCSS({
            keepBreaks: true
        }))
        .pipe(size({
            title: 'Size of deps CSS'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
    return gulp.src([
        'js/janus.js',
        'js/utils.js',
        'js/debug-utils.js',
        'js/cheat-codes.js',
        'js/keyboard.js',
        'js/clipboard.js',
        'js/session-monitoring.js',
        'js/ui.js',
        'js/remote-chat.js',
        'js/commands.js',
        'js/remote-video.js',
        'js/video-stats.js',
        'js/gesture-builder.js',
        'js/remote-admin.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(terser())
        .pipe(size({
            title: 'Size of JS'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('deps-scripts', function() {
    return gulp.src([
        'js/lib/jquery-3.3.1.min.js',
        'js/lib/bootstrap-4.3.1.min.js',
        'js/lib/adapter-6.4.0.min.js',
        'js/lib/popper-2.5.3.min.js',
        'js/lib/bootbox-5.4.0.min.js',
        'js/lib/toastr.min.js'
    ])
        .pipe(concat('deps.min.js'))
        .pipe(terser())
        .pipe(size({
            title: 'Size of JS libs'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('styles', 'deps-styles', 'scripts', 'deps-scripts')));
