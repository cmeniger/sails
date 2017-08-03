(function ($, window, document)
    {
        function Plugin(settings)
        {
            this.settings = settings;
            this.order = {
                price:     0,
                reduction: 0,
                tax:       0,
                note:      0,
                email:     '',
                comment:   '',
                password:  '',
                print:     '',
                products:  {}
            };
            this.init();
        }

        Plugin.prototype = {
            init:         function ()
                          {
                              var parent = this;
                              this.initProduct();
                              this.initPrint();
                              this.initNote();
                              this.initModal();
                          },
            initProduct:  function ()
                          {
                              var parent = this;
                              $('[' + parent.settings.product.item + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  var product = $(this).attr(parent.settings.product.item).split(parent.settings.product.separator);
                                  if(typeof parent.order.products[product[0]] != 'undefined')
                                  {
                                      parent.order.products[product[0]].quantity++;
                                  }
                                  else
                                  {
                                      parent.order.products[product[0]] = {
                                          id:       product[0],
                                          name:     product[1],
                                          price:    product[2],
                                          quantity: 1,
                                          setting:  {}
                                      };
                                  }
                                  $('[' + parent.settings.product.content + '=' + product[0] + ']').addClass('selected');
                                  parent.refresh();
                              });
                              $('[' + parent.settings.product.expand + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  $('#' + parent.settings.modal.expand).find('img').attr('src', $(this).attr(parent.settings.product.expand));
                                  $('#' + parent.settings.modal.expand).foundation('open');
                              });
                              $('[' + parent.settings.product.delete + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  // TODO
                              });
                          },
            initPrint:    function ()
                          {
                              var parent = this;
                              $('[' + parent.settings.print.item + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  var print = $(this).attr(parent.settings.print.item).split(parent.settings.print.separator);
                                  $('[' + parent.settings.print.content + ']').removeClass('selected');
                                  if(parent.order.print == print[0])
                                  {
                                      parent.order.print = '';
                                  }
                                  else
                                  {
                                      parent.order.print = print[0];
                                      $('[' + parent.settings.print.content + '=' + print[0] + ']').addClass('selected');
                                  }
                              });
                          },
            initNote:     function ()
                          {
                              var parent = this;
                              $('[' + parent.settings.note.content + ']').each(function ()
                              {
                                  var $current = $(this);
                                  $(this).find(parent.settings.note.star + ' [data-value]').mouseenter(function ()
                                  {
                                      parent.refreshNote($current, $(this).attr('data-value'));
                                  });
                                  $(this).find(parent.settings.note.star + ' [data-value]').mouseenter(function ()
                                  {
                                      parent.refreshNote($current, $(this).attr('data-value'));
                                  });
                                  $(this).find(parent.settings.note.star + ' [data-value]').click(function ()
                                  {
                                      parent.order.note = $(this).attr('data-value') == parent.order.note ? 0 : $(this).attr('data-value');
                                      parent.refreshNote($current, parent.order.note);
                                  });
                                  $(this).find(parent.settings.note.star).mouseout(function ()
                                  {
                                      parent.refreshNote($current, parent.order.note);
                                  });
                              });
                          },
            initModal:    function ()
                          {
                              var parent = this;
                              $(parent.settings.modal.item).each(function ()
                              {
                                  $(this).find('form').submit(function (e)
                                  {
                                      e.preventDefault();
                                      var $form = $(this);
                                      $.each($form.serializeArray(), function (i, field)
                                      {
                                          if(field.name == 'reduction' && parent.order.password !== false)
                                          {
                                              parent.order.reduction = parent.order.price - field.value;
                                              parent.refresh();
                                          }
                                          else
                                          {
                                              if(field.name == 'password')
                                              {
                                                  $.ajax
                                                  ({
                                                      type:    'POST',
                                                      url:     parent.settings.password.url,
                                                      data:    {password: field.value},
                                                      success: function (data)
                                                               {
                                                                   parent.order.password = true;
                                                                   $('#form-error-price').html('').hide();
                                                                   $form[0].reset();
                                                               },
                                                      error:   function (data)
                                                               {
                                                                   parent.order.password = false;
                                                                   parent.order.reduction = 0;
                                                                   $('#' + parent.settings.password.error).html(data.responseJSON.error).show();
                                                                   $('#' + $form.attr('data-next')).foundation('close');
                                                                   $('#' + $form.attr('data-current')).foundation('open');
                                                                   parent.refresh();
                                                               }
                                                  });
                                              }
                                              else
                                              {
                                                  if(field.name == 'confirm')
                                                  {
                                                      $.ajax
                                                      ({
                                                          type:    'POST',
                                                          url:     parent.settings.confirm.url,
                                                          data:    parent.order,
                                                          success: function (data)
                                                                   {
                                                                       parent.order = {
                                                                           price:     0,
                                                                           reduction: 0,
                                                                           tax:       0,
                                                                           note:      0,
                                                                           email:     '',
                                                                           comment:   '',
                                                                           password:  '',
                                                                           print:     '',
                                                                           products:  {}
                                                                       };
                                                                       parent.refresh();
                                                                       setTimeout(function ()
                                                                       {
                                                                           window.location.replace('/');
                                                                       }, 15000);
                                                                   },
                                                          error:   function (data)
                                                                   {
                                                                       $('#' + parent.settings.confirm.error).html(data.responseJSON.error).show();
                                                                       $('#' + $form.attr('data-next')).foundation('close');
                                                                       $('#' + $form.attr('data-current')).foundation('open');
                                                                   }
                                                      });
                                                  }
                                                  else
                                                  {
                                                      parent.order[field.name] = field.value;
                                                  }
                                              }
                                          }
                                      });
                                      parent.refreshModal($form);
                                  });
                                  $(this).find('.order-price').click(function (e)
                                  {
                                      e.preventDefault();
                                      $('#' + $(this).attr('data-current')).foundation('close');
                                      $('#' + parent.settings.modal.price).find('input[name=reduction]').val(parent.order.price - parent.order.reduction);
                                      $('#' + parent.settings.modal.price).find('form').attr('data-next', $(this).attr('data-current'));
                                      $('#' + parent.settings.modal.price).foundation('open');
                                  });
                              });
                          },
            initSetting:  function ()
                          {
                              var parent = this;
                              $('[' + parent.settings.setting.filter + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  var setting = $(this).attr(parent.settings.setting.filter).split(parent.settings.setting.separator);
                                  if($(this).hasClass('selected'))
                                  {
                                      $(this).removeClass('selected');
                                      delete parent.order.products[setting[0]].setting[setting[1]];
                                  }
                                  else
                                  {
                                      $(this).addClass('selected');
                                      parent.order.products[setting[0]].setting[setting[1]] = {
                                          id:    setting[1],
                                          name:  setting[2],
                                          price: setting[3]
                                      };
                                  }
                                  parent.refresh();
                              });
                          },
            initEvent:    function ()
                          {
                              var parent = this;
                              $('[' + parent.settings.cart.quantity + ']').unbind('change').change(function (e)
                              {
                                  e.preventDefault();
                                  var id = $(this).attr(parent.settings.cart.quantity);
                                  parent.order.products[id].quantity = $(this).val() <= 0 ? 1 : $(this).val();
                                  parent.refresh();
                              });
                              $('[' + parent.settings.cart.plus + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  var id = $(this).attr(parent.settings.cart.plus);
                                  parent.order.products[id].quantity++;
                                  parent.refresh();
                              });
                              $('[' + parent.settings.cart.minus + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  var id = $(this).attr(parent.settings.cart.minus);
                                  if(parent.order.products[id].quantity > 1)
                                  {
                                      parent.order.products[id].quantity--;
                                      parent.refresh();
                                  }
                              });
                              $('[' + parent.settings.cart.remove + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  var id = $(this).attr(parent.settings.cart.remove);
                                  delete parent.order.products[id];
                                  $('[' + parent.settings.cart.product + '=' + id + ']').remove();
                                  $('[' + parent.settings.product.content + '=' + id + ']').removeClass('selected');
                                  parent.refresh();
                              });
                              $('[' + parent.settings.cart.setting.button + ']').unbind('click').click(function (e)
                              {
                                  e.preventDefault();
                                  var id = $(this).attr(parent.settings.cart.setting.button);
                                  $.ajax
                                  ({
                                      type:    'POST',
                                      url:     parent.settings.setting.url + id,
                                      data:    {filter: parent.order.products[id].setting},
                                      success: function (data)
                                               {
                                                   $('#' + parent.settings.setting.content).html(data);
                                                   $('#' + parent.settings.modal.setting).foundation('open');
                                                   parent.initSetting();
                                               }
                                  });
                              });
                          },
            refresh:      function ()
                          {
                              var parent = this;
                              parent.refreshPrice();
                              // Toggle actions
                              if(parent.order.price > 0)
                              {
                                  $('#' + parent.settings.cart.action).show();
                              }
                              else
                              {
                                  $('#' + parent.settings.cart.action).hide();
                              }
                              // Refresh list
                              $.ajax
                              ({
                                  type:    'POST',
                                  url:     parent.settings.cart.url,
                                  data:    {data: parent.order},
                                  success: function (data)
                                           {
                                               $('#' + parent.settings.cart.content).html(data);
                                               parent.initEvent();
                                           }
                              });
                          },
            refreshNote:  function ($current, value)
                          {
                              var parent = this;
                              if(value == 0)
                              {
                                  $current.find(parent.settings.note.legend).html('');
                              }
                              $current.find(parent.settings.note.star + ' [data-value]').each(function ()
                              {
                                  if($(this).attr('data-value') == value)
                                  {
                                      $current.find(parent.settings.note.legend).html($(this).attr('data-legend'));
                                  }
                                  if($(this).attr('data-value') <= value)
                                  {
                                      $(this).addClass('in');
                                  }
                                  else
                                  {
                                      $(this).removeClass('in');
                                  }
                              });
                          },
            refreshPrice: function ()
                          {
                              var parent = this;
                              var total = 0;
                              // Total count
                              $.each(parent.order.products, function (id, product)
                              {
                                  total = total + (product.quantity * product.price);
                                  $.each(product.setting, function (id, setting)
                                  {
                                      total = total + (product.quantity * setting.price);
                                  });
                              });
                              parent.order.tax = parent.settings.tax * (total - parent.order.reduction) / 100;
                              parent.order.price = total;
                              // Show price
                              $('.order-price').html(parseFloat(parent.order.price - parent.order.reduction).toFixed(2) + '€');
                              if(parent.order.reduction !== 0)
                              {
                                  $('.order-price').append("<del>" + parseFloat(parent.order.price).toFixed(2) + "€</del>");
                              }
                          },
            refreshModal: function ($this)
                          {
                              var parent = this;
                              if(typeof $this.attr('data-current') != 'undefined' && $this.attr('data-current') != '')
                              {
                                  $('#' + $this.attr('data-current')).foundation('close');
                              }
                              if(typeof $this.attr('data-next') != 'undefined' && $this.attr('data-next') != '')
                              {
                                  $('#' + $this.attr('data-next')).foundation('open');
                              }
                          }
        };
        $.fn.order = function (options)
        {
            var settings = $.extend
            ({
                    cart:     {
                        url:      '/order/cart',
                        content:  'cart',
                        action:   'cart-action',
                        product:  'cart-list-product',
                        quantity: 'cart-list-quantity',
                        plus:     'cart-list-plus',
                        minus:    'cart-list-minus',
                        remove:   'cart-list-remove',
                        setting:  {
                            button:  'cart-setting-button',
                            product: 'cart-setting-product',
                            remove:  'cart-setting-remove'
                        }
                    },
                    product:  {
                        item:      'order-product',
                        content:   'order-product-content',
                        expand:    'order-product-expand',
                        delete:    'order-product-delete',
                        separator: '|'
                    },
                    setting:  {
                        url:       '/order-product/setting/',
                        content:   'order-setting-content',
                        filter:    'order-setting-filter',
                        separator: '|'
                    },
                    print:    {
                        item:      'order-print',
                        content:   'order-print-content',
                        separator: '|'
                    },
                    password: {
                        url:   '/order/password',
                        error: 'form-error-password'
                    },
                    confirm:  {
                        url:   '/order/create',
                        error: 'form-error-confirm'
                    },
                    modal:    {
                        item:    '.order-modal',
                        expand:  'order-modal-expand',
                        setting: 'order-modal-setting',
                        price:   'order-modal-price',
                        step1:   'order-modal-step1',
                        step2:   'order-modal-step2',
                        step3:   'order-modal-step3'
                    },
                    note:     {
                        content: 'order-note',
                        star:    '.star',
                        legend:  '.legend'
                    },
                    tax:      '20'
                }, options
            );
            new Plugin(settings);
        };
    }
    (jQuery, window, window.document)
);