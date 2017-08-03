module.exports.routes = {
    /**************************************************************************
     * ADMIN
     */
    'get /media/upload':             {
        controller: 'Media/MediaController',
        action:     'index',
        locals:     {
            layout: 'layouts/layout.admin'
        }
    },
    'post /media/upload':             {
        controller: 'Media/MediaController',
        action:     'upload',
        locals:     {
            layout: 'layouts/layout.admin'
        }
    }
};