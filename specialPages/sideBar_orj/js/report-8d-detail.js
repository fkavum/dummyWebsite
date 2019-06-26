/*-initialize---------------------------------------------------------------------------------------------------------*/
$.fn.datetimepicker.Constructor.Default = $.extend({}, $.fn.datetimepicker.Constructor.Default, {
    locale: 'tr',
    icons: {
        time: "mdi mdi-clock-outline",
        date: "mdi mdi-calendar",
        up: "mdi mdi-chevron-up",
        down: "mdi mdi-chevron-down",
        previous: 'mdi mdi-chevron-left',
        next: 'mdi mdi-chevron-right',
        today: 'mdi mdi-calendar-check',
        clear: 'mdi mdi-delete-outline',
        close: 'mdi mdi-close'
    }
});
let form_elements = $('input,textarea,select');
$(function () {
    $.each(form_elements, function () {
        let placeholder = $.trim($(this).parents('.input-container').find('label').text()) + ' bilgisini giriniz.';
        let name = $(this).attr('id');
        $(this).not('#subject').attr('placeholder', placeholder).attr('name', name);
    });
    // $('#status_date, #interim_app_date, #imp_perm_date, #prevent_date,#close_date').datetimepicker({
    //     format: 'YYYY-MM-DD',
    // });

    let dates = ['#status_date', '#interim_app_date', '#imp_perm_date', '#prevent_date', '#close_date'];
    $.each(dates, function (i, val) {
        var date = moment($(val).val(), 'YYYY-MM-DD').toDate();
        $(val).datetimepicker({
            format: 'YYYY-MM-DD',
            date: date
        });
    });
})

/*-anchor scroll------------------------------------------------------------------------------------------------------*/
var lastId,
    topMenu = $(".sticky-anchor"),
    topMenuHeight = topMenu.outerHeight(),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 500);
    e.preventDefault();
});

$(window).scroll(function(){
    var fromTop = $(this).scrollTop()+100;
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
            return this;
    });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        menuItems
            .removeClass("active").parent()
            .end().filter("[href='#"+id+"']").addClass("active");
    }
});
/*-dom----------------------------------------------------------------------------------------------------------------*/
let append_member = function () {
    $('#team_member_container').clone().insertBefore($('#append_button'))
};
/*-xhr----------------------------------------------------------------------------------------------------------------*/
let update_8d = function () {
    $('.has-error').removeClass('has-error');
    $('span.text-danger s-12').remove();
    let form = new FormData(document.getElementById('eight-d-form'));
    let btn_submit = $('button#btn-update-8d');
    btn_submit.html(spinner).addClass('disabled').prop('disabled', true);
    $.ajax({
        type: 'POST',
        url: '/report/8d/update',
        dataType: 'json',
        data: form,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.exception == null) {
                btn_submit.html('<i class="mdi mdi-check"></i> Başarılı');
                setTimeout(function () {
                    btn_submit.html('Kaydet').removeClass('disabled').prop('disabled',false);
                }, 1000);
            } else {
                $.each(response.exception.exception, function (key, value) {
                    switch (key) {
                        case 'required':
                            $.each(value, function (subkey, subvalue) {
                                $('#' + subvalue).addClass('has-error')
                                    .parents('.input-group').find('.input-group-text').addClass('has-error')
                                    .parents('.col-lg-12,.col-lg-6,.col-lg-3').append('<span data-type="exception" class="text-danger s-12"> Zorunlu alan. </span>');
                            });
                            break;
                        case 'invalid_length':
                            $.each(value, function (subkey, subvalue) {
                                $('#' + subvalue).addClass('has-error')
                                    .parents('.input-group').find('.input-group-text').addClass('has-error')
                                    .parents('.col-lg-12,.col-lg-6,.col-lg-3').append('<span data-type="exception" class="text-danger s-12"> Çok uzun değer.</span>');
                            });
                            break;
                        case 'invalid_date':
                            $.each(value, function (subkey, subvalue) {
                                $('#' + subvalue).addClass('has-error')
                                    .parents('.input-group').find('.input-group-text').addClass('has-error')
                                    .parents('.col-lg-12,.col-lg-6,.col-lg-3').append('<span data-type="exception" class="text-danger s-12"> Geçersiz tarih formatı.</span>');
                            });
                            break;
                        case 'invalid_int':
                            $.each(value, function (subkey, subvalue) {
                                $('#' + subvalue).addClass('has-error')
                                    .parents('.input-group').find('.input-group-text').addClass('has-error')
                                    .parents('.col-lg-12,.col-lg-6,.col-lg-3').append('<span class="text-danger s-12"> Geçersiz sayısal değer.</span>');
                            });
                            break;
                        default:
                            console.log(value);
                    }
                });
                btn_submit.html('Hata');
                setTimeout(function () {
                    btn_submit.html('Yeniden Dene').prop('disabled',false).removeClass('disabled');
                }, 1500);
            }
        },
        error: function (response) {
            console.log(response);
            fwork_alert();
        }
    })
};