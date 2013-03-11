head.ready(function(){

    var cols2 = [
        {title:"客舱类型",field:'cabin'},
        {title:"房型",field:'room'},
        {title:"可入住人数",field:'max'},
        {title:"×代理价格 元/张",field:'acting_price'},
        {title:"×客舱价格 元/张",field:'price'},
        {title:"×单房差系数",field:'coefficient'},
        {title:"×总张数",field:'count',format:'n0',template:"#= count #"},
        {title:"房间号",field:'room_num',template:"<a href='javascript:;'>查看</a>"},
        {title:"操作",
            command: [
                {name:"edit",text:{edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#cabin_price_data").kendoGrid({
        scrollable:false,
        dataSource:{
            data:cabin_price_data,
            schema: {
                model:{
                    id:'room',
                    fields:{
                        cabin:{editable:false},
                        room:{editable:false},
                        max:{editable:false},
                        room_num:{editable:false},
                        acting_price:{type:'number'},
                        price:{type:'number'},
                        coefficient:{type:'number'},
                        count:{type:'number'}
                    }
                }
            }
        },
        columns:cols2,
        editable:{
            mode:'popup',
            template:kendo.template($('#room_price_tmpl').html())
        },
        edit:function(e){
            var count = $(e.container).find('#room_count').data('kendoNumericTextBox');
            count.bind('spin',function(i){
                var that = i.sender;
                var val = that._value;
                var len = $(e.container).find('.room_num').size();

                if(val>=len){
                    e.model.room_num.push({id:''});
                }else{
                    e.model.room_num.pop();
                };

                kendo.bind('#roomcount',e.model.room_num);
            });
        }
    });

});
