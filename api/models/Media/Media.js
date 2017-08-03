/**
 * Media/Media.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {

    autoCreatedAt: true,
    autoCreatedBy: true,
    attributes: {
        name:        'string',
        filename:    'string',
        path:        'string',
        size:        'integer',
        type:        'string',
        is_uploaded: 'boolean',

        getUrl:          function (subDir)
                         {
                             if(this.is_uploaded)
                             {
                                 return sails.config.uploadLink + this.filename;
                             }
                             subDir = subDir? '/'+subDir+'/':'';
                             return sails.config.downloadLink + subDir + this.filename;
                         },
        getDownloadLink: function ()
                         {
                             return sails.config.appUrl + this.getUrl();
                         },

    },

    /**
     * Lifecycle Callbacks
     */

    beforeCreate: function (values, cb) {

        if (! values.name) {
            values.name = values.filename;
        }
        cb();
    }
};