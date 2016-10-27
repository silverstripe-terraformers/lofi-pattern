"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var jshint = require("gulp-jshint"); //Lint JS files
var sass = require('gulp-sass'); // Good ol gulp sass
var rename = require('gulp-rename'); // Gulp rename for minified css files 
var cleanCss = require('gulp-clean-css'); // Css minifiyer

// A comment break line 
var config = {
	port: 3000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/html/*.html',
		js: './src/js/*.js',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    	],
    	sass: 'src/sass/*.scss',
		dist: './dist',
		mainJs: './src/js/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/colours.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('sass', function(){
	gulp.src('./src/sass/custom.scss')
    	.pipe(sass().on('error', sass.logError))
		.pipe(concat('custom.css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cleanCss())
    	.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('jsLint', function () {
    gulp.src(config.paths.js) // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.sass, ['sass']);
	gulp.watch(config.paths.js, ['js', 'jsLint']);
});

gulp.task('default', ['html', 'js', 'css', 'sass', 'jsLint', 'open', 'watch']);