head.ready(function(){

    var submited = store.get('cgs_submited_data');

    // $.extend(submited,contact_info,delivery_info,invoice_info);

    submited.contact_info = contact_info;
    submited.delivery_info = delivery_info;
    submited.invoice_info = invoice_info;

    $('#passenger_info').delegate('.psr_addpsr','click',function(){
        var t = $(this);
        var ele = eval('viewModel.'+t.closest('.psr_block').data('ele'));
        var prt = t.closest('.psr_block');
        if(ele.passenger_info.length >= ele.real) return;
        ele.passenger_info.push({
            psr_name:'',
            psr_visanumber:'',
            psr_birth:'',
            psr_gender:'male',
            psr_visa:0,
            psr_insurance:0,
            psr_id:ele.passenger_info.length+1
        });

        kendo.bind($(".content"), viewModel);

    });


    $('#passenger_info').delegate('.psr_delpsr','click',function(){
        var t = $(this);
        var ele = eval('viewModel.'+t.closest('.psr_block').data('ele'));
        var id = t.data('id');

        ele.passenger_info.splice(id-1,1);
        kendo.bind($(".content"), viewModel);
    });

    var viewModel = kendo.observable(submited);

    var passenger_info_tpl = kendo.template($('#passenger_info_wrap_tmpl').html());
    $('#passenger_info').append(passenger_info_tpl({room_info:viewModel.room_info}));

    kendo.bind($(".content"), viewModel);


    $('#submit').bind('click',function(e){
        e.preventDefault();
        //存储在本地，不提交
        var submited = viewModel.toJSON();
        store.set('order_submited',submited);

        location.href="cgs6.html";
        // console.log(submited);
    });



});
