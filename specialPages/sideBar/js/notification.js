var not_seen_counter = $('[data-seen=0]').length;
$(function () {
    setTimeout(function () {
        check_unseen();
    },500);
})

$('#notification-container').on('shown.bs.dropdown', function (event) {
    setTimeout(function () {
        mark('all')
    },750);
})

let get_notifications = function (last) {
    event.stopPropagation();
    $('#load-ntf-more').html(spinner);
    last = last || "last";
    let controller = '/notification/get/' + last;
    let icon = ['information-outline','bullhorn-outline'];
    $.post({
        url: controller,
        data: {},
        dataType: "JSON",
        success: (response) => {
            $('#load-ntf-more').remove();
            let last_id;
            if (response.notification.length > 0) {
                $.each(response.notification, function (idx, item) {
                    let color = (item.is_seen == '0' ? 'text-success':'text-muted');
                    let marker = (item.is_seen == '0' ? 'circle-slice-8':'circle-outline');
                    var formattedDate = new Date(item.insert_date);
                    var d = formattedDate.getDate();
                    var m =  formattedDate.getMonth();
                    m += 1;
                    var y = formattedDate.getFullYear();
                    if (item.is_seen == '0') {++not_seen_counter;}
                    $('div.notification-window').append('' +
                        ' <div class="dropdown-item" id="notification-'+item.notification_id+'" ' +
                        'data-seen="'+item.is_seen+'" data-id="'+item.notification_id+'">' +
                        '     <div class="row '+color+'">' +
                        '         <div class="col-1 text-center align-self-center"><i class="s-22 mdi mdi-'+icon[item.type-1]+'"></i>' +
                        '         </div>' +
                        '         <div class="col-11 px-3 text-wrap pt-2"> '+item.text+'</div>' +
                        '         <div class="col-12 text-right"><small>'+d + "." + m + "." + y+'</small></div>' +
                        '         <i class="mdi mdi-'+marker+' notification-marker link" ' +
                        ' onclick="mark('+item.notification_id+')"></i>' +
                        '     </div>' +
                        ' </div>');
                    last_id = item.notification_id;
                });
            } else {
                $('div.notification-window').append('' +
                    ' <div class="dropdown-item">' +
                    '     <div class="row text-primary">' +
                    '         <div class="col-1 text-center align-self-center"><i class="s-22 mdi mdi-check"></i>' +
                    '         </div>' +
                    '         <div class="col-11 px-3 text-wrap pt-2"> Hiç bildiriminiz yok.</div>' +
                    '         <div class="col-12 px-3 text-right"></div>' +
                    '     </div>' +
                    ' </div>');
            }
            if (response.notification.length > 7){
                $('div.notification-window').append(' <div class="dropdown-item text-center text-info" id="load-ntf-more">' +
                    '<i class="mdi mdi-dots-horizontal s-22" onclick="get_notifications('+last_id+')"></i>' +
                    '</div>');
            }
        },
        error: () => {}
    });
}

let mark = function (id){
    let controller = '/notification/mark';
    id = id || "all";
    $.post({
        url: controller,
        data: {id: id},
        dataType: "JSON",
        success: (response) => {
            let is_seen = $('div#notification-'+id).attr('data-seen');
            if (id != 'all') {
                if (is_seen == 0) {
                    $('div#notification-'+id).attr('data-seen','1')
                        .find('.row').removeClass('text-success').addClass('text-muted')
                        .find('.notification-marker').removeClass('mdi-circle-slice-8').addClass('mdi-circle-outline');
                    --not_seen_counter;
                } else {
                    $('div#notification-'+id).attr('data-seen','0')
                        .find('.row').addClass('text-success').removeClass('text-muted')
                        .find('.notification-marker').addClass('mdi-circle-slice-8').removeClass('mdi-circle-outline');
                    ++not_seen_counter;
                }
            } else {
                $('i.notification-marker').removeClass('mdi-circle-slice-8').addClass('mdi-circle-outline');
                $('div[id^=notification-]').attr('data-seen','1')
                    .find('.row').removeClass('text-success').addClass('text-muted');
                not_seen_counter = 0;
            }
            check_unseen();
        },
        error: () => {}
    });
}

let check_unseen = function () {
    if(not_seen_counter > 0 ) {
        $('a#notification .mdi-bell-outline').removeClass('mdi-bell-outline').addClass('mdi-bell-ring').addClass('text-warning');
    } else {
        $('a#notification .mdi-bell-ring').removeClass('mdi-bell-ring').addClass('mdi-bell-outline').removeClass('text-warning');
    }
}