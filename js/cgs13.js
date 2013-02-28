head.ready(function(){

    $.extend(order_info_psr_stzl, {
        count_psr:0,
        count_visa:0,
        count_insurance:0,
    });

    var viewModel = kendo.observable(order_info_psr_stzl);

    window.pviewModel = viewModel;

    var passenger_info_tpl = kendo.template($('#passenger_info_wrap_tmpl').html());
    $('#passenger_info').append(passenger_info_tpl({room_info:viewModel.room_info}));

    kendo.bind($(".content"), viewModel);


    $('#submit').bind('click',function(e){
        e.preventDefault();
        //存储在本地，不提交
        var submited = viewModel.toJSON();
        store.set('order_submited',submited);

        // console.log(submited);
    });

});
