var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var stripdebug = require('gulp-strip-debug');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
	'last 3 versions',
	'ie >= 8',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

gulp.task('clean', function() {
	return gulp.src([
		'./public/build/css/**/*.css',
		'./public/build/js/**/*.js'],
		{read: false})
		.pipe(clean());
});

gulp.task('img', function() {
	return gulp.src('./public/images/*.{gif,jpg,png}')
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
		}))
		.pipe(gulp.dest('./public/build/images/'))
});

gulp.task('images', ['img']);

gulp.task('css', function() {
	return gulp.src('./public/less/main.less')
		.pipe(less({}))
		.pipe(gulp.dest('./public/build/css/'))
		.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('./public/build/css/'))
		.pipe(browserSync.stream({match: './public/less/**/*.less', once: true}))
});

gulp.task('jslint', function() {
	return gulp.src('./public/javascripts/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'))
});

gulp.task('scripts', function() {
	return gulp.src('./public/javascripts/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./public/build/js/'))
		.pipe(rename('all.min.js'))
		.pipe(stripdebug())
		.pipe(uglify())
		.pipe(gulp.dest('./public/build/js/'))
		.pipe(browserSync.stream({match: './public/javascripts/**/*.js', once: true}))
});

//- TODO: Append file hash in jade files
//var timestamp = new Date().getTime();

gulp.task('watch', function () {
	// proxy local server
	browserSync.init({
		proxy: 'localhost:3001',
		port: 3001,
		ui: {
			port: 3000
		}
	});

	gulp.start(['img', 'css', 'scripts']);

	gulp.watch('./views/**/*.jade').on('change', reload);
	gulp.watch('./public/less/**/*', ['css']);
	gulp.watch('./public/javascripts/**/*', ['jslint', 'scripts']);
});

gulp.task('build', ['clean', 'img', 'css', 'jslint', 'scripts']);

gulp.task('default', ['clean'], function() {
	gulp.start('css', 'jslint', 'scripts');
});

