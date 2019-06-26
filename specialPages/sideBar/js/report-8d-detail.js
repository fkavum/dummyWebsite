/*-initialize---------------------------------------------------------------------------------------------------------*/
$.fn.datetimepicker.Constructor.Default = $.extend(
  {},
  $.fn.datetimepicker.Constructor.Default,
  {
    locale: 'tr',
    icons: {
      time: 'mdi mdi-clock-outline',
      date: 'mdi mdi-calendar',
      up: 'mdi mdi-chevron-up',
      down: 'mdi mdi-chevron-down',
      previous: 'mdi mdi-chevron-left',
      next: 'mdi mdi-chevron-right',
      today: 'mdi mdi-calendar-check',
      clear: 'mdi mdi-delete-outline',
      close: 'mdi mdi-close'
    }
  }
);
let form_elements = $('input,textarea,select');
$(function() {
  $.each(form_elements, function() {
    let placeholder =
      $.trim(
        $(this)
          .parents('.input-container')
          .find('label')
          .text()
      ) + ' bilgisini giriniz.';
    let name = $(this).attr('id');
    $(this)
      .not('#subject')
      .attr('placeholder', placeholder)
      .attr('name', name);
  });
  // $('#status_date, #interim_app_date, #imp_perm_date, #prevent_date,#close_date').datetimepicker({
  //     format: 'YYYY-MM-DD',
  // });

  let dates = [
    '#status_date',
    '#interim_app_date',
    '#imp_perm_date',
    '#prevent_date',
    '#close_date'
  ];
  $.each(dates, function(i, val) {
    var date = moment($(val).val(), 'YYYY-MM-DD').toDate();
    $(val).datetimepicker({
      format: 'YYYY-MM-DD',
      date: date
    });
  });
});

/*-anchor scroll------------------------------------------------------------------------------------------------------*/
var lastId,
  topMenu = $('.sticky-anchor'),
  topMenuHeight = topMenu.outerHeight(),
  menuItems = topMenu.find('a'),
  scrollItems = menuItems.map(function() {
    var item = $($(this).attr('href'));
    if (item.length) {
      return item;
    }
  });

menuItems.click(function(e) {
  var href = $(this).attr('href'),
    offsetTop = href === '#' ? 0 : $(href).offset().top;
  $('html, body')
    .stop()
    .animate(
      {
        scrollTop: offsetTop
      },
      500
    );
  e.preventDefault();
});

$(window).scroll(function() {
  var fromTop = $(this).scrollTop() + 100;
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop) return this;
  });
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : '';

  if (lastId !== id) {
    lastId = id;
    menuItems
      .removeClass('active')
      .parent()
      .end()
      .filter("[href='#" + id + "']")
      .addClass('active');
  }
});
/*-dom----------------------------------------------------------------------------------------------------------------*/
let dcxAppend = function() {
  $('#team_member_container')
    .clone()
    .insertBefore($('#append_button'));
};
/*-xhr----------------------------------------------------------------------------------------------------------------*/
let dcxButton = function() {
  console.log('You have just pressed this beautiful button.');
};
