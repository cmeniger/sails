
(function ($) {
    "use strict";
    var Phoenix;
    Phoenix = {
        objDrag: '',
        init: function () {
            this.selectionItem();
            this.swiper();
            this.swiperList();
            this.swiperContentLeft();
            this.viewImg();
            this.swiperMianContent();
            this.swiperPopupLeft();
            this.swiperPopupRight();
            this.swiperMiddleRight();
            this.swiperMiddleLeft();
            this.swiperActive();
            this.nestModal();
            this.animateRightToLeft();
            this.mainContentData();
            this.rightContentData();
            this.bottomMainContentData();
        },
        selectionItem:function () {
            $('.location-select li').on('click',function () {
                var attr_class = $(this).attr('class');
                if(attr_class == 'active-select'){
                    $(this).attr('class','no-active-select');
                }else{
                    $(this).attr('class','active-select');
                }
            })
        },
        swiperActive:function () {
             $('.swiper-active .swiper-slide').click(function () {
                 $(this).addClass('active');
                 $(this).siblings().removeClass('active');
             })
        },
        swiperMianContent:function () {
            var swiper = new Swiper('.swiper-main-container', {
                slidesPerView: 2,
                paginationClickable: true,
                spaceBetween: 20,
                longSwipesMs: 3000,
                breakpoints:{
                    640:{
                        slidesPerView: 1,
                        spaceBetween: 5,
                    },
                    1200:{
                        slidesPerView: 1
                    }
                }
            });
        },
        swiper:function () {
            var swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                slidesPerView: 4,
                spaceBetween: 5,
                mousewheelControl: true,
                breakpoints:{
                    1200:{
                        slidesPerView: 3
                    }
                }
            });
        },
        swiperList:function () {
            var swiper = new Swiper('.swiper-container-center', {
                slidesPerView: 10,
                paginationClickable: true,
                spaceBetween: 15,
                breakpoints:{
                    640:{
                        slidesPerView: 5
                    },
                    1440:{
                        slidesPerView: 7
                    }
                }
            });
        },
        swiperContentLeft:function () {
                var swiper = new Swiper('.swiper-container-left', {
                    slidesPerView: 4,
                    spaceBetween: 0,
                    breakpoints:{
                        1200:{
                            direction: 'horizontal',
                            slidesPerView: 3
                        },
                        1439:{
                            direction: 'horizontal',
                            slidesPerView: 3
                        },
                        1920:{
                            direction: 'vertical',
                            slidesPerView: 3
                        }

                    }
                });
        },
        swiperPopupLeft:function () {
            var swiper = new Swiper('.swiper-popup-left', {
                direction: 'vertical',
                slidesPerView: 7,
                spaceBetween: 0,
                breakpoints:{
                    1200:{
                        direction: 'horizontal',
                        slidesPerView: 3
                    },
                    1439:{
                        direction: 'vertical',
                        slidesPerView: 7
                    },
                    1920:{
                        direction: 'vertical',
                        slidesPerView: 7
                    }
                }
            });
        },
        swiperPopupRight:function () {
            var swiper = new Swiper('.swiper-popup-right', {
                direction: 'vertical',
                slidesPerView: 7,
                spaceBetween: 0,
                breakpoints:{
                    1200:{
                        direction: 'horizontal',
                        slidesPerView: 3
                    },
                    1439:{
                        direction: 'vertical',
                        slidesPerView: 7
                    },
                    1920:{
                        direction: 'vertical',
                        slidesPerView: 7
                    }
                }
            });
        },
        viewImg:function () {
            $('.small-list').click(function () {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                var swiper = new Swiper('.swiper-main-container', {
                    slidesPerView: 3,
                    slidesPerColumn: 2,
                    paginationClickable: true,
                    spaceBetween: 30,
                    breakpoints:{
                        640:{
                            slidesPerView: 2,
                            slidesPerColumn: 2
                        },
                        768:{
                            slidesPerView: 2,
                            slidesPerColumn: 2
                        },
                        1200:{
                            slidesPerView: 2,
                            slidesPerColumn: 2
                        }
                    }
                });
                $('.swiper-main-container').addClass('custom_rows');
                $('.swiper-main-container').removeClass('one_row');
                $('.swiper-main-container .swiper-wrapper').css({"transition-duration":"0ms","transform":"translate3d(0px, 0px, 0px)"});

            })
            $('.big-list').click(function () {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                var swiper = new Swiper('.swiper-main-container', {
                    slidesPerView: 2,
                    slidesPerColumn: 1,
                    paginationClickable: true,
                    spaceBetween: 20,
                    breakpoints:{
                        640:{
                            slidesPerView: 1,
                            slidesPerColumn: 1
                        },
                        768:{
                            slidesPerView: 1,
                            slidesPerColumn: 1
                        },
                        1200:{
                            slidesPerView: 1,
                            slidesPerColumn: 1
                        }
                    }
                });
                $('.swiper-main-container').removeClass('custom_rows');
                $('.swiper-main-container').addClass('one_row');
                $('.swiper-main-container .swiper-wrapper').css({"transition-duration":"0ms","transform":"translate3d(0px, 0px, 0px)"});
            })
        },
        swiperMiddleLeft:function () {
            var count = $('.swiper-popup-left .swiper-slide').length;
            if(count <= 7){
                $('.swiper-popup-left .swiper-wrapper').addClass('swiper-reset');
            }else{
                var have_class = $('.swiper-popup-left .swiper-wrapper').hasChanged('swiper-reset');
                if(have_class){
                    $('.swiper-popup-left .swiper-wrapper').removeClass('swiper-reset');
                }
            }
        },
        swiperMiddleRight:function () {
            var count = $('.swiper-popup-right .swiper-slide').length;
            if(count <= 7){
                $('.swiper-popup-right .swiper-wrapper').addClass('swiper-reset');
            }else{
                var have_class = $('.swiper-popup-right .swiper-wrapper').hasChanged('swiper-reset');
                if(have_class){
                    $('.swiper-popup-right .swiper-wrapper').removeClass('swiper-reset');
                }
            }
        },
        nestModal:function () {
            $('#nest-modal').click(function () {
                $('#md-wrapper').addClass('md-close');
                $('#md-wrapper').removeClass('md-close');
            })
            $('#close-md').click(function () {
                $('#md-wrapper').removeClass('md-close');
                $('#md-wrapper').addClass('md-close');
            })

            $('#confirmation').click(function () {
                $('#md-wrapper').removeClass('md-close');
                $('#md-wrapper').addClass('md-close');
                $('#nest-modal').addClass('md-close');
                $('#price').removeClass('md-close');
                var val = $('#nest-modal').text();
                $('#price').val(val);
            })
        },
        animateRightToLeft:function () {
            $('#btn-step-1').click(function () {
                $('.wraper-footer').addClass('move-next');
            })
            $('#btn-back').click(function () {
                $('.wraper-footer').removeClass('move-next');
            })
        },
        mainContentData:function () {
            var self = this;
            $('.swipe-to-right').click(function (e) {
                e.stopImmediatePropagation();
                var id =$(e.currentTarget).attr('data-id');
                var title = $('#'+id).attr('data-title');
                var pro_code = $('#'+id).attr('data-code');
                var price = $('#'+id).attr('data-price');
                var currency = $('#'+id).attr('data-currency');
                var description = $('#'+id).attr('data-description');
                var src = $(this).parent().find('img').attr('src');
                var html = '';
                html+='<div class="swiper-slide">';
                html+= '<a class="remove" href="#"></a>';
                html+= '<a class="swipe-to-left" data-id="'+id+'" href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>';
                html+= '<div class="product-info">';
                html+= '<div class="img"><a href="#" data-open="effect-modal"><img src="'+src+'" alt="" /></a></div>';
                html+='<div class="detail">';
                html+= '<h2>'+title+'</h2>';
                html+= '<p>'+description+'</p>';
                html+='<span>'+price+' '+currency+'</span>';
                html+= '</div>';
                html+= '<div class="edit-qty"><a class="plus" href="#">+</a><input type="text" id="qty" class="qty" value=""/><a class="minus" href="#">-</a>';
                html+= '</div></div></div>';
                html+= '<div id="'+id+'" class="md-close" data-code="'+pro_code+'" data-title="'+title+'" data-price="'+price+'" data-currency="'+currency+'" data-description="'+description+'"></div>';
                $(this).parent().hide('slow', function(){ $(this).parent().remove(); });
                $('#swipe-accept').append(html);
                self.rightContentData();

            })
            $('.swipe-to-down').click(function (e) {
                e.stopImmediatePropagation();
                var id = $(e.currentTarget).attr('data-id');
                var title = $('#'+id).attr('data-title');
                var pro_code = $('#'+id).attr('data-code');
                var price = $('#'+id).attr('data-price');
                var currency = $('#'+id).attr('data-currency');
                var description = $('#'+id).attr('data-description');
                var src = $(this).parent().find('img').attr('src');
                var swipe_to_right_small = $('.swipe-to-right').hasClass('swipe-to-right-small');
                if(swipe_to_right_small){
                    swipe_to_right_small = 'swipe-to-right-small';
                }else {
                    swipe_to_right_small = '';
                }
                var html = '';
                html+= '<div class="swiper-slide">';
                html+= '<img class="img-swip" src="'+src+'" alt="" width="98" />';
                html+= '<a class="swipe-to-up '+swipe_to_right_small+'" data-id="'+id+'" href="#"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>';
                html+= '<a class="remove" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>';
                html+= '<div id="'+id+'" class="md-close" data-code="'+pro_code+'" data-title="'+title+'" data-price="'+price+'" data-currency="'+currency+'" data-description="'+description+'"></div>';
                html+= '</div>';
                $(this).parent().hide('slow', function(){ $(this).parent().remove(); });
                $(html).insertBefore('#swiper-no-img');
                self.bottomMainContentData();
            });
        },
        rightContentData:function () {
            var self = this;
            $('.swipe-to-left').click(function (e) {
                e.stopImmediatePropagation();
                var id = $(e.currentTarget).attr('data-id');
                var title = $('#'+id).attr('data-title');
                var pro_code = $('#'+id).attr('data-code');
                var price = $('#'+id).attr('data-price');
                var currency = $('#'+id).attr('data-currency');
                var description = $('#'+id).attr('data-description');
                var src = $(this).parent().find('img').attr('src');
                var html = '';
                html+= '<div class="swiper-slide">';
                html+= '<div class="wrapper-main">';
                html+= '<label>'+pro_code+'</label>';
                html+= '<a href="/images/edit-2-original.jpg" data-lightbox="list-edit" data-title="'+pro_code+'"><img src="'+src+'" alt="" /></a>';
                html+= '<a class="swipe-to-right" data-id="'+id+'" href="#"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>';
                html+= '<a class="swipe-to-down" data-id="'+id+'" href="#"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>';
                html+= '<div id="'+id+'" class="md-close" data-code="'+pro_code+'" data-title="'+title+'" data-price="'+price+'" data-currency="'+currency+'" data-description="'+description+'"></div>';
                html+= '</div></div>';
                $(this).hide('slow', function(){ $(this).parent().remove(); });
                $('#swipe-main-accept').append(html);
                if($('.swiper-main-container').hasClass('custom_rows')){
                    var swiper = new Swiper('.swiper-main-container', {
                        slidesPerView: 3,
                        slidesPerColumn: 2,
                        paginationClickable: true,
                        spaceBetween: 30,
                        breakpoints:{
                            640:{
                                slidesPerView: 2
                            },
                            1440:{
                                slidesPerView: 2
                            }
                        }
                    });
                }
                self.mainContentData();
            });
        },
        bottomMainContentData:function () {
            var self = this;
            $('.swipe-to-up').click(function (e) {
                e.stopImmediatePropagation();
                var id = $(e.currentTarget).attr('data-id');
                var title = $('#'+id).attr('data-title');
                var pro_code = $('#'+id).attr('data-code');
                var price = $('#'+id).attr('data-price');
                var currency = $('#'+id).attr('data-currency');
                var description = $('#'+id).attr('data-description');
                var src = $(this).parent().find('img').attr('src');
                var html = '';
                html+= '<div class="swiper-slide">';
                html+= '<div class="wrapper-main">';
                html+= '<label>'+pro_code+'</label>';
                html+= '<a href="/images/edit-2-original.jpg" data-lightbox="list-edit" data-title="'+pro_code+'"><img src="'+src+'" alt="" /></a>';
                html+= '<a class="swipe-to-right" data-id="'+id+'" href="#"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>';
                html+= '<a class="swipe-to-down" data-id="'+id+'" href="#"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>';
                html+= '<div id="'+id+'" class="md-close" data-code="'+pro_code+'" data-title="'+title+'" data-price="'+price+'" data-currency="'+currency+'" data-description="'+description+'"></div>';
                html+= '</div></div>';
                $(this).hide('slow', function(){ $(this).parent().remove(); });
                $('#swipe-main-accept').append(html);
                if($('.swiper-main-container').hasClass('custom_rows')){
                    var swiper = new Swiper('.swiper-main-container', {
                        slidesPerView: 3,
                        slidesPerColumn: 2,
                        paginationClickable: true,
                        spaceBetween: 30,
                        breakpoints:{
                            640:{
                                slidesPerView: 2
                            },
                            1440:{
                                slidesPerView: 2
                            }
                        }
                    });
                }
                self.mainContentData();
            });
        }
    };
    $(document).ready(function () {
        Phoenix.init();
    });
})(jQuery);

// Image deletion function
var  $trash = $( "#trash" );
//var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
function deleteImage( $item ) {
    $item.fadeOut(function() {
        var $list = $( ".swiper-wrapper", $trash ).length ?
            $( ".swiper-wrapper", $trash ) :
            $("<div class='swiper-wrapper swipe-up-down'/>").appendTo( $trash );


        $item.appendTo( $list ).fadeIn(function() {
            $item
                .animate({ width: "100%" })
                .find( "img" )
                .animate({ height: "auto" });
        });
    });

}

