var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
	return gulp.src('./public/javascripts/*.js')
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('./public/build/'));
});

gulp.task('default', ['uglify'], function() {
});
