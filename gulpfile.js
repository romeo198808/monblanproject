"use strict"

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var autoprefixer = require("autoprefixer");
var svgo = require("gulp-svgo");
var cwebp = require("gulp-cwebp");
var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var del = require('del');
var gulpCopy = require('gulp-copy');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngquant = require('imagemin-pngquant');
var server = require("browser-sync").create();

gulp.task("style", async function() {
 return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});


gulp.task("serve", async function() {
  server.init({
    server: "",
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("less/**/*.less", gulp.series("style")).on("change", server.reload);
  gulp.watch("*.html").on("change", server.reload);
});
gulp.task("go", gulp.series("style", "serve"));
