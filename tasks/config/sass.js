/**
 *
 * @param gulp
 * @param plugins
 * @param growl
 */
module.exports = function (gulp, plugins, growl)
{
    gulp.task('sass:front', function ()
    {
        return gulp.src(['assets/styles/front/index.scss', 'assets/styles/front/vendor/**/*.css', 'assets/styles/front/vendor/**/*.scss'])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                outputStyle: 'compressed'
            }))
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.rename('front.css'))
            .pipe(gulp.dest('.tmp/public/styles'))
            .pipe(plugins.livereload())
            .pipe(plugins.if(growl, plugins.notify({message: 'sass front dev task complete'})));
    });
    gulp.task('sass:front:prod', function ()
    {
        return gulp.src(['assets/styles/front/index.scss', 'assets/styles/front/vendor/**/*.css', 'assets/styles/front/vendor/**/*.scss'])
            .pipe(plugins.rename({
                basename: 'front',
                suffix:   '.min'
            }))
            .pipe(
                plugins.sass({
                    outputStyle: 'compressed',
                    ext:         '.css'
                })
            )
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest('.tmp/public/concat/'));
    });
    gulp.task('sass:admin', function ()
    {
        return gulp.src(['assets/styles/admin/index.scss', 'assets/styles/admin/vendor/**/*.css', 'assets/styles/admin/vendor/**/*.scss'])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                outputStyle: 'compressed'
            }))
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.rename('admin.css'))
            .pipe(gulp.dest('.tmp/public/styles'))
            .pipe(plugins.livereload())
            .pipe(plugins.if(growl, plugins.notify({message: 'sass admin dev task complete'})));
    });
    gulp.task('sass:admin:prod', function ()
    {
        return gulp.src(['assets/styles/admin/index.scss', 'assets/styles/admin/vendor/**/*.css', 'assets/styles/admin/vendor/**/*.scss'])
            .pipe(plugins.rename({
                basename: 'admin',
                suffix:   '.min'
            }))
            .pipe(
                plugins.sass({
                    outputStyle: 'compressed',
                    ext:         '.css'
                })
            )
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest('.tmp/public/concat/'));
    });
    gulp.task('sass', ['sass:front', 'sass:admin']);
    gulp.task('sass:prod', ['sass:front:prod', 'sass:admin:prod']);
};