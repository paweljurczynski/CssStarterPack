var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    mqpacker = require('css-mqpacker'),
    jade = require('jade'),
    gulpJade = require('gulp-jade');

gulp.task('scss', function() {
    return gulp
        .src("src/scss/main.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('src/scss/maps'))
        .pipe(postcss([autoprefixer, mqpacker]))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('templates', function() {
    gulp.src('./src/jade/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest('public'))
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'public'
        }
    });
});

gulp.task('bs-reload', browserSync.reload);

gulp.task('default', ['templates', 'scss', 'browser-sync'], function() {
    gulp.watch("src/scss/**/*.scss", ['scss']).on('change', logger);
    gulp.watch("src/**/*.jade", ['templates', 'bs-reload']).on('change', logger);
});

function logger(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}
