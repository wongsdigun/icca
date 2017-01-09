const gulp  = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	// pug = require('gulp-pug2'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('icca', function() {
	return gutil.log('Gulp is running in WWF ICCA!');
});

gulp.task('style', function() {
	const onError = function(err) {
		notify.onError({
		title:    "Gulp Sass",
		subtitle: "Yo! What've you done now?!",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
		})(err);
		this.emit('end');
	};

	return sass ('resources/frontend/scss/styles.scss')
	.pipe(plumber({errorHandler: onError}))
	.pipe(autoprefixer())
	// .pipe(cssnano()) // Passes it through a gulp-autoprefixer task //DIPAKE KALO UDAH MAU PRODUKSI ==========================================================
	.pipe(reload({ stream:true }))
	.pipe(gulp.dest('resources/frontend/css'))
});

// gulp.task('pugCompile', function() {
// 		return gulp.src('resources/template/pug/*.pug')
// 				.pipe(pug.compile())
// 				.pipe(gulp.dest('resources/template'))
// 				.pipe(reload({ stream:true }))
// })
gulp.task('html', function(){
	gulp.src('views/*.html')
	.pipe(reload({stream:true}))
})
gulp.task('serve', function() {
	browserSync.init({
		proxy : 'http://localhost/icca',
	});
	gulp.watch('resources/frontend/scss/styles.scss', ['style']);
	gulp.watch('views/*.html', ['html']);
	// gulp.watch('resources/frontend/template/pug/*.pug', ['pugCompile']);
	gulp.watch(['resources/frontend/css/*.css', 'resources/frontend/js/*.js'], {cwd: 'assets'}, reload);
});

gulp.task('default', ['serve'], function() {
	gulp.start('icca', 'style');
});