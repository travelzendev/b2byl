head.ready(function(){

    var submited = store.get('order_submited');

    var viewModel = kendo.observable(submited);

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
