var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browser = require('browser-sync');
var reload = browser.reload;
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var run = require('gulp-run');

gulp.task('serve', ['sass'], function() {
    browser({
        port: process.env.PORT || 4500,
        open: false,
        ghostMode: false,
        server: {
            baseDir: '.'
        }
    });
});
gulp.task('watch', function() {
    gulp.watch("src/sass/**", ['sass']);
    gulp.watch("src/js/**", ['copy']);
});
gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('autoprefixer', function () {
    return gulp.src('static/css/*.css')
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('static/css/'));
});
gulp.task('lint', function () {
    return gulp.src(['dist/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
gulp.task('default', ['sass', 'watch', 'serve']);
gulp.task('compile', ['sass']);