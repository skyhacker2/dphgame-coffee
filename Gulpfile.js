var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del')
var copy = require('gulp-copy')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

var paths = {
	scripts: ['coffee/src/**/*.coffee'],
    framework: ['coffee/framework/**/*.coffee'],
    test: ['coffee/test/**/*.coffee']
}

gulp.task('clean', function(cb) {
	del(['src'], cb);
});

gulp.task('scripts', ['clean'], function() {
    gulp.src(paths.framework)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(concat('mvc.js'))
        .pipe(gulp.dest('./src/framework/'))
	gulp.src(paths.scripts)
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest('./src/'))
    gulp.src(paths.test)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./src/test'))
});

gulp.task('copy',['clean'], function() {
	return gulp.src("libs/**/*.js")
		.pipe(gulp.dest("./src/libs/"))
});

gulp.task('default', ['scripts', 'copy']);