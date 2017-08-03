/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This gulp task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 */
var rimraf = require('rimraf');
module.exports = function (gulp, plugins, growl)
{
    gulp.task('clean:dev', function (cb)
    {
        return gulp.src('.tmp/public', {read: false})
            .pipe(plugins.ignore('.tmp/public/datas/**'))
            .pipe(plugins.rimraf());
        // return rimraf('.tmp/public', cb);
    });
    gulp.task('clean:build', function (cb)
    {
        return rimraf('www', cb);
    });
};
