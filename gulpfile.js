var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
var gulpIf = require("gulp-if");
var imagemin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();


var config = {
    paths:{
        scss:'./src/scss/**/*.scss',
        html:'./index.html'
    },
    output:{
        cssName:'bundle.min.css',
        path:'./build/'
    },
    isDeveloper:true
};

gulp.task("serve", function () {
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
    gulp.watch(config.paths.scss,["scss"]);
    gulp.watch(config.paths.html).on("change",browserSync.reload);
});


gulp.task("scss",function () {
    return gulp.src(config.paths.scss)
        .pipe(gulpIf(config.isDeveloper, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(gulpIf(config.isDeveloper,sourcemaps.write()))
        /*.pipe(gulpIf(config.isDeveloper,cleanCss()))*/
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream())

});

gulp.task('scripts', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'src/js/*.js'
        // 'node_modules/swiper/dist/js/swiper.js',
        // 'node_modules/popper.js/dist/umd/popper.js',
        //'node_modules/bootstrap/dist/js/bootstrap.min.js',
        //'node_modules/materialize-css/dist/js/materialize.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('libs-css', function() {
    return gulp.src([
        //'node_modules/swiper/dist/css/swiper.css',
        //'node_modules/bootstrap/dist/css/bootstrap.css',
        //'public/css/materialize.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
    ])
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('build/css'));
});



gulp.task('img', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/cut-img'));
});


gulp.task("default",["scss", "serve", "scripts"]);