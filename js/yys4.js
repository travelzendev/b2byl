head.ready(function(){

    var cols2 = [
        {field:"name",title:"名称"},
        {field:"moban",title:"模板"},
        {field:"yangtu",title:"样图"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#moban_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:moban_data,
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
