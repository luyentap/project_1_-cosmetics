const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('views', function buildHTML() {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({
            // Your options in here.
        }))
        .pipe(gulp.dest("src/html/"))
        .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass','views'], function() {
    browserSync.init({
        server: "./src/html/"
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/pug/*.pug'], ['views']);
    gulp.watch("src/html/*.html").on('change', browserSync.reload);
});




// Default Task
gulp.task('default', ['serve']);

