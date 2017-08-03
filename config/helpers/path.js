/**
 *
 * @type {{path: module.exports.path, pathList: module.exports.pathList}}
 */

module.exports = {
    path:     function (var_name, var_parameters)
              {
                  var route = '';
                  var error = '';
                  // Parse all routes
                  _.each(sails.config.routes, function (params, key)
                  {
                      if(route === '' && key.substr(key.indexOf('/')) === var_name)
                      {
                          route = key.substr(key.indexOf('/'));
                      }
                      if(route === '' && params && params.name === var_name)
                      {
                          var routeParams = key.match(/:([^\/]*)/gi);
                          var routeValid = true;
                          // Check parameter's
                          if(routeParams)
                          {
                              _.each(routeParams, function (data)
                              {
                                  data = data.substr(1);
                                  if(typeof var_parameters === 'undefined' || typeof var_parameters[data] === 'undefined')
                                  {
                                      routeValid = false;
                                      error = error ? error + ', ' + data : 'Route ' + var_name + ' need parameter(s) : ' + data;
                                  }
                                  else
                                  {
                                      key = key.replace(':' + data, var_parameters[data]);
                                  }
                              });
                          }
                          // Route valid
                          if(routeValid)
                          {
                              route = key.substr(key.indexOf('/'));
                          }
                      }
                  });
                  // Error message
                  if(route === '')
                  {
                      sails.log.error(new Error(error ? error : 'Route ' + var_name + ' not found.'));
                      return;
                  }
                  // Return route
                  return route;
              },
    pathList: function (var_search)
              {
                  var list = [];
                  var search = typeof var_search === 'undefined' ? '' : var_search;
                  var is_html = typeof arguments[1] === 'undefined' ? true : arguments[1];
                  // Parse all routes
                  _.each(sails.config.routes, function (params, route)
                  {
                      if(search === '' || route.indexOf(search) >= 0 || (typeof params.name !== 'undefined' && params.name.indexOf(search) >= 0))
                      {
                          list.push([params.name, route, params.controller + ":" + params.action]);
                      }
                  });
                  // HTML
                  if(is_html)
                  {
                      var html = '';
                      _.each(list, function (item)
                      {
                          html += "<tr><td class='name'>" + item[0] + "</td><td class='route'>" + item[1] + "</td><td class='controller'>" + item[2] + "</td></tr>";
                      });
                      return "<div class='helper-path'><table class='stack'><thead><tr><td>Name</td><td>Route</td><td>Controller</td></tr></thead><tbody>" + html + "</tbody></table></div>";
                  }
                  // Object
                  else
                  {
                      return list;
                  }
              },
    pathName: function (var_search)
              {
                  var name = '';
                  _.each(sails.config.routes, function (params, route)
                  {
                      if(name === '' && var_search === route.substr(route.indexOf('/')))
                      {
                          name = params.name;
                      }
                  });
                  return name;
              }
};