/**
 * User/UserController
 *
 * @description :: Server-side logic for managing User/User
 * @help        :: See http://sailsjs.com/documentation/concepts/controllers
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
                    return res.notFound(); // Delete this line for activate the route
                    // Pagination
                    var pagerPage = req.query.pager_page ? req.query.pager_page : sails.config.pagination.front.page;
                    var pagerLeft = req.query.pager_left ? req.query.pager_left : sails.config.pagination.front.left;
                    var pagerRight = req.query.pager_right ? req.query.pager_right : sails.config.pagination.front.right;
                    var pagerCurrent = req.query.pager_current ? req.query.pager_current : 1;
                    // Render
                    sails.pager.paginate(User, {}, pagerCurrent, pagerPage, [], 'createdAt DESC', function (err, paginate)
                    {
                        if(err)
                        {
                            return next(err);
                        }
                        return res.view('user/front/index', {
                            documents:  paginate.data,
                            pagination: Object.assign(paginate.meta, {
                                left:  pagerLeft,
                                right: pagerRight,
                                route: '/user'
                            })
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
                    return res.notFound(); // Delete this line for activate the route
                    res.view('user/front/create');
                },
    /**
     * create post
     * @param req
     * @param res
     * @param next
     */
    createPost: function (req, res, next)
                {
                    return res.notFound(); // Delete this line for activate the route
                    var params = req.params.all();
                    Test.create(params, function (err, document)
                    {
                        if(err)
                        {
                            return next(err);
                        }
                        res.redirect('/user/detail/' + document.id);
                    });
                },
    /**
     * update form
     * @param req
     * @param res
     */
    update:     function (req, res)
                {
                    return res.notFound(); // Delete this line for activate the route
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
                        res.view('user/front/update', {
                            document: document
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
                    return res.notFound(); // Delete this line for activate the route
                    var params = req.params.all();
                    var id = req.param('id');
                    User.update(id, params, function (err)
                    {
                        if(err)
                        {
                            res.redirect('/user/update/' + id);
                        }
                        res.redirect('/user/detail/' + id);
                    });
                },
    /**
     * detail
     * @param req
     * @param res
     * @param next
     */
    detail:     function (req, res, next)
                {
                    return res.notFound(); // Delete this line for activate the route
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
                        res.view('user/front/detail', {
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
                    return res.notFound(); // Delete this line for activate the route
                    User.findOne({id: req.param('id')}, function (err, document)
                    {
                        if(err)
                        {
                            next(err);
                        }
                        if(!document)
                        {
                            res.notFound();
                        }
                        User.destroy(document.id, function (err)
                        {
                            if(err)
                            {
                                next(err);
                            }
                        });
                        res.redirect('/user');
                    });
                }
};