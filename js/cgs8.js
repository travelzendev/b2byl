head.ready(function(){

    var submited = store.get('order_submited');

    submited.refund_info = refund_info;
    submited.order_info_detail = order_info_detail;

    //修改输入框样式
    $('.block input').attr('readonly',true).css('border','none');
    $('.block select').attr('readonly',true);


    var viewModel = kendo.observable(submited);
    kendo.bind($(".content"), viewModel);

    viewModel.bind('change',function(e){
        // console.log(e);
    });

    $('#submit').bind('click',function(){
        //存储在本地，不提交
       var submited = viewModel.toJSON();
       store.set('order_submited',submited);
       // console.log(submited);
    });


});
