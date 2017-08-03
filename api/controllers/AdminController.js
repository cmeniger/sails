/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    index:      function (req, res, next)
                {
                    res.view('_templates/admin');
                },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    moderator:  function (req, res, next)
                {
                    res.view('_templates/moderator');
                },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    menu:       function (req, res, next)
                {
                    var fs = require('fs');
                    var so = require('sort-object');
                    var current = require('../../config/helpers/path').pathName(req.headers.referer.substr(req.headers.referer.indexOf('/', 7)));
                    var documents = {};
                    fs.readdir('config/menus/', function (err, filenames)
                    {
                        if(err)
                        {
                            console.log(err);
                            return false;
                        }
                        // Merge
                        filenames.forEach(function (filename)
                        {
                            var file = require('../../config/menus/' + filename);
                            for(var i in file)
                            {
                                documents[i] = file[i];
                            }
                        });
                        // Sons
                        for(var i in documents)
                        {
                            if(documents[i].parent !== "" && typeof documents[documents[i].parent] !== 'undefined')
                            {
                                documents[documents[i].parent].sons[i] = documents[i];
                                delete documents[i];
                            }
                        }
                        // Order
                        documents = so(documents, {
                            sort: function (a, b)
                                  {
                                      if(documents[a].order === documents[b].order)
                                      {
                                          return documents[a].name.toLowerCase() < documents[b].name.toLowerCase() ? -1 : 1;
                                      }
                                      else
                                      {
                                          return documents[a].order < documents[b].order ? -1 : 1;
                                      }
                                  }
                        });
                        // Order sons
                        for(var i in documents)
                        {
                            documents[i].sons = so(documents[i].sons, {
                                sort: function (a, b)
                                      {
                                          if(documents[i].sons[a].order === documents[i].sons[b].order)
                                          {
                                              return documents[i].sons[a].name.toLowerCase() < documents[i].sons[b].name.toLowerCase() ? -1 : 1;
                                          }
                                          else
                                          {
                                              return documents[i].sons[a].order < documents[i].sons[b].order ? -1 : 1;
                                          }
                                      }
                            });
                        }
                        // Current
                        for(var i in documents)
                        {
                            // Parent
                            documents[i].current = false;
                            // Links
                            for(var j in documents[i].links)
                            {
                                if(documents[i].links[j].url === current)
                                {
                                    documents[i].links[j].current = true;
                                    documents[i].current = true;
                                }
                                else
                                {
                                    documents[i].links[j].current = false;
                                }
                            }
                            // Sons
                            for(var j in documents[i].sons)
                            {
                                for(var k in documents[i].sons[j].links)
                                {
                                    if(documents[i].sons[j].links[k].url === current)
                                    {
                                        documents[i].sons[j].links[k].current = true;
                                        documents[i].current = true;
                                    }
                                    else
                                    {
                                        documents[i].sons[j].links[k].current = false;
                                    }
                                }
                            }
                        }
                        res.view('_partials/admin.menu.ejs', {
                            documents: documents,
                            current:   current
                        });
                    });
                },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    modelCount: function (req, res, next)
                {
                    global[req.param('model')].count(req.param('data')).exec(function (err, found)
                    {
                        if(err)
                        {
                            console.log(err);
                            res.send('-');
                        }
                        else
                        {
                            res.send(found.toString());
                        }
                    });
                }
};