/**
 * pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 */

// Module (npm, bower, ...) to copy to the .tmp
// folder in order to use them as dependencies
module.exports.modulesToCopy = [
    {
        src:  'bower_components/jquery/dist/jquery.min.js',
        dest: 'js/head'
    },
    {
        src:  'bower_components/jquery-ui/jquery-ui.min.js',
        dest: 'js/head'
    },
    {
        src:  'bower_components/jquery.cookie/jquery.cookie.js',
        dest: 'js/head'
    },
    {
        src:  'bower_components/foundation-sites/dist/js/foundation.js',
        dest: 'js/vendor'
    },
    {
        src:  'bower_components/foundation-datepicker/js/foundation-datepicker.min.js',
        dest: 'js/vendor'
    },
    {
        src:  'bower_components/slick-carousel/slick/slick.js',
        dest: 'js/vendor'
    },
    {
        src:  'bower_components/restfulizer/jquery.restfulizer.js',
        dest: 'js/vendor'
    },
    {
        src:  'bower_components/moment/min/moment-with-locales.min.js',
        dest: 'js/vendor'
    },
    {
        src:  'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
        dest: 'js/vendor'
    },
    {
        src:  'bower_components/fontawesome/fonts/**',
        dest: 'fonts'
    },
    {
        src:  'bower_components/tinymce/tinymce.js',
        dest: 'libraries/tinymce'
    },
    {
        src:  'bower_components/tinymce/themes/**',
        dest: 'libraries/tinymce/themes'
    },
    {
        src:  'bower_components/tinymce/skins/**',
        dest: 'libraries/tinymce/skins'
    },
    {
        src:  'bower_components/tinymce/plugins/**',
        dest: 'libraries/tinymce/plugins'
    }
];
// CSS files to inject in order
var cssFilesToInject = [
    'styles/index.css'
];
// CSS files to inject in order
var cssFrontFilesToInject = [
    'styles/front.css'
];
// CSS files to inject in order
var cssAdminFilesToInject = [
    'styles/admin.css'
];
// Client-side javascript files to inject in order
// (uses Gulp-style wildcard/glob/splat expressions)
var jsFilesToInject = [
    'js/dependencies/sails.io.js',
    'js/dependencies/**/*.js',
    'js/libs/**/*.js',
    'js/vendor/**/*.js',
    'js/script.js',
    'libraries/tinymce/tinymce.js'
];
var jsHeadFilesToInject = [
    'js/head/jquery.min.js',
    'js/head/jquery-ui.min.js',
    'js/head/**/*.js'
];
// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
    'templates/**/*.html',
    'templates/**/*.handlebars'
];
// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Gulp tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function (path)
{
    return '.tmp/public/' + path;
});
module.exports.cssFrontFilesToInject = cssFrontFilesToInject.map(function (path)
{
    return '.tmp/public/' + path;
});
module.exports.cssAdminFilesToInject = cssAdminFilesToInject.map(function (path)
{
    return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function (path)
{
    return '.tmp/public/' + path;
});
module.exports.jsHeadFilesToInject = jsHeadFilesToInject.map(function (path)
{
    return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function (path)
{
    return 'assets/' + path;
});
