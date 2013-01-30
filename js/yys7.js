head.ready(function(){

    var windows = $("#window");
    var kendo_window = windows.kendoWindow({
        width:'500px',
        modal:true,
        visible:false
    }).data("kendoWindow").center();

    $('#add_cabin').bind('click',function(){
        kendo_window.title('舱型设置');
       kendo_window.open();
    });

    var cols = [
        {field:"name",title:"可入住人数"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#cabin_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:cabin_data,
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
        {field:"cabin",title:"舱型"},
        {field:"room",title:"房型"},
        {field:"room_intro",title:"客舱描述"},
        {field:"floor",title:"楼层"},
        {field:"acreage",title:"面积"},
        {field:"window",title:"窗户"},
        {field:"bed",title:"床型"},
        {field:"max",title:"可入住人数"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#kcxx_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:kcxx_data,
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
        columns:cols2,
        editable:'popup',
        // groupable: true,
        // sortable: true,
    });

});
