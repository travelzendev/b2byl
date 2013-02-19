head.ready(function(){

    var cols2 = [
        {field:"logo",title:"公司LOGO"},
        {field:"name",title:"公司名称"},
        {field:"remark",title:"备注"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#company_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:company_data,
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
