module.exports = function (gulp, plugins)
{
    gulp.task('compileAssets', function (cb)
    {
        plugins.sequence(
            'clean:dev',
            'jst:dev',
            'fonts',
            'sass',
            'js',
            'images',
            'copy:dev',
            cb
        );
    });
    gulp.task('compileAssets:prod', function (cb)
    {
        plugins.sequence(
            'clean:dev',
            'clean:build',
            'jst:dev',
            'fonts:prod',
            'sass:prod',
            'js:prod',
            'images:prod',
            'copy:build',
            cb
        );
    });
};
