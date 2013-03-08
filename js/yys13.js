head.ready(function(){

    var submited = order_info_detail;
    order_info_detail.refund_info = refund_info;

    $.extend(order_info_detail,store.get('order_submited'));

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


    var windows = $("#window");
    var kendo_window = windows.kendoWindow({
        width:'600px',
        modal:true,
        visible:false,
        open:function(){
            // show_mask();
        },
        close:function(){
            // hide_mask();
        }
    }).data("kendoWindow").center();

    function show_mask(){
        $('body').append('<div id="popmask"></div>').addClass('flowhidden');
        $('html').addClass('flowhidden');
    }

    function hide_mask(){
        $('#popmask').remove();
        $('body').removeClass('flowhidden');
        $('html').removeClass('flowhidden');
    }

    $("body").delegate('.upload_attachment',"click", function(e) {
        e.preventDefault();
        var tpl = kendo.template($('#upload_attachment_window').html());
        kendo_window.setOptions({
            width:350
        });
        windows.html(tpl);
        // kendo_window.title("上传附件");
        kendo_window.center().open();
    });

    $("body").delegate('.change_price',"click", function(e) {
        e.preventDefault();
        var tpl = kendo.template($('#change_price_window').html());
        windows.html(tpl);
        kendo_window.setOptions({
            width:350
        });
        kendo_window.center().open();
        kendo.init('#window');
    });

    $("body").delegate('.refund',"click", function(e) {
        e.preventDefault();
        var tpl = kendo.template($('#refund_window').html());
        windows.html(tpl);
        kendo_window.setOptions({
            width:350
        });
        kendo_window.center().open();
        kendo.init('#window');
    });

    $("body").delegate('.action_log',"click", function(e) {
        e.preventDefault();
        var tpl = kendo.template($('#action_log_window').html());
        windows.html(tpl);

        kendo_window.setOptions({
            width:600
        });
        var cols = [
            {field:'time',title:'操作时间'},
            {field:'user',title:'操作用户'},
            {field:'ip',title:'IP地址'},
            {field:'type',title:'操作动作'},
            {field:'detail',title:'操作详情'}
        ];

        $("#action_log_div").kendoGrid({
            scrollable:false,
            dataSource:{
                data:action_log,
                schema: {
                    model:{
                        fields:{
                            name:{editable:false}
                        }
                    }
                }
            },
            columns:cols
        });

        kendo_window.title("申请退款");
        kendo_window.center().open();
    });

    $("body").delegate('.price_log',"click", function(e) {
        e.preventDefault();
        var tpl = kendo.template($('#price_log_window').html());
        windows.html(tpl);

        kendo_window.setOptions({
            width:600
        });

        var cols = [
            {field:'time',title:'操作时间'},
            {field:'user',title:'操作用户'},
            {field:'old',title:'修改前价格'},
            {field:'current',title:'当前价格'},
            {field:'remark',title:'原因说明'}
        ];

        $("#price_log_div").kendoGrid({
            scrollable:false,
            dataSource:{
                data:price_log,
                schema: {
                    model:{
                        fields:{
                            name:{editable:false}
                        }
                    }
                }
            },
            columns:cols
        });

        kendo_window.title("申请退款");
        kendo_window.center().open();
    });

});
