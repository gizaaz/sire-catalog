jQuery(document).ready(function($) {
	$('input[type=tel]').each(function(index, el) {
		$(el).mask('+7 (999) 999-99-99');
	});
});

jQuery(document).ready(function($) {
	$('.sort-block-item-content').on('click', '.sort-block-sorting-item', function(event) {
	  event.preventDefault();

			$('.sort-block-sorting-item').removeClass('active');
			$(this).addClass('active');
	});

});
$(document).ready(function () {
	$('.color-spectrum-tabs-mobile').on('click', function () {
		$(this).toggleClass('chevrone-up');
	});

	$(document).on('click', '.fancybox-is-modal.fancybox-is-open', function(e) {
		console.log('oks');
		if(!$(this).find('.fancybox-content').is(e.target) && $(this).find('.fancybox-content').has(e.target).length === 0) {
			$.fancybox.close();
		}
	});

});
$('document').ready(function(){
	$('input[name="colors"]').click(function(){
		var color = $(this).val();
		$.each($('input[value="'+ color +'"]'), function() {
			if (!$(this).hasClass('clicked')) {
				$(this).addClass('clicked');
				$(this).click();
			}
		});
		$.each($('input[name="colors"].clicked'), function() {
			if (color != $(this).val()) {
				$(this).removeClass('clicked');
			}
		});
	});
	if ($('input[name="show_info"]').val() == 1) {
		var date = new Date();
		var year =2019;
		year = date.getFullYear();
		$('.card-options-result-bottom').after('<div class="text-after-all">* цена стандартного полотна без учета фурнитуры, стекла и наценки за покрытие актуальна до конца '+year+' года</div>');
	} else {
        $('.card-options-result-bottom').addClass('normalize-card-bottom');
    }
});

function fancybox_close(elem) {
	setTimeout(function(){
		console.log('show');
		$('.slick-slide div[data-crutch-close]').show();
	}, 400);
}

$(document).ready(function () {
    $('.popup-form .popup-form-btn').on('click', function () {
        if ($('.popup-form .city').text() == '') {
            $('.popup-form .city').addClass('field-error');
        } else {
            $('.popup-form .city').removeClass('field-error');
        }
    });
	$(".fancy-glass").fancybox({
		'showCloseButton': true,
		'overlayShow': true,
		'overlayColor': '#333',
		'opacity': true
});
$(".fancy-color").fancybox({
	'showCloseButton': true,
	'overlayShow': true,
	'overlayColor': '#333',
	'opacity': true
});
});
