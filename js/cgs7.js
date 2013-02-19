head.ready(function(){

    var submited = store.get('cgs_submited_data');

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

    kendo.init('#query_block');

    $('#filter_grid').kendoDropDownList();

    $('.numerictextbox').kendoNumericTextBox({
        format:"#"
    });


    var flag = 0;
    $('#more_condition').click(function(){
        if(flag++%2==0){
            $(this).find('.k-icon').attr('class','k-icon k-i-arrow-n');
        }else{
            $(this).find('.k-icon').attr('class','k-icon k-i-arrow-s');
        }

        $('#more_condition_wrapper').toggle();
    });

    var action_tpl = kendo.template($("#action_tpl").html());
    var cols2 = [
        {field:'order_num',title:'订单号'},
        {field:'line_name',title:'航线名称'},
        {field:'cabin_count',title:'舱位数'},
        {field:'psr_count',title:'人数'},
        {field:'departure_date',title:'出发日期'},
        {field:'book_date',title:'预订日期'},
        {field:'order_total',title:'订单总价'},
        {field:'order_return',title:'返佣'},
        {field:'order_status',title:'状态'},
        {field:'psrinfo_status',title:'旅客资料'},
        {field:'material_status',title:'实体资料'},
        {field:'attachment_count',title:'附件'},
        {title:'操作',template:action_tpl,width:480}
    ];

    $("#order_grid").kendoGrid({
        scrollable:false,
        dataSource:{
            data:order_info,
            schema: {
                model:{
                    fields:{
                        adt_amount:{},
                    }
                }
            }
            // pagesize:10
        },
        columns:cols2,
        // editable:true,
        // groupable: true,
        // sortable: true,
        // pageable: {
        //     refresh: true,
        //     pageSizes: true
        // },
    });

});
