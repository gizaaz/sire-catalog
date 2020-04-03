$("body").on("click", ".remove_img", function () {
    var id = ($(this).attr("data-id"));
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    console.log($('meta[name="csrf-token"]').attr('content'));
    $.ajax({
        type: 'POST',
        url: '/admin/product/image/delete',
        data: {id: id},
        success: function (data) {
            $(`img[data-id='${id}']`).remove();
        }
    });
});


$("body").on("click", ".close", function () {
    $(`span`).remove();
});

