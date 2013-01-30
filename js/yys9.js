head.ready(function(){

    var cols2 = [
        {title:'&nbsp;',width:'90px',field:'picture',template:'<image src="${picture}" width="80" height="45" />'},
        {title:'行程日期',field:'day_num',template:'第<b>${day_num}</b>天'},
        {title:'停靠港口',field:'port'},
        {title:'抵达时间',field:'arrival_time'},
        {title:'离开时间',field:'departure_time'},
        {title:'行程描述',field:'detail'},
        {title:'备注',field:'remark'},
        {title:"编辑",width:'160px',command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]}
    ];

    $("#agenda_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:agenda_data,
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
