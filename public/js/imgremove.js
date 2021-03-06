$("body").on("click", ".remove_img", function () {
    var result = confirm("Видалити зображення?");
    if (result) {
        var id = ($(this).attr("data-id"));
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'POST',
            url: '/admin/product/image/delete',
            data: {id: id},
            success: function (data) {
                $(`img[data-id='${id}']`).remove();
            }
        });
    }
});

$("body").on("click", ".gallery_remove_img", function () {
    var result = confirm("Видалити зображення?");
    if (result) {
        var id = ($(this).attr("data-id"));
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'POST',
            url: '/admin/gallery/image/delete',
            data: {id: id},
            success: function (data) {
                $(`img[data-id='${id}']`).remove();
            }
        });
    }
});

$("body").on("click", ".remove_img_service", function () {
    var result = confirm("Видалити зображення?");
    if (result) {
        var id = ($(this).attr("data-id"));
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'POST',
            url: '/admin/service/image/delete',
            data: {id: id},
            success: function (data) {
                $(`img[data-id='${id}']`).remove();
            }
        });
    }
});

function destroy() {
    var result = confirm("Дійсно видалити?");
    if (result) {
        return true;
    } else {
        return false;
    }
}
