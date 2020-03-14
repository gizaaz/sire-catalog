"use strict";

var kokoc = {
  init: function init() {
    console.log('kokoc init!');

    this.$B = $('body');

    this.plugins.sliderMain.init();
    this.plugins.sliderMainNews.init();
    this.plugins.sliderCardItems.init();
    this.plugins.sliderTabsItem.init();
    this.plugins.toTopBtn.init();
    this.plugins.mainMenu.init();
    this.plugins.siteTabs.init();
    this.plugins.mobileMenu.init();
    this.plugins.parametrFilter.init();
    this.plugins.siteHeader.init();
    this.plugins.breadCrumbs.init();

    this.pages.colorSpectrum.init();
    this.pages.catalog.init();
    this.pages.catalog.calcItemHeight();
    this.pages.base.init();
    this.pages.productCard.init();
    this.pages.cartPage.init();
    this.pages.whereBuy.init();
    this.pages.mainPage.init();
  },


  plugins: {
    parametrFilter: {
      init: function init() {
        if ($('.parametr-search-item-range').length > 0) {
          var minPrice = $('#search-amount-min').children('input').val();
          var maxPrice = $('#search-amount-max').children('input').val();

          $('#search-amount-min').children('span').html(minPrice.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ") + ' руб.');
          $('#search-amount-max').children('span').html(maxPrice.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ") + ' руб.');

          $('.parametr-search-item-range').slider({
            range: true,
            min: 1000,
            max: maxPrice,
            values: [minPrice, maxPrice],
            slide: function slide(event, ui) {
              var min = ui.values[0];
              min = min.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ");
              var max = ui.values[1];
              max = max.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ");
              $('#search-amount-min').children('input').val(min);
              $('#search-amount-max').children('input').val(max);
            }
          });
        }

        $('.parametr-search-mobile').on('click', function () {
          $(this).parent().toggleClass('isOpen').next('.mfilter-box').toggleClass('isOpen');
        });
      }
    },
    mainMenu: {
      init: function init() {
        var catalogMenu = $('.catalog-menu'),
            infoMenu = $('.info-menu');

        infoMenu.children('ul').children('li').on('mouseenter', function () {
          if ($(this).children('ul').length > 0) {

                  $('.site-header').addClass('isVisible');

          }
        });


            infoMenu.children('ul').children('li').on('mouseleave', function () {
                if($('.site-header').hasClass('isVisible')) {

                    $('.site-header').removeClass('isVisible');
                }
            });



        catalogMenu.children('ul').children('li').children('ul').children('li').on('mouseenter', function () {
          if ($(this).children('ul').length > 0) {

                  $('.site-header').addClass('isVisible');


          }
        });


            catalogMenu.children('ul').children('li').children('ul').children('li').on('mouseleave', function () {
                if($('.site-header').hasClass('isVisible')) {

                    $('.site-header').removeClass('isVisible');

                }
            });





        catalogMenu.children('ul').children('li').children('ul').children('li').children('ul').children('li').on('mouseenter', function () {
          if ($(this).children('ul').length > 0) {

                  $(this).closest('ul').addClass('isVisible');

          }
        });


            catalogMenu.children('ul').children('li').children('ul').children('li').children('ul').children('li').on('mouseleave', function () {
                if($(this).closest('ul').hasClass('isVisible')) {

                    $(this).closest('ul').removeClass('isVisible');

                }
            });


      }
    },
    toTopBtn: {
      init: function init() {
        var $topBtn = $('.to-top-btn');
        $topBtn.hide();

        window.addEventListener('scroll', function () {
          var scrollTop = $(window).scrollTop();

          if (scrollTop > 400) {
            $topBtn.fadeIn();
          } else {
            $topBtn.fadeOut();
          }
        });

        $topBtn.on('click', function () {
          $('body,html').animate({
            scrollTop: 0
          }, 500);
          return false;
        });
      }
    },
    sliderMain: {
      init: function init() {
        var slider = $('.main-slider').slick({
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000
        });
      }
    },
    sliderMainNews: {
      init: function init() {
        var slider = $('.main-slider-news').slick({
          arrows: false,
          speed: 700,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          responsive: [{
            breakpoint: 1025,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: true
            }
          }, {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true
            }
          }]
        });
      }
    },
    sliderCardItems: {
      init: function init() {
        var sliderFor = $('.card-slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.card-slider-nav'
        });

        var sliderNav = $('.card-slider-nav').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.card-slider-for',
          arrows: true,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
    },
    sliderTabsItem: {
      init: function init() {
        this.$el = $('.tab-slider');
        var slider = this.$el.slick({
          arrows: false,
          dots: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          rows: 1,
          slidesPerRow: 4,
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesPerRow: 3,
              slidesToScroll: 1,
              dots: true
            }
          }, {
            breakpoint: 770,
            settings: {
              slidesPerRow: 3,
              slidesToScroll: 1,
              dots: true
            }
          }, {
            breakpoint: 769,
            settings: "unslick"
          }]
        });
      },
      reinit: function reinit() {
        this.$el.slick('unslick');
        kokoc.plugins.sliderTabsItem.init();
      }
    },
    siteHeader: {
      init: function init() {
        var header = $('.site-header');

        header.mCustomScrollbar({
          axis: 'y'
        });
      }
    },
    siteTabs: {
      init: function init() {
        $('div.tabs__caption').on('click', '.tab-item:not(.active)', function () {
          $(this).addClass('active').siblings().removeClass('active').parent().parent().next().find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');

          if ($('.tab-slider').length > 0) {
            kokoc.plugins.sliderTabsItem.reinit();
          }

          if ($(this).hasClass('color-spectrum-tab')) {
            $(this).parent().removeClass('opened').prev('.color-spectrum-tabs-mobile').html($(this).html());
          }
        });
      }
    },
    mobileMenu: {
      init: function init() {
        var mainMenu = $('.header-menu');

        mainMenu.on('click', function (e) {
          if ($(this).has(e.target).length === 0) {
            $('body').toggleClass('menu-open');
            e.stopPropagation();
          }
        });

        $('.mobile-left-block').mCustomScrollbar({
          axis: 'y',
          theme: 'green-theme'
        });

        var mainMenuItems = $('.mobile-left-menu').find('li');

        mainMenuItems.each(function () {
          if ($(this).children('ul').length > 0) {
            $(this).children('a').after('<span class="arrow-mobile"></span>');

            $(this).children('ul').prepend('<li> <span>' + $(this).children('a').html() + '</span></li>');
            $(this).children('ul').prepend('<li class="go-back-btn"><span>Назад</span></li>');
          }
        });

        $('.arrow-mobile').on('click', function () {
          $(this).parent().addClass('open');
        });

        $('.go-back-btn').on('click', function () {
          $(this).parent().parent().removeClass('open');
        });

        $(document).on('click', function (e) {
          if ($('body').hasClass('menu-open') && !$('.mobile-left-block').is(e.target) && $('.mobile-left-block').has(e.target).length === 0) {
            $('body').removeClass('menu-open');
          }
        });
      }
    },
    breadCrumbs: {
      init: function init() {
        var bCrumbs = $('ul.breadcrumbs');

        if (bCrumbs.length > 0) {
          bCrumbs.prepend('<li class="bCrumbs-go-back"><a onclick="javascript:history.back();">Назад</a></li>');
        }
      }
    }
  },
  pages: {
    base: {
      init: function init() {
        $('.custom-select').selectmenu({
          change: function (event, ui) {

            var selectId = this.id,
                selectIndex = this.selectedIndex, // индекс выбранного элемента
                cartId = this.dataset.id;

            if ( typeof cartId != "undefined" ) {

              $.ajax({
                url: 'index.php?route=checkout/wm_custom_cart/updateService',
                type: 'POST',
                dataType: 'json',
                data: $('#service-id-'+cartId).serialize(),
                success:function (json) {
                  if (json.error) {

                  }
                  if (json.success) {
                    setTimeout(function () {
                      $.ajax({
                        url: 'index.php?route=checkout/wm_custom_cart',
                        type: 'GET',
                        dataType: 'html',
                        context: document.body,
                        success: function (data) {

                          var service = $(data).find('#service-table').html();
                          $('#service-table').html(service);

                          kokoc.pages.base.init();

                          var totalSumm = $(data).find('#total-summ').html();
                          $('#total-summ').html(totalSumm);

                          var headerCart = $(data).find('#header-cart').html();
                          $('#header-cart').html(headerCart);
                        }
                      });

                      // $('#checkout-cart').load('index.php?route=checkout/wm_custom_cart #checkout-cart > *', function () {

                      // });
                    }, 100);

                  }
                }
              });

            }
          }
        });
        // $('.card-options-choice-item-select').selectmenu();
      }
    },
    mainPage: {
      init: function init() {
        $('.main-slider-item-to-bottom').on('click', function () {
          var scroll_el = $('.main-slider-news');
          if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
          }

        });
      }
    },
    colorSpectrum: {
      init: function init() {
        this.$el = $('.color-spectrum-examples-btn');
        kokoc.pages.colorSpectrum.update();

        window.addEventListener('resize', function (event) {
          kokoc.pages.colorSpectrum.update();
        });

        var tabs = $('.color-spectrum-tabs-mobile');

        tabs.html($('.color-spectrum-tab.active').html());

        tabs.on('click', function () {
          $(this).next().toggleClass('opened');
        });
      },
      update: function update() {
        var w = window.screen.availWidth;

        if ((w < 1025) && (this.$el.length > 0)) {
          this.$el.children('span').html('Каталог данной гаммы');
        } else {
          this.$el.children('span').html('Ко всему каталогу данной гаммы');
        }
      }
    },
    catalog: {
      init: function init() {
        if ($('.categories-list').children('.categories-list-item').length > 3) {
          $('.categories-wrapper').addClass('more-3-cat');
        }

        if ($('.collections-list').children('.collections-list-item').length > 6) {
          $('.collections-wrapper').addClass('more-6-cat');
        } else if ($('.collections-list').children('.collections-list-item').length > 3) {
          $('.collections-wrapper').addClass('more-3-cat');
        }

        var scrollPosition = null;

        $('.collections-list-btn').on('click', function () {

          $(this).prev('.collections-list').toggleClass('isOpen');
          $(this).toggleClass('isOpen');

          if ($(this).prev('.collections-list').hasClass('isOpen')) {
            scrollPosition = $(window).scrollTop();
            $(this).html('Скрыть коллекции');
          } else {
            $(window).scrollTop(scrollPosition);
            $(this).html('Показать все коллекции');
          }
        });

        $('.categories-list-btn').on('click', function () {
          $(this).prev('.categories-list').toggleClass('isOpen');
          $(this).toggleClass('isOpen');

          if ($(this).prev('.categories-list').hasClass('isOpen')) {
            scrollPosition = $(window).scrollTop();
            $(this).html('Скрыть разделы');
          } else {
            $(window).scrollTop(scrollPosition);
            $(this).html('Показать все разделы');
          }
        });

        kokoc.pages.catalog.calcItemHeight();

        window.addEventListener('resize', function (event) {
          kokoc.pages.catalog.calcItemHeight();
        });
      },
      calcItemHeight: function calcItemHeight() {
        $('.goods-item-wrapper').each(function () {
          $(this).css('min-height', $(this).children().outerHeight());
        });
      }
    },
    productCard: {
      init: function init() {
        $('.dynamic-slide-colors').on('click', 'input', function () {
          $(this).parent().addClass('active').siblings().removeClass('active').parents('.dynamic-slide').children('.dynamic-slide-bg').css('background-color', $(this).val());
          if ($(this).attr('data-floor') != 'false') {
          	$(this).parent().parents('.dynamic-slide').children('.dynamic-slide-floor').css('opacity', '1');
          } else {
          	$(this).parent().parents('.dynamic-slide').children('.dynamic-slide-floor').css('opacity', '0');
          }
        });

        $('.card-services-list-item-info').on('click', '.card-services-list-item-info-desc', function (e) {
          if($(this).has(e.target).length === 0) {
            $('.card-services-list-item-info-desc').not(this).removeClass('active');
            $(this).toggleClass('active');
          }
        });

        $('.card-services-list-item-info-desc').on('click', '.close-btn', function() {
          $(this).parent().parent().toggleClass('active');
        });
      }
    },
    cartPage: {
      init: function init() {
        $('.cart-result-order').on('click','.cart-result-order-btn', function (event) {
          event.preventDefault();
          $(this).parents('.cart-wrapper').addClass('activeOrder');

          for (var i = 0; i <= $(this).parents('.cart-block-wrapper').find('.cart-block').find('.cart-table-body').children('.cart-tr').length; i++) {
            $('.cart-block').find('.cart-table-body').children('.cart-tr').eq(i).find('.order-count').html(' x' + $('.cart-block').find('.cart-table-body').children('.cart-tr').eq(i).find('.buy-count-block > input').val().split(' ')[0]).find('.cart-goods-price .price-val').html($('.cart-block').find('.cart-table-body').children('.cart-tr').eq(i).find('.cart-td-summ .price-val').html());
          }
        });
      }
    },
    whereBuy: {
      init: function init() {
        $('.where-buy-list-item-name').on('click', function () {
          $(this).parent().toggleClass('active');
        });

        /*$('.where-buy-list').mCustomScrollbar({
          axis: 'y',
          theme: 'gray-theme'
        });*/
      }
    }
  }
};

var siteTables =  {
  init: function init() {
    if($('.news-inner-block-text table').length) {
      $('.news-inner-block-text table').each(function() {
        $(this).wrap('<div class="site-table_wrap"></div>');
      });
    }
  }
};

window.addEventListener('DOMContentLoaded', function () {
  kokoc.init();
  siteTables.init();
  $(document).foundation();
});

$(document).ready(function () {
  $('.card-options-result-one-click-btn.site-btn').on('click', function (e) {
    e.preventDefault();
    $('#popup-oneclick').css({'display': 'block'});
  });

  /*$('.card-services-list-item-btn').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().parent().next().addClass('fancybox-content');
  });*/


    $('.card-services-description.padding_top').mCustomScrollbar({
        theme: "my-theme"
    });

    $(document).on('click', '.kokoc-widget_link', function() {
      console.log('widget click');
      $('body').addClass('overlay_overflow');
    });

    $(document).on('click', '.kokoc-dialog-close', function(e) {
      e.preventDefault();
      $('body').removeClass('overlay_overflow');
    });
   /* $(document).on('click', 'overlay_overflow', function (e){ // событие клика по веб-документу
      var div = $(".kokoc-dialog.is-active");
      if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('body').removeClass('overlay_overflow'); // скрываем его
  }
  });*/
  $(document).on('click', '.overlay_overflow', function (e){ // событие клика по веб-документу
    if ($('.kokoc-dialog').hasClass('is-active') !== true) {
      $('body').removeClass('overlay_overflow'); // скрываем его
    }

  });

  });

