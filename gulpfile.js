"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const { watch } = require("gulp");
const { series } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const livereload = require("gulp-livereload");

function css(callback) {
  const autoprefixerSettings = {
    cascade: false,
  };
  return gulp
    .src("./src/sass/styles.scss")
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(autoprefixer(autoprefixerSettings))
    .pipe(gulp.dest("html/design/css"));
}

function minifyJs(callback) {
  return gulp
    .src([
      "./src/js/core/*.js",
      "./src/js/scripts/*.js"
    ])
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(gulp.dest("html/design/scripts"));
}

/**
 * Handle watch event.
 * @param {function} callback
 */
function watcher(callback) {
  const files = [
    "./src/sass/styles.scss",
    "./src/sass/**/*.scss",
    "./src/js/core/*.js",
    "./src/js/scripts/*.js",
    "./src/js/vendors/*.js",
  ];

  livereload.listen();

  return watch(files, series(css, minifyJs));
}

exports.css = css
exports.minifyJs = minifyJs
exports.watcher = watcher

