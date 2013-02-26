head.ready(function(){

    var submited = store.get('cgs_submited_data');

    // $.extend(submited,contact_info,delivery_info,invoice_info);

    submited.contact_info = contact_info;
    submited.delivery_info = delivery_info;
    submited.invoice_info = invoice_info;


    $('.numerictextbox').kendoNumericTextBox({
        format:"#"
    });

    var viewModel = kendo.observable(submited);
    kendo.bind($(".content"), viewModel);

    $('#passenger_info').delegate('.add_passenger','click',function(){
        var room_info = viewModel.room_info;
    });

    viewModel.bind('change',function(e){
        console.log(e);
    });

    $('#submit').bind('click',function(e){
        e.preventDefault();
        //存储在本地，不提交
        var submited = viewModel.toJSON();
        store.set('order_submited',submited);
        console.log(submited);
    });

});
