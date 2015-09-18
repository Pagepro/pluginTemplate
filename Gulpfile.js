var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync');
var reload = browser.reload;
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');

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
    gulp.watch(['*.html', 'src/**/*.js'], reload);
});
gulp.task('copy', function() {
    gulp.src('src/js/**')
      .pipe(gulp.dest('dist'));
});
gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
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