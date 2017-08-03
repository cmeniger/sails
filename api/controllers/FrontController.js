/**
 * FrontController
 *
 * @description :: Server-side logic for managing fronts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * list all objects
     * `Setting/FrontController.index()`
     */
    index:               function (req, res, next)
                         {
                             req.setLocale(req.param('lang') || sails.config.i18n.defaultLocale);
                             if (_.isString(req.param('back'))) {
                                 res.redirect(req.param('back'), 302);
                             }
                             res.view('_templates/front',  {locales: sails.config.i18n.locales});
                         },
    /**
     * Default integration
     * @param req
     * @param res
     * @param next
     */
    integration:         function (req, res, next)
                         {
                             var documents = [];
                             require('fs').readdir('views/_integration/', function (err, filenames)
                             {
                                 if(err)
                                 {
                                     return next(err);
                                 }
                                 filenames.forEach(function (filename)
                                 {
                                     if(filename != 'index.ejs')
                                     {
                                         documents.push(filename.substr(0, filename.length - 4));
                                     }
                                 });
                                 res.view('_integration/index', {documents: documents});
                             });
                         },
    /**
     * Template
     * @param req
     * @param res
     * @param next
     */
    integrationTemplate: function (req, res, next)
                         {
                             res.view('_integration/' + req.param('template'));
                         },
};