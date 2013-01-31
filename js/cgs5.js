head.ready(function(){

    var submited = store.get('cgs_submited_data');

        console.dir(submited.others_info[0]);

    // $.extend(submited,contact_info,delivery_info,invoice_info);

    submited.contact_info = contact_info;
    submited.delivery_info = delivery_info;
    submited.invoice_info = invoice_info;


    $('.numerictextbox').kendoNumericTextBox({
        format:"#"
    });

    var cols2 = [
        {field:"line_name",title:"航线信息名称"},
        {field:"cruise_name",title:"所属邮轮"},
        {field:"cruise_id",title:"所属航次"},
        {field:"adt_amount",title:"成人数量",template:'<span data-bind="text:line_info.adt_amount"></span>'},
        {field:"chd_amount",title:"儿童数量",template:'<span data-bind="text:line_info.chd_amount"></span>'},
        {field:"total",title:"订单总价",template:'<span class="price">¥<b data-bind="text:additional_info.total"></b></span>/人'},
    ];

    $("#line_info").kendoGrid({
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
            // 兼容性问题
            // template: "¥#= kendo.toString(count*price) #",
        }
    ];


    $('#others_info').kendoGrid({
        dataSource: submited.others_info,
        columns:cols3,
    });

    var viewModel = kendo.observable(submited);
    kendo.bind($(".content"), viewModel);

    viewModel.bind('change',function(e){
        // console.log(e);
    });

    $('#submit').bind('click',function(e){
        e.preventDefault();
        //存储在本地，不提交
       var submited = viewModel.toJSON();
       store.set('order_submited',submited);
       // console.log(submited);
    });

});
