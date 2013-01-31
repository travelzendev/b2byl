head.ready(function(){
    store.clear();

    $('.numerictextbox').kendoNumericTextBox({
        format:"#"
    });

    var cols2 = [
        {field:"name",title:"名称"},
        {field:"price",title:"单价",format:"¥{0}"},
        {field:"count",title:"份数",
            template: "<span class='pseudo_input'>${count}</span>",
        },
        {title:"小计",
            template: "¥#= kendo.toString(count*price) #",
        },
        {title:"选择"}
    ];

    $("#yl_detail_calc").kendoGrid({
        dataSource:{
            data:cgs_data.others_info,
            schema: {
                model:{
                    fields:{
                        count:{type:"number",editable:true,validation:{min:0}},
                        price:{editable:false,type:"number"},
                        total:{editable:false,type:'number'},
                        selected:{editable:false,type:'boolean'}
                    }
                }
            }
            // pagesize:10
        },
        columns:cols2,
        editable:true,
        // groupable: true,
        // sortable: true,
        // pageable: {
        //     refresh: true,
        //     pageSizes: true
        // },
    });

    var cols =  [
        {
        field: "cabin",
        title: "舱型",
    },
    {
        field: "room",
        title:"房型",
    },
    {
        field: "floor",
        title:"楼层",
    },
    {
        field: "acreage",
        title:"面积（m2）",
    },
    {
        field: "windows",
        title:"窗户",
    },
    {
        field: "bed",
        title:"床型",
    },
    {
        field: "price",
        title:"价格/人",
    },
    {
        field: "max",
        title:"可入住人数",
    },
    {
        field: "real",
        title:"实际入住人数",
        template: "<span class='pseudo_input'>${real}</span>",
    },
    {
        field: "roomcount",
        title:"房间数",
        template: "<span class='pseudo_input'>${roomcount}</span>"
    },
    {
        field: "selected",
        width: 40,
        title:"选择",
        template: "${selected}"
    }];

    $("#yl_detail_info").kendoGrid({
        dataSource:{
            data:cgs_data.room_info,
            group: { field: "cabin" },
            schema: {
                model:{
                    fields:{
                        cabin:{editable:false},
                        floor:{editable:false},
                        acreage:{editable:false},
                        windows:{editable:false},
                        bed:{editable:false},
                        price:{editable:false},
                        max:{editable:false},
                        real:{editable:true,type:"number",validation:{min:0}},
                        roomcount:{editable:true,type:"number",validation:{min:0}},
                        selected:{type:'boolean'}
                    }
                }
            }
            // pagesize:10
        },
        columns:cols,
        editable:true,
        // groupable: true,
        // sortable: true,
        // pageable: {
        //     refresh: true,
        //     pageSizes: true
        // },
    });

    var viewModel = kendo.observable(cgs_data);
    kendo.bind($(".content"), viewModel);

    viewModel.bind('change',function(e){
        // console.log(e);
    });

    $('#submit').bind('click',function(e){
        e.preventDefault();
        //存储在本地，不提交
       var submited = viewModel.toJSON();

        store.set('cgs_submited_data', submited);

        location.href="cgs5.html";
        // console.log(submited);
    });

});
