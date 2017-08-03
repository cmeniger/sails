/**
 * user.auth
 *
 * @description :: Routing user.auth
 * @help        :: See http://sailsjs.com/documentation/concepts/routes
 */

module.exports.routes = {
    /**************************************************************************
     * FRONT
     */
    'get /login':  {
        name:       'login',
        controller: 'User/AuthController',
        action:     'login'
    },
    'get /logout': {
        name:       'logout',
        controller: 'User/AuthController',
        action:     'logout'
    }
};