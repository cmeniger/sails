/**
 * user
 *
 * @description :: Routing user
 * @help        :: See http://sailsjs.com/documentation/concepts/routes
 */

module.exports.routes = {
    /**************************************************************************
     * ADMIN
     */
    'get /admin/user':              {
        name:       'admin_user_index',
        controller: 'User/Admin/UserController',
        action:     'index',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'get /admin/user/create':       {
        name:       'admin_user_create',
        controller: 'User/Admin/UserController',
        action:     'create',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'post /admin/user/create':      {
        name:       'admin_user_create_post',
        controller: 'User/Admin/UserController',
        action:     'createPost',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'get /admin/user/update/:id':   {
        name:       'admin_user_update',
        controller: 'User/Admin/UserController',
        action:     'update',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'post /admin/user/update/:id':  {
        name:       'admin_user_update_post',
        controller: 'User/Admin/UserController',
        action:     'updatePost',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'get /admin/user/detail/:id':   {
        name:       'admin_user_detail',
        controller: 'User/Admin/UserController',
        action:     'detail',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'post /admin/user/destroy/:id': {
        name:       'admin_user_destroy',
        controller: 'User/Admin/UserController',
        action:     'destroy',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    /**************************************************************************
     * FRONT
     */
    'get /user':                    {
        name:       'user_index',
        controller: 'User/UserController',
        action:     'index'
    },
    'get /user/create':             {
        name:       'user_create',
        controller: 'User/UserController',
        action:     'create'
    },
    'post /user/create':            {
        name:       'user_create_post',
        controller: 'User/UserController',
        action:     'createPost'
    },
    'get /user/update/:id':         {
        name:       'user_update',
        controller: 'User/UserController',
        action:     'update'
    },
    'post /user/update/:id':        {
        name:       'user_update_post',
        controller: 'User/UserController',
        action:     'updatePost'
    },
    'get /user/detail/:id':         {
        name:       'user_detail',
        controller: 'User/UserController',
        action:     'detail'
    },
    'post /user/destroy/:id':       {
        name:       'user_destroy',
        controller: 'User/UserController',
        action:     'destroy'
    }
};