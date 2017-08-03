/**
 * User/Admin/UserController
 *
 * @description :: Server-side logic for managing User/admin/users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    /**
     * index
     * @param req
     * @param res
     * @param next
     */
    index:      function (req, res, next)
                {
                    User.find(function (err, documents)
                    {
                        if(err)
                        {
                            return next(err);
                        }
                        return res.view('user/admin/index', {
                            documents: documents
                        });
                    });
                },
    /**
     * create form
     * @param req
     * @param res
     */
    create:     function (req, res)
                {
                    Role.find().exec(function (err, roles)
                    {
                        res.view('user/admin/create', {documents: roles});
                    });
                },
    /**
     * create post
     * @param req
     * @param res
     * @param next
     */
    createPost: function (req, res, next)
                {
                    if(_.isEmpty(req.param('username')))
                    {
                        FlashService.error(req, 'Username is required');
                        res.redirect('/admin/user/create', 302);
                    }
                    else
                    {
                        if(!sails.config.validateEmail(req.param('email')))
                        {
                            FlashService.error(req, 'valid email is required');
                            res.redirect('/admin/user/create', 302);
                        }
                        else
                        {
                            if(!sails.config.validatePassword(req.param('password'), req.param('confirmation')))
                            {
                                FlashService.error(req, 'password is required and must be contains more than 8 characters');
                                res.redirect('/admin/user/create', 302);
                            }
                            else
                            {
                                sails.services.passport.protocols.local.createUser(req.params.all(), function (error, document)
                                {
                                    if(error)
                                    {
                                        FlashService.error(req, JSON.stringify(error));
                                        res.redirect('/admin/user/create', 302);
                                    }
                                    res.redirect('/admin/user/detail/' + document.id);
                                });
                            }
                        }
                    }
                },
    /**
     * update form
     * @param req
     * @param res
     */
    update:     function (req, res)
                {
                    User.findOne(req.param('id'), function (err, document)
                    {
                        if(err)
                        {
                            return next(err);
                        }
                        if(!document)
                        {
                            res.notFound();
                        }
                        Role.find({active: true}).exec(function (err, roles)
                        {
                            res.view('user/admin/update', {roles: roles, document: document});
                        });
                    });
                },
    /**
     * update post
     * @param req
     * @param res
     * @param next
     */
    updatePost: function (req, res, next)
                {
                    if(_.isEmpty(req.param('username')))
                    {
                        FlashService.error(req, 'Username is required');
                        res.redirect('/admin/user/create', 302);
                    }
                    else
                    {
                        if(!sails.config.validateEmail(req.param('email')))
                        {
                            FlashService.error(req, 'valid email is required');
                            res.redirect('/admin/user/create', 302);
                        }
                        else
                        {
                            User.update(req.param('id'), req.body, function (error)
                            {
                                if(error)
                                {
                                    FlashService.error(req, JSON.stringify(error));
                                    res.redirect('/admin/user/update', 302);
                                }
                                res.redirect('/admin/user/detail/' + req.param('id'));
                            });
                        }
                    }
                },
    /**
     * detail
     * @param req
     * @param res
     * @param next
     */
    detail:     function (req, res, next)
                {
                    User.findOne(req.param('id'))
                        .populate('roles', {select: ['name']})
                        .exec(function (err, document)
                        {
                            if(err)
                            {
                                return next(err);
                            }
                            if(!document)
                            {
                                res.notFound();
                            }
                            res.view('user/admin/detail', {
                                document: document
                            });
                        });
                },
    /**
     * Delete from database
     * @param req
     * @param res
     * @param next
     */
    destroy:    function (req, res, next)
                {
                    User.findOne({id: req.param('id')}, function (err, document)
                    {
                        if(err)
                        {
                            FlashService.error(req, JSON.stringify(err));
                            res.redirect('/admin/user', 302);
                        }
                        if(!document)
                        {
                            res.notFound();
                        }
                        User.destroy(document.id, function (err)
                        {
                            if(err)
                            {
                                FlashService.error(req, JSON.stringify(err));
                                res.redirect('/admin/user', 302);
                            }
                        });
                        res.redirect('/admin/user');
                    });
                },
    me:         function (req, res)
                {
                    // return res.json(req.user);
                    res.view('user/admin/profile', {
                        document: req.user
                    });
                }
};

