/**
 *
 * @param gulp
 * @param plugins
 * @param growl
 */

var fs = require('fs');
var path = require('path');
module.exports = function (gulp, plugins, growl)
{
    gulp.task('media', function ()
    {
        var postsSource = path.join(process.cwd(), '.media');
        var postsDest = path.join(process.cwd(), '.tmp/public/media');
        fs.mkdir(postsSource, function (err)
        {
            fs.symlink(postsSource, postsDest, function (err)
            {
                if(err)
                {
                    console.log(err);
                }
            });
        });
    });
};