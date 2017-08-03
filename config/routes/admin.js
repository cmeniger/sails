module.exports.routes = {
    'get /admin':                    {
        name:       'admin',
        controller: 'AdminController',
        action:     'index',
        locals:     {
            layout: '_layouts/layout.admin'
        }
    },
    'get /admin-menu':               {
        name:       'admin_menu',
        controller: 'AdminController',
        action:     'menu',
        locals:     {
            layout: null
        }
    },
    'post /admin/model/count/:model': {
        name:       'admin_model_count',
        controller: 'AdminController',
        action:     'modelCount'
    },
    'get /moderator':                {
        name:       'moderator',
        controller: 'AdminController',
        action:     'moderator',
        locals:     {
            layout: '_layouts/layout.front'
        }
    }
};