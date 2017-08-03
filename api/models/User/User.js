/**
 * Setting/Setting.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var baseModel = require('sails-permissions/api/models/User');
module.exports = _.merge({}, baseModel, {
    autoCreatedAt: true,
    autoCreatedBy: true,
    attributes: {
        username: {
            type: 'string',
            unique: true,
            index: true,
            notNull: true
        },
        email: {
            type: 'email',
            unique: true,
            index: true
        },
        first_name: {
            type: 'string'
        },
        last_name:  {
            type: 'string'
        },
        address:    {
            type: 'string'
        },
        zip_code:   {
            type: 'string'
        },
        city:       {
            type: 'string'
        },
        country:    {
            type: 'string'
        },
        phone:      {
            type: 'string'
        }
    },
    // validationMessages: { //hand for i18n & l10n
    //     email: {
    //         required: 'Email address is required',
    //         email: 'Provide valid email address',
    //         unique: 'Email address is already taken'
    //     },
    //     username: {
    //         required: 'Username is required',
    //         unique: 'Email address is already taken'
    //     }
    // },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.passports;
        return obj;
    }

    // beforeValidate: function ConfirmationPassword (values, next) {
    //
    //     if(!values.password || values.password != values.confirmation) {
    //         return next({
    //             err : ["password dont match."]
    //         });
    //     }
    //     next();
    // }
});
