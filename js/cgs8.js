head.ready(function(){

    var submited = store.get('order_submited');

    submited.refund_info = refund_info;
    submited.order_info_detail = order_info_detail;

    //修改输入框样式
    $('.block input').attr('readonly',true).css('border','none');
    $('.block select').attr('readonly',true);

    $('.numerictextbox').kendoNumericTextBox({
        format:"#"
    });

    var cols2 = [
        {field:"line_name",title:"航线信息名称"},
        {field:"departure_date",title:"出发日期"},
        {field:"cruise_name",title:"所属邮轮"},
        {field:"cruise_id",title:"所属航次"},
        {field:"adt_amount",title:"成人数量",template:'<span data-bind="text:line_info.adt_amount"></span>'},
        {field:"chd_amount",title:"儿童数量",template:'<span data-bind="text:line_info.chd_amount"></span>'},
        {field:"total",title:"订单总价",template:'<span class="price">¥<b data-bind="text:additional_info.total"></b></span>/人'},
    ];

    $("#line_info").kendoGrid({
        scrollable:false,
        dataSource:{
            data:submited.line_info,
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

    var cols =  [
    {
        field: "room",
        title:"房型",
    },
    {
        field: "room_intro",
        title:"介绍",
    },
    {
        field: "room_id",
        title:"房型编号",
    },
    {
        field: "price",
        title:"价格/人",
        format:'¥{0}'
    },
    {
        field: "roomcount",
        title:"房间数",
    },
    {
        title:"合计",
        template:'¥#= kendo.toString(roomcount*price) #'
    }
    ];

    $("#room_info").kendoGrid({
        scrollable:false,
        dataSource: submited.room_info,
        columns:cols,
        // groupable: true,
        // sortable: true,
        // pageable: {
        //     refresh: true,
        //     pageSizes: true
        // },
    });


    var cols3 = [
        {field:"name",title:"名称"},
        {field:"price",title:"单价",format:"¥{0}"},
        {field:"count",title:"份数"},
        {title:"小计",
            //兼容性问题
            // template: "¥#= kendo.toString(count*price) #",
        }
    ];


    $('#others_info').kendoGrid({
        scrollable:false,
        dataSource: submited.others_info,
        columns:cols3,
    });

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
