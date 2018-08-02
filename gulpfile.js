let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let gulpSequence = require('gulp-sequence');
let watch = require('gulp-watch');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let htmlmin = require('gulp-htmlmin');
let refresh = require('gulp-refresh');


gulp.task('minify-html', function() {
	return gulp.src('./src/*.html')
	  .pipe(htmlmin({collapseWhitespace: true}))
	  .pipe(gulp.dest('./docs/'));
  });

gulp.task('combine-css', function () {
	return gulp.src('./src/css/*')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./docs/css/'));
});

gulp.task('minify-css', () => {
  return gulp.src('./docs/css/styles.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./docs/css/'));
});


// gulp.task('js-combine', function () {
// 	return gulp.src()
// 	  .pipe(concat('all.js'))
// 	  .pipe(gulp.dest('./js/'));
// });

gulp.task('uglify', function () {
	return gulp.src(['gulpfile.js'])
	  .pipe(uglify())
	  .pipe(rename({suffix: '.min'}))
	  .pipe(gulp.dest('./'));
});

gulp.task('styles', function(callback){
	gulpSequence('combine-css', 'minify-css')(callback)
});

gulp.task('scripts', function(callback){
	gulpSequence('uglify')(callback)
});

gulp.task("watch", function () {
	gulp.watch(['styles'], ['scripts']);
});




