//  Install Gulp globbaly
//gulp: npm i -g gulp@3.9.0
//  Installing all depencencies
//      npm i gulp --save-dev

//  Just for general information (not required to run enything from list)
// minify HTML:  npm i gulp-html-minify --save-dev
// minify CSS:   npm i --save-dev gulp-cssmin
// minify JS:    npm i --save-dev gulp-minify
// sass:         npm i gulp-sass --save-dev
// image minify: npm i --save-dev gulp-image
// browser sync: npm i browser-sync --save-dev

var gulp = require('gulp'),
  htmlminify = require("gulp-html-minify"),
  cssmin = require('gulp-cssmin'),
  minify = require('gulp-minify'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  image = require('gulp-image');

gulp.task('min', function() {
// Copy Comfortaa and webfonts after minify to dist folder
  gulp.src('./src/css/Comfortaa/*')
    .pipe(gulp.dest('./dist/css/Comfortaa/'));
  gulp.src('./src/css/webfonts/*')
    .pipe(gulp.dest('./dist/css/webfonts/'));
    gulp.src('./src/json/*')
      .pipe(gulp.dest('./dist/json/'));
// Finish Copy Comfortaa and webfonts after minify to dist folder

  gulp.src('./src/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'));
  gulp.src('./src/js/*.js')
    .pipe(minify({
      ext: {
        //src: '-debug.js',
        min: '.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./dist/js/'));
  gulp.src('./src/img/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./dist/img/'));
  return gulp.src("./src/*.html")
    .pipe(htmlminify())
    .pipe(gulp.dest("./dist/"))

});
//gulp sass
gulp.task('sass', function() {
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './src'
    },
    notify: false
  });
});
//gulp watch
gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('src/css/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/css/*.css', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
});
