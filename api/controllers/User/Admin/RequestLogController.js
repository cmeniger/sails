/**
 * SecurityLogController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://links.sailsjs.org/docs/controllers
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
                    // Pagination
                    var pagerPage = req.query.pager_page ? req.query.pager_page : sails.config.pagination.admin.page;
                    var pagerLeft = req.query.pager_left ? req.query.pager_left : sails.config.pagination.admin.left;
                    var pagerRight = req.query.pager_right ? req.query.pager_right : sails.config.pagination.admin.right;
                    var pagerCurrent = req.query.pager_current ? req.query.pager_current : 1;
                    // Render
                    sails.pager.paginate(RequestLog, {}, pagerCurrent, pagerPage, ['user'], 'createdAt DESC', function (err, paginate)
                    {
                        if(err)
                        {
                            return next(err);
                        }
                        return res.view('user/admin/log/index', {
                            documents:  paginate.data,
                            pagination: Object.assign(paginate.meta, {left: pagerLeft, right: pagerRight, route: '/admin/user-log'})
                        });
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
                    RequestLog.findOne(req.param('id'), function (err, document)
                    {
                        if(err)
                        {
                            return next(err);
                        }
                        if(!document)
                        {
                            res.notFound();
                        }
                        res.view('user/admin/log/detail', {
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
                    RequestLog.findOne({id: req.param('id')}, function (err, document)
                    {
                        if(err)
                        {
                            next(err);
                        }
                        if(!document)
                        {
                            res.notFound();
                        }
                        RequestLog.destroy(document.id, function (err)
                        {
                            if(err)
                            {
                                next(err);
                            }
                        });
                        res.redirect('/admin/user-log', 302);
                    });
                }
};
