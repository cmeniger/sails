module.exports.routes = {
    'get /':                      {
        name:       'home',
        controller: 'FrontController',
        action:     'index'
    },
    'get /integration':           {
        name:       'integration_index',
        controller: 'FrontController',
        action:     'integration'
    },
    'get /integration/:template': {
        name:       'integration_template',
        controller: 'FrontController',
        action:     'integrationTemplate'
    }
};