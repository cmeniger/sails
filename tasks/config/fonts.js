/**
 *
 * @param gulp
 * @param plugins
 * @param growl
 */
module.exports = function (gulp, plugins, growl)
{
    gulp.task('fonts', function ()
    {
        return gulp.src('assets/fonts/**/*')
            .pipe(gulp.dest('.tmp/public/fonts'))
            .pipe(plugins.if(growl, plugins.notify({message: 'Fonts task complete'})));
    });
    gulp.task('fonts:prod', function ()
    {
        return gulp.src('assets/fonts/**/*')
            .pipe(gulp.dest('.tmp/public/fonts'));
    });
};
