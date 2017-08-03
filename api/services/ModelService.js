var pluralize = require('pluralize');
module.exports = {
    /**
     * Return the type of model acted upon by this request.
     */
    getTargetModelName: function (req)
                        {
                            // TODO there has to be a more sails-y way to do this without including
                            // external modules
                            if(_.isString(req.options.alias))
                            {
                                // sails.log.silly('singularizing', req.options.alias, 'to use as target model');
                                return pluralize.singular(req.options.alias);
                            }
                            else
                            {
                                if(_.isString(req.options.model))
                                {
                                    return req.options.model;
                                }
                                else
                                {
                                    return req.model && req.model.identity;
                                }
                            }
                        },
    deepPopulate:       function (model, criteria, multiple, populate, cb)
                        {
                            if(multiple === true)
                            {
                                global[model].find(criteria).exec(function (err, documents)
                                {
                                    if(err)
                                    {
                                        cb(err, documents);
                                    }
                                    else
                                    {
                                        module.exports.deepPopulateObject(documents, populate, function (err, documents)
                                        {
                                            cb(err, documents);
                                        });
                                    }
                                });
                            }
                            else
                            {
                                global[model].findOne(criteria).exec(function (err, document)
                                {
                                    if(err)
                                    {
                                        cb(err, document);
                                    }
                                    else
                                    {
                                        module.exports.deepPopulateObject([document], populate, function (err, documents)
                                        {
                                            cb(err, documents[0]);
                                        });
                                    }
                                });
                            }
                        },
    deepPopulateObject: function (documents, populate, cb)
                        {
                            var getField = function (key, field, document)
                            {
                                field = field.split('.');
                                field[2] = '';
                                // Replace ID by Object
                                if(typeof field[1] === 'undefined' && typeof document[key] === 'string')
                                {
                                    field[2] = document[key];
                                }
                                // Criteria key/value
                                if(typeof field[1] === 'string')
                                {
                                    field[2] = {};
                                    field[2][field[1]] = document.id;
                                }
                                return field;
                            };
                            // Check if need populate
                            if(typeof populate === 'object' && Object.keys(populate).length > 0)
                            {
                                async.each(documents, function iterator(document, cbDocument)
                                {
                                    async.forEachOf(populate, function (value, key, cbPopulate)
                                    {
                                        var field, criteria, multiple, sons;
                                        // Populate iteration is an object
                                        if(typeof value === 'object' && typeof value.model === 'string')
                                        {
                                            field = getField(key, value.model, document);
                                            criteria = typeof value.criteria === 'object' ? value.criteria : field[2];
                                            multiple = typeof value.multiple === 'boolean' ? value.multiple : false;
                                            sons = typeof value.populate === 'object' ? value.populate : {};
                                        }
                                        // Populate iteration is a string
                                        if(typeof value === 'string')
                                        {
                                            field = getField(key, value, document);
                                            criteria = field[2];
                                            multiple = false;
                                            sons = {};
                                        }
                                        // Get data
                                        if(typeof field !== 'undefined')
                                        {
                                            module.exports.deepPopulate(field[0], criteria, multiple, sons, function (err, data)
                                            {
                                                document[key] = data;
                                                cbPopulate();
                                            });
                                        }
                                        // Error
                                        else
                                        {
                                            cbPopulate('ERROR : populate variable <' + key + '>.');
                                        }
                                    }, function (err)
                                    {
                                        cbDocument();
                                    });
                                }, function (err)
                                {
                                    cb(err, documents);
                                });
                            }
                            else
                            {
                                cb(false, documents);
                            }
                        }
};
