/**
 * Auth controller
 *
 **/

module.exports = {

    /**
     * create form
     * @param req
     * @param res
     */
    login:     function (req, res)
               {
                   res.view('user/auth/login');
               },
    /**
     * process
     * @param req
     * @param res
     */
    loginPost: function (req, res)
               {

               },

    /**
    * `UserController.logout()`
    */
    logout: function (req, res) {
        req.logout();
        return res.ok('Logged out successfully.');
    }
};