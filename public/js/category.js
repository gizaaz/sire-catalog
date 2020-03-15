jQuery(document).ready(function($) {
  $('#show_more').on('click', function(event) {
    event.preventDefault();
    next_page_selector = 'input[name=next_page]';
    next_page = $(next_page_selector).val();

    if (next_page.length > 0) {
      $('<div>').load(next_page+' .goods-list-wrapper', function() {
            $('.goods-list-wrapper .goods-list').append($(this).find('.goods-list-wrapper .goods-list').html());
            $(next_page_selector).val($(this).find(next_page_selector).val());
      });
    }
  });
});