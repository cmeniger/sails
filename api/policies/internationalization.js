/**
 * change default language from url
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next)
{
    req.setLocale(req.param('lang') || sails.config.i18n.defaultLocale);
    next();
};