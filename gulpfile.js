var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer')


gulp.task('sass', function () {
  return gulp.src('sass/**/*.+(scss|sass)')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp.src('img/**')
    .pipe(gulp.dest('build/img'));
});
gulp.task('fonts', function () {
  return gulp.src('fonts/**')
    .pipe(gulp.dest('build/fonts'));
});
gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function () {
  return del(['build']);
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  });

  gulp.watch('sass/**/*.+(scss|sass)', gulp.task('sass'));
  gulp.watch('*.html', gulp.task('html'));
});



gulp.task('build', gulp.series('clean', gulp.parallel('html', 'images', 'fonts', 'sass')));

gulp.task('start', gulp.series('build', 'serve'));
