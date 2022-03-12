const { src, watch, series, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildScss(){
    return src('./src/public/styles/style.scss')
    .pipe(sass())
    .pipe(dest('./src/public/styles'))
}

function watchScss(){
    watch(['./src/public/styles/style.scss'],buildScss);
}

exports.default = series(buildScss,watchScss);
