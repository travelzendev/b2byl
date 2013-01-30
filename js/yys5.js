head.ready(function(){

    var cols2 = [
        {field:"logo",title:"LOGO"},
        {field:"name",title:"邮轮名称"},
        {field:"company",title:"所属公司"},
        {field:"rule",title:"规则条款"},
        {field:"remark",title:"备注"},
        {field:"id",title:"客舱信息"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#jcxx_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:jcxx_data,
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
