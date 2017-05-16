
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', ['change-project', 'transpiler-project']);

gulp.task('transpiler-project', () => {
   gulp.src(['src/**/*.js'])
       .pipe(babel({
           presets: ['es2015'],
           plugins: ['transform-runtime','transform-async-to-generator']
       }))
       .pipe(gulp.dest('./dist'));
});

gulp.task('change-project', () => {
   gulp.watch(['src/**/*.js'], ['transpiler-project']);

});
