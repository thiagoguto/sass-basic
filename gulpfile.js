var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

// caminhos
var paths = {
    sass: "./sass/",
    css: "../assets/css/",
    assets: "./assets/",
    compAssets: "../assets/"
}

// Assets
gulp.task('assets', function(){
    return gulp.src(paths.assets + '**/*.*')
        .pipe(gulp.dest(paths.compAssets));
    })

// sass
gulp.task('sass', function () {
return gulp.src(paths.sass + '*.sass')
    .pipe(gulpSass({
        includePaths: [paths.sass],
        outputStyle: 'uncompressed',
        pretty: true
    }))
    .on('error', gulpSass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// browsersync
gulp.task('server', ['sass'], function () {
browserSync.init({
    proxy: "opencharity.dd:8083",
    notify: false
    });
});

gulp.task('build', ['sass']);

gulp.task('rebuild', function () {
    browserSync.reload();
});

gulp.task('watch', function () {
    gulp.watch(paths.sass + '**/*.sass', ['sass', 'rebuild']);
});

gulp.task('default',['assets', 'server', 'watch'] )