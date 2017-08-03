/**
 * user.log
 *
 * @description :: Routing user.log
 * @help        :: See http://sailsjs.com/documentation/concepts/routes
 */

module.exports.routes = {
    /**************************************************************************
     * ADMIN
     */
    'get /admin/user-log':              {
        name:       'admin_user_log_index',
        controller: 'User/Admin/RequestLogController',
        action:     'index',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'get /admin/user-log/detail/:id':   {
        name:       'admin_user_log_detail',
        controller: 'User/Admin/RequestLogController',
        action:     'detail',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'post /admin/user-log/destroy/:id': {
        name:       'admin_user_log_destroy',
        controller: 'User/Admin/RequestLogController',
        action:     'destroy',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    }
};

