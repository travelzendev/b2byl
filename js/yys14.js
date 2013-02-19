head.ready(function(){

    var windows = $("#window");
    var kendo_window = windows.kendoWindow({
        width:'500px',
        modal:true,
        visible:false
    }).data("kendoWindow").center();

    $('#add_cgs').bind('click',function(){
        kendo_window.title('添加采购商');
       kendo_window.open();
    });

    var cols = [
        {field:"name",title:"名称"},
        {field:"type",title:"客户类型"},
        {field:"shortname",title:"公司简称"},
        {field:"position",title:"所在省市"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#cgsinfo_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:cgsinfo_data,
            schema: {
                model:{
                    fields:{
                        name:{type:'text'},
                        moban:{type:'text'},
                        yangtu:{type:'text'},
                    }
                }
            }
        },
        columns:cols,
        editable:'inline',
        // groupable: true,
        // sortable: true,
    });

    var cols2 = [
        {field:"name",title:"采购商名称"},
        {field:"rebate",title:"返佣比"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#kcxx_data").kendoGrid({
        scrollable:false,
        dataSource:{
            data:cgsinfo_data,
            schema: {
                model:{
                    fields:{
                        name:{editable:false}
                    }
                }
            }
        },
        columns:cols2,
        editable:'popup',
        // groupable: true,
        // sortable: true,
    });

});
