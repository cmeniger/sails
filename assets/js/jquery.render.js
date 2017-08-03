(function ($, window, document)
    {
        function Plugin(settings)
        {
            this.settings = settings;
            this.init();
        }

        Plugin.prototype = {
            init:          function ()
                           {
                               var parent = this;
                               this.initRender();
                           },
            initRender:    function ()
                           {
                               var parent = this;
                               $('[' + parent.settings.attributes.url + ']').each(function (e)
                               {
                                   if(typeof $(this).attr(parent.settings.attributes.modal) !== 'undefined' && typeof parent.settings.modal[$(this).attr(parent.settings.attributes.modal)] !== 'undefined')
                                   {
                                       $(this).attr(parent.settings.attributes.target, parent.settings.modal[$(this).attr(parent.settings.attributes.modal)]['target']);
                                       $(this).attr(parent.settings.attributes.event, parent.settings.modal[$(this).attr(parent.settings.attributes.modal)]['event']);
                                       $(this).attr(parent.settings.attributes.modal, parent.settings.modal[$(this).attr(parent.settings.attributes.modal)]['modal']);
                                   }
                                   if(typeof $(this).attr(parent.settings.attributes.load) === 'undefined')
                                   {
                                       parent.initEvent($(this), function ($item)
                                       {
                                           parent.refresh($item);
                                       });
                                   }
                               });
                               $('[' + parent.settings.attributes.list + ']').each(function (e)
                               {
                                   $(this).find('a')
                                       .attr(parent.settings.attributes.target, $(this).attr(parent.settings.attributes.target))
                                       .attr(parent.settings.attributes.source, $(this).attr(parent.settings.attributes.source))
                                       .attr(parent.settings.attributes.animation, $(this).attr(parent.settings.attributes.animation))
                                       .attr(parent.settings.attributes.event, $(this).attr(parent.settings.attributes.event));
                               });
                               $('[' + parent.settings.attributes.list + '] a').each(function (e)
                               {
                                   if(typeof $(this).attr(parent.settings.attributes.url) === 'undefined')
                                   {
                                       $(this).attr(parent.settings.attributes.url, $(this).attr('href')).removeAttr('href');
                                   }
                                   if(typeof $(this).attr(parent.settings.attributes.load) === 'undefined')
                                   {
                                       parent.initEvent($(this), function ($item)
                                       {
                                           parent.refresh($item);
                                       });
                                   }
                               });
                           },
            initEvent:     function ($item, cb)
                           {
                               var parent = this;
                               var event = $item.attr(parent.settings.attributes.event);
                               event = typeof event !== 'undefined' && event !== '' ? event : parent.settings.event;
                               if(event !== '' && (parent.settings.eventAuthorized === true || $.inArray(event, parent.settings.eventAuthorized) >= 0))
                               {
                                   $item.unbind(event).bind(event, function (e)
                                   {
                                       e.preventDefault();
                                       cb($item);
                                   });
                               }
                               else
                               {
                                   cb($item);
                               }
                           },
            initAnimation: function ($item, data, cb)
                           {
                               var parent = this;
                               var animation = $item.attr(parent.settings.attributes.animation);
                               var $target = $item.attr(parent.settings.attributes.target);
                               animation = typeof animation !== 'undefined' && animation !== '' ? animation : parent.settings.animation;
                               $target = typeof $target !== 'undefined' && $target !== '' ? $($target) : $item;
                               if(animation !== '' && (parent.settings.animationAuthorized === true || $.inArray(animation, parent.settings.animationAuthorized) >= 0))
                               {
                                   if(animation === 'fade')
                                   {
                                       $target.fadeToggle(400, "linear", function ()
                                       {
                                           $target.html(parent.getHtml($item, data)).fadeToggle(400, "linear", function ()
                                           {
                                               cb();
                                           });
                                       });
                                   }
                                   if(animation === 'slide')
                                   {
                                       $target.slideToggle(400, "linear", function ()
                                       {
                                           $target.html(parent.getHtml($item, data)).slideToggle(400, "linear", function ()
                                           {
                                               cb();
                                           });
                                       });
                                   }
                               }
                               else
                               {
                                   $target.html(parent.getHtml($item, data));
                                   cb();
                               }
                           },
            initExtern:    function ($item, data, cb)
                           {
                               var parent = this;
                               $(document).foundation();
                           },
            refresh:       function ($item)
                           {
                               var parent = this;
                               var method = $item.attr(parent.settings.attributes.method);
                               method = typeof method !== 'undefined' && method !== '' ? method : parent.settings.method;
                               var data = $item.attr(parent.settings.attributes.data);
                               data = typeof data !== 'undefined' && data !== '' ? data : '';
                               $.ajax
                               ({
                                   type:    method,
                                   url:     $item.attr(parent.settings.attributes.url),
                                   data:    {data: data},
                                   success: function (data)
                                            {
                                                parent.initAnimation($item, data, function ()
                                                {
                                                    if(typeof $item.attr(parent.settings.attributes.modal) !== 'undefined')
                                                    {
                                                        $('#' + $item.attr(parent.settings.attributes.modal)).foundation('open');
                                                    }
                                                    $item.attr(parent.settings.attributes.load, 1);
                                                    parent.initRender();
                                                    parent.initExtern();
                                                });
                                            }
                               });
                           },
            getHtml:       function ($item, data)
                           {
                               var parent = this;
                               var source = $item.attr(parent.settings.attributes.source);
                               var $data = $($.parseHTML(data));
                               if(typeof source !== 'undefined' && source !== '')
                               {
                                   data = $data.filter(source).add($data.find(source)).html();
                               }
                               return data;
                           }
        };
        $.fn.render = function (options)
        {
            var settings = $.extend
            ({
                attributes:          {
                    list:      'render-list',
                    url:       'render-url',
                    target:    'render-target',
                    source:    'render-source',
                    animation: 'render-animation',
                    event:     'render-event',
                    load:      'render-load',
                    method:    'render-method',
                    data:      'render-data',
                    modal:     'render-modal'
                },
                modal:               {
                    admin: {
                        modal:  'modal-admin',
                        target: '#modal-admin-content',
                        event:  'click'
                    }
                },
                method:              'GET',
                event:               '',
                eventAuthorized:     ['click', 'mouseover', 'mouseout'],
                animation:           '',
                animationAuthorized: ['fade', 'slide']
            }, options);
            new Plugin(settings);
        };
    }
    (jQuery, window, window.document)
)
;