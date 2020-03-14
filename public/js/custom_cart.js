var cart = {
  'add': function(product_id, quantity, isService) {
    $.ajax({
      url: 'index.php?route=checkout/wm_custom_cart/add',
      type: 'post',
      data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1) + '&is_service=' + (typeof(isService) != 'undefined' ? isService : 0),
      dataType: 'json',
      beforeSend: function() {
      },
      complete: function() {
      },
      success: function(json) {

        if (json['redirect']) {
          location = json['redirect'];
        }

        if (json['success']) {

          setTimeout(function () {
            $('#header-cart').load('index.php?route=common/cart/info #header-cart > *');
          }, 100);
		  $.fancybox.open($('.added-to-cart'));
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  'update': function(key, quantity) {
    $.ajax({
      url: 'index.php?route=checkout/wm_custom_cart/edit',
      type: 'post',
      data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
      dataType: 'json',
      beforeSend: function() {
      },
      complete: function() {
      },
      success: function(json) {

        setTimeout(function () {
          $.ajax({
            url: 'index.php?route=checkout/wm_custom_cart',
            type: 'GET',
            dataType: 'html',
            context: document.body,
            success: function (data) {

              var products = $(data).find('#product-table').html();
              $('#product-table').html(products);

              // var service = $(data).find('#service-table').html();
              // $('#service-table').html(service);

              var totalSumm = $(data).find('#total-summ').html();
              $('#total-summ').html(totalSumm);

              var headerCart = $(data).find('#header-cart').html();
              $('#header-cart').html(headerCart);
            }
          });

          // $('#header-cart').load('index.php?route=common/cart/info #header-cart > *');
        }, 100);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  'remove': function(key) {
    $.ajax({
      url: 'index.php?route=checkout/wm_custom_cart/remove',
      type: 'post',
      data: 'key=' + key,
      dataType: 'json',
      beforeSend: function() {
      },
      complete: function() {
      },
      success: function(json) {

        // var now_location = String(document.location.pathname);

        // if ((now_location == '/cart/') || (now_location == '/checkout/') || (getURLVar('route') == 'checkout/wm_custom_cart') || (getURLVar('route') == 'checkout/checkout')) {
        //  location = 'index.php?route=checkout/wm_custom_cart';
        // } else
        // }

        setTimeout(function () {
          $('#header-cart').load('index.php?route=common/cart/info #header-cart > *');
          $('#checkout-cart').load('index.php?route=checkout/wm_custom_cart #checkout-cart > *');
        }, 100);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  }
}
