$(function () {
    // if (location.pathname != '/login') $.getScript( "/assets/"+location.host+"/js/notification.js");
    //  autoloader
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({
        trigger: 'hover'
    });
    // $('[data-toggle="popover"]').on('click', function (e) {
    //     $('[data-toggle="popover"]').not(this).popover('hide');
    // });
    // navbar effects
    let page = $('.page');
    let root_navbar_item = page.attr('data-root');
    let sub_navbar_item = page.attr('data-page');
    if (typeof root_navbar_item !== "undefined") $('a#' + root_navbar_item).parent().addClass('active');
    if (typeof sub_navbar_item !== "undefined") {
        $('a[data-page=' + sub_navbar_item + ']').addClass('active');
    }

    $('#navbar-modal').detach().appendTo('body');
});

document.addEventListener('swiped-left', function(e) {
    if ($(e.target).parents('.table-responsive').length < 1) {
        $('#navbar-modal').modal('show');
    }
});

document.addEventListener('swiped-right', function(e) {
    if ($(e.target).parents('#navbar-modal').length > 0) {
        $('#navbar-modal').modal('hide');
    }
});


$('#filter-modal .modal-content').css('height',($( window ).height()*1.1 - 100));
$('#navbar-modal .modal-content').css('height',($( window ).height()*1.1));
$('#navbar-modal .modal-body').css('height',($( window ).height()*1.1 - 155));

$('#bottom-navbar .nav-item').on('show.bs.dropdown', function () {
    $('.container-fluid').addClass('blur');
});
$('#bottom-navbar .nav-item').on('hide.bs.dropdown', function () {
    $('.container-fluid').removeClass('blur');
});
$('#top-navbar .nav-item').on('show.bs.dropdown', function () {
    $('.container-fluid,#bottom-navbar').addClass('blur');
});
$('#top-navbar .nav-item').on('hide.bs.dropdown', function () {
    $('.container-fluid,#bottom-navbar').removeClass('blur');
});
/* /navbar effects */

/* /loader effects */

let spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

let start_loader = function () {
    let loader = '<div class="spinner-border page-loader" role="status"></div>';
    $('.page').addClass('blur freeze-cursor overflow-hidden');
    $('body').prepend(loader);
};

let stop_loader = function () {
    $('.page-loader').remove();
    $('.page').removeClass('blur freeze-cursor overflow-hidden');
}

/* checkbox actions */
const checkboxes = document.querySelectorAll('thead > tr > th > input[type=checkbox]');
for (let checkbox of checkboxes) {
    checkbox.addEventListener('click', (event) => {
        $(event.target).closest('thead').next('tbody').find('tr > td > input[type=checkbox]')
            .prop('checked', event.target.checked)
            .change();
        for (var i = 0; i < checkboxes.length; i++) checkboxes[i].classList.remove('checkbox-material-part');
    });
}

const td_checkboxes = document.querySelectorAll('tbody tr > td > input[type=checkbox]');
for (let checkbox of td_checkboxes) {
    checkbox.addEventListener('click', (event) => {
        $(event.target).closest('table').find('thead tr > th > input[type=checkbox]:checked')
            .addClass("checkbox-material-part")
            .change();
    });
}

/* row checbox counter */
const row_checkboxes = $('.box-container tbody > tr > td > input[type=checkbox]');
row_checkboxes.change(function (event) {
    let row_chk_checkboxes = $('.box-container tbody > tr > td > input[type=checkbox]:checked');
    if (row_chk_checkboxes.length > 0) {
        $(this).closest('.box-container')
            .find('span#multiple_action_counter')
            .text(row_chk_checkboxes.length)
            .parent()
            .removeClass('disabled');
    } else {
        $(this).closest('.box-container')
            .find('span#multiple_action_counter')
            .text(row_chk_checkboxes.length)
            .parent()
            .addClass('disabled');
    }

});

/* modal dynamic checbox counter */
const modal_checkboxes = $('.modal-content tbody > tr > td > input[type=checkbox]');
$(document).on("click", modal_checkboxes, function () {
    let modal_chk_checkboxes = $('.modal-content tbody > tr > td > input[type=checkbox]:checked');
    if (modal_chk_checkboxes.length > 0) {
        $(".modal-content tbody > tr > td > input[type=checkbox]")
            .closest('.modal-content')
            .find('span#multiple_action_modal_counter')
            .text(modal_chk_checkboxes.length)
            .parent()
            .removeClass('disabled');
    } else {
        $(".modal-content tbody > tr > td > input[type=checkbox]")
            .closest('.modal-content')
            .find('span#multiple_action_modal_counter')
            .text(modal_chk_checkboxes.length)
            .parent()
            .addClass('disabled');
    }
});

/* /checkbox actions */

/**
 *
 * @param event
 * @returns {boolean}
 *
 * @example $("input[type=number][max])").change(input_numerator_check);
 */

const input_numerator_check = (event) => {
    let element = event.target;

    let max = ~~$(element).attr('max');
    let min = ~~$(element).attr('min');
    let val = ~~$(element).val();

    if (isNaN(val)) val = min;

    if (min === undefined) min = 0;

    if (val >= min && val <= max) {
        $(element).val(val);
        return true;
    }
    if (val < min) {
        $(element).val(min);
        return false;
    }

    $(element).val(max);
    return false;
}

/**
 *
 * @param int
 * @param sliceChar
 * @returns {string}
 *
 * @example leading_zero(today.getMinutes(),2) -> leading_zero(5,2) => 05
 */
let leading_zero = (int, sliceChar = 2) => {
    return ("0" + int).slice(sliceChar * -1)
}

let fwork_alert = function (text, btn_report) {
    if ($('#fwork_alert').length) $('#fwork_alert').remove();
    console.log(text);
    text = text || 'Beklenmeyen bir hata ile karşılaşıldı. <br/>Lütfen bu sorunu bize bildirin.';
    btn_report = btn_report || '<br/> <a class="btn btn-outline-light mt-3" href="mailto:destek@map.com.tr?subject=otoedi.v3 | Beklenmeyen Hata"><i class="mdi mdi-email-plus-outline"></i> Bildir </a>';
    let modal_content = '<div class="modal fade" id="fwork_alert" tabindex="-1" role="dialog" aria-labelledby="fwork_alert"' +
        '     aria-hidden="true">' +
        '    <div class="modal-dialog modal-dialog-centered" role="document">' +
        '        <div class="modal-content bg-danger text-white">' +
        '            <div class="modal-header">' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '                    <span aria-hidden="true"><i class="mdi mdi-window-close"></i> </span>' +
        '                </button>' +
        '            </div>' +
        '            <div class="modal-body pt-2 pb-5">' +
        '                <div class="container-fluid">' +
        '                    <div class="text-center">' +
        '                        <p class="s-82"><i class="mdi mdi-alert-circle-outline"></i></p>' +
        text + btn_report +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    $('body').append(modal_content);
    $('#fwork_alert').modal('show');
}

/* /pagination  */
let paginate = (id, direction) => {
    let url = new URL(document.location);
    url.searchParams.set('direction',direction);
    url.searchParams.set('id',id);

    window.location.href = url.toString();
}