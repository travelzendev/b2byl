head.ready(function(){

    var submited = order_info_detail;
    $.extend(order_info_detail,store.get('order_submited'));

    //修改输入框样式
    $('.block input').attr('readonly',true).css('border','none');
    $('.block select').attr('readonly',true);

    var cols2 = [
        {field:"name",title:"产品名称"},
        {field:"price",title:"单价"},
        {field:"count",title:"数量"},
        {field:"",title:"小计",template:'#= data.price * data.count  #'},
    ];

    $("#total_info").kendoGrid({
        scrollable:false,
        dataSource:{
            data:submited.source,
        },
        columns:cols2,
    });

    var viewModel = kendo.observable(submited);
    kendo.bind($(".content"), viewModel);

    viewModel.bind('change',function(e){
        // console.log(e);
    });


});
