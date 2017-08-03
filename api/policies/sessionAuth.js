/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 * @docs        :: http://sailsjs.org/#!documentation/policies
 */
module.exports = function (req, res, next)
{
    if(req.session.authenticated)
    {
        User.find({id: req.session.passport.user}).exec(function (err, users)
        {
            req.session.me = users.pop().toJSON();
        });

        return next();
    }
    res.redirect(302, '/login');
};
