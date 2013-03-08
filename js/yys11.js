head.ready(function(){

    var cols2 = [
        {title:"客舱类型",field:'cabin'},
        {title:"房型",field:'room'},
        {title:"可入住人数",field:'max'},
        {title:"×代理价格 元/张",field:'acting_price'},
        {title:"×客舱价格 元/张",field:'price'},
        {title:"×单房差系数",field:'coefficient'},
        {title:"×能否加人",field:'can_be_added',template:'#= can_be_added?"允许":"不允许" #',editor:function(c,o){
        var html = $('<div> <select data-bind="value:'+o.field+'" name="'+o.field+'"></select> </div>');
        var droplist = html.find('select');

            droplist.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{text:'允许',value:1},{text:'不允许',value:0}]
            });
        c.append(html);
        }},
        {title:"×剩余张数",field:'left_tickets',format:'n0',template:"${left_tickets}"},
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
                        acting_price:{type:'number'},
                        price:{type:'number'},
                        coefficient:{type:'number'},
                        left_tickets:{type:'number'}
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
