/**
 * EdaSlider Gulp JS Build Task
 *
 * 콘솔 창에서 gulp default 명령어 실행
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var yuidoc = require('gulp-yuidoc');
var jslint = require('gulp-jslint');

var sliderPGFilePath = './src/js/slider.pg.js';
var sliderPGCssFilePath = './src/css/slider.pg.css';

var sliderPGVersion = '0.0.1';
var distJsPath = './dist/js';
var distCssPath = './dist/css';
var docPath = './doc';

var sliderPGFileName = 'slider.pg-' + sliderPGVersion + '.js';
var sliderPGMinFileName = 'slider.pg-' + sliderPGVersion + '.min.js';

// TODO Css 용은 따로 작업해야함
var sliderPGCssFileName = 'slider.pg.css';
var sliderPGMinCssFileName = 'slider.pg.min.css';


gulp.task('jslint', [], function() {

	return gulp.src([sliderPGFilePath])
	.pipe(jslint({
		node: true,
		evil: true,
		nomen: true,
		global: [],
		predef: [],
		reporter: 'default',
		errorsOnly: false
	}))
	.on('error', function(error) {

		console.error(String(error));
	});
});

// Doc 파일을 만드는 작업
gulp.task('yuidoc-js', [], function() {

	return gulp.src(sliderPGFilePath)
	.pipe(yuidoc())
	.pipe(gulp.dest(docPath));
});

// 개발용 코드를 빌드하는 작업
gulp.task('build-dev-js', [], function() {

	//return gulp.src('./src/js/**/*.js')
	return gulp.src(sliderPGFilePath)
	.pipe(concat(sliderPGFileName))
	.pipe(gulp.dest(distJsPath));
});

// uglify 로 코드 주석 제거 및 압축 및 코드를 하나로 합치는 작업
gulp.task('build-combine-compress-js', [], function() {

	//return gulp.src('./src/js/**/*.js')
	return gulp.src(sliderPGFilePath)
	.pipe(uglify())
	.pipe(concat(sliderPGMinFileName))
	.pipe(gulp.dest(distJsPath));
});

gulp.task('default', ['jslint', 'yuidoc-js', 'build-dev-js', 'build-combine-compress-js']);