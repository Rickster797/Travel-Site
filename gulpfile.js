let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let gulpSequence = require('gulp-sequence');
let watch = require('gulp-watch');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let htmlmin = require('gulp-htmlmin');

gulp.task('minify-html', function() {
	return gulp.src('*.html')
	  .pipe(htmlmin({collapseWhitespace: true}))
	  .pipe(rename({suffix: '.min'}))
	  .pipe(gulp.dest('./'));
  });

gulp.task('combine-css', function () {
	return gulp.src('./css/*')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./css/'));
});

gulp.task('minify-css', () => {
  return gulp.src('css/styles.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./css/'));
});

gulp.task('styles', function(callback){
	gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['styles']);
});

gulp.task('js-combine', function () {
	return gulp.src(['./js/jquery-3.2.1.slim.js','./js/popper.js', './js/bootstrap.js'])
	  .pipe(concat('all.js'))
	  .pipe(gulp.dest('./js/'));
});

gulp.task('uglify', function () {
	return gulp.src('./js/all.js')
	  .pipe(uglify())
	  .pipe(rename({suffix: '.min'}))
	  .pipe(gulp.dest('./js/'));
});

gulp.task('scripts', function(callback){
	gulpSequence('js-combine', 'uglify')(callback)
});

gulp.task("watch.js", function () {
	gulp.watch(input_js_files, ['scripts']);
});
