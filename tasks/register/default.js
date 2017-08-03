module.exports = function (gulp, plugins)
{
    gulp.task('default', function (cb)
    {
        plugins.sequence(
            'compileAssets',
            'linkAssets',
            ['watch:assets', 'watch:views'],
            'media',
            cb
        );
    });
};
