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
        width:'500px',
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
        windows.html(tpl);
        kendo_window.title("上传附件");
        kendo_window.open();
    });

    $("body").delegate('.upload_certificate',"click", function(e) {
        e.preventDefault();
        var tpl = kendo.template($('#upload_certificate_window').html());
        windows.html(tpl);
        kendo_window.title("上传汇款凭证");
        kendo_window.open();
    });

    $("body").delegate('.refund',"click", function(e) {
        e.preventDefault();
        var tpl = kendo.template($('#refund_window').html());
        windows.html(tpl);
        kendo_window.title("申请退款");
        kendo_window.open();
    });


});
