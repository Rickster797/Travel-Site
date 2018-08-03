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
let less = require('gulp-less');
let livereload = require('gulp-livereload');



gulp.task('sass', function () {
    var stream = gulp.src('./src/css/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
        .pipe(rename('styles.css'));
    return stream;
});

gulp.task('combine-css', function () {
	return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', './src/css/*.css'])
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./docs/css/'));
});

gulp.task('minify-css', () => {
  return gulp.src('./docs/css/styles.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./docs/css/'));
});

gulp.task('minify-html', function() {
	return gulp.src('./src/*.html')
	  .pipe(htmlmin({collapseWhitespace: true}))
	  .pipe(htmlmin({removeComments: true}))
	  .pipe(gulp.dest('./docs/'));
  });

// gulp.task('js-combine', function () {
// 	return gulp.src()
// 	  .pipe(concat('all.js'))
// 	  .pipe(gulp.dest('./js/'));
// });

// gulp.task('uglify', function () {
// 	return gulp.src(['gulpfile.js'])
// 	  .pipe(uglify())
// 	  .pipe(rename({suffix: '.min'}))
// 	  .pipe(gulp.dest('./'));
// });

gulp.task('styles', function(callback){
	gulpSequence('combine-css', 'minify-css', 'sass', 'minify-html')(callback)
});

// gulp.task('scripts', function(callback){
// 	gulpSequence('uglify')(callback)
// });

gulp.task('watch', function () {
	gulp.watch(['src/css/*.css', 'src/*.html'], ['styles']);
});

let cssDir = "src/css/*.css";
let htmlDir = "src/*.html"
 
gulp.task('default', [], function() {
	livereload.listen();
	gulp.watch(cssDir, function() {
		gulp.src(cssDir).pipe(livereload());
	});
	gulp.watch(htmlDir, function() {
		gulp.src(htmlDir).pipe(livereload());
	});

});



