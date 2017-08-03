/**
 *
 * @param gulp
 * @param plugins
 * @param growl
 */
module.exports = function (gulp, plugins, growl)
{
    gulp.task('js', function ()
    {
        // Dependencies
        gulp.src('assets/js/dependencies/**/*.js')
            .pipe(plugins.uglify())
            .pipe(gulp.dest('.tmp/public/js/dependencies'));
        // Libs
        gulp.src('assets/js/libs/**/*.js')
            .pipe(plugins.uglify())
            .pipe(gulp.dest('.tmp/public/js/libs'));
        // Scripts
        return gulp.src('assets/js/*.js')
            .pipe(plugins.concat('script.js', {newLine: ';'}))
            .pipe(plugins.uglify())
            .pipe(gulp.dest('.tmp/public/js'))
            .pipe(plugins.if(growl, plugins.notify({message: 'JS task complete'})));
    });
    gulp.task('js:prod', function ()
    {
        return gulp.src(require('../pipeline').jsFilesToInject)
            .pipe(plugins.concat('main.js', {newLine: ';'}))
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(plugins.uglify())
            .pipe(gulp.dest('.tmp/public/concat/'));
    });
};