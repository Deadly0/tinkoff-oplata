let gulp = require('gulp');
let path = require('path');
let fs = require('fs');
let typescript = require('gulp-typescript');
let merge = require('merge-stream');
let sourcemaps = require('gulp-sourcemaps');
let count = require('gulp-count');
let clean = require('gulp-clean');

let package = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json')));
let SRC_FOLDER = path.resolve(__dirname, 'src');
let DIST_FOLDER = path.resolve(__dirname, 'dist');

let tsProject = typescript.createProject(path.resolve(__dirname, 'tsconfig.json'));

gulp.task(package.name + ':build-ts', function () {
    let tsResult = tsProject.src()
        .pipe(count("'" + package.name + ':build-ts\': ## files'))
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(DIST_FOLDER)),
        tsResult.js
            .pipe(sourcemaps.write({sourceRoot: path.resolve(__dirname, SRC_FOLDER)}))
            .pipe(gulp.dest(DIST_FOLDER))
    ]);
});

gulp.task(package.name + ':build-copy', function () {
    return gulp.src(['package.json', 'readme.md', 'license.md']).pipe(gulp.dest(DIST_FOLDER));
});

gulp.task(package.name + ':dist-clean', function () {
    return gulp.src(DIST_FOLDER, {read: false, allowEmpty: true}).pipe(clean());
});

gulp.task('clean', gulp.series(package.name + ':dist-clean'));
gulp.task('build', gulp.series(package.name + ':build-ts', package.name + ':build-copy'));
gulp.task('default', gulp.series('build'));
