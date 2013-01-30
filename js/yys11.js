head.ready(function(){

    var cols2 = [
        {title:"客舱类型",field:'cabin'},
        {title:"房型",field:'room'},
        {title:"可入住人数",field:'max'},
        {title:"×代理价格 元/张",field:'acting_price'},
        {title:"×客舱价格 元/张",field:'price'},
        {title:"×单房差系数",field:'coefficient'},
        {title:"×能否加人",field:'can_be_added'},
        {title:"×剩余张数",field:'left_tickets'},
        {title:"编辑",width:'160px',command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#cabin_price_data").kendoGrid({
        dataSource:{
            data:cabin_price_data,
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
        editable:'inline',
        // groupable: true,
        // sortable: true,
    });

});
