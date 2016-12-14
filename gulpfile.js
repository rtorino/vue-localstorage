const gulp = require('gulp');
const babel = require('gulp-babel');
const buble = require('gulp-buble');
const rollup = require('gulp-rollup');

gulp.task('js', () =>  {
    gulp.src('./src/index.js')
        .pipe(rollup({
            allowRealFiles: true,
            entry: './src/index.js',
            format: 'umd',
            moduleName: 'VueLocalStorage'
        }))
        .pipe(buble())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
    gulp.watch('./src/*.js', ['js']);
});

gulp.task('default', ['watch', 'js']);