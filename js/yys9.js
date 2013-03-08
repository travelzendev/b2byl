head.ready(function(){

    function editor_with_textarea(c,o){
        $('<textarea style="width:200px;height:50px" class="k-textbox" name="'+o.field+'" data-bind="value:'+o.field+'"></textarea>').appendTo(c);
    }

    function editor_timepicker(c,o){
        var html = $('<div> <input date-role="timepicker" style="width:100px;" data-bind="value:'+o.field+'" name="'+o.field+'" /> </div>');
        var timepicker= html.find('input');

        timepicker.kendoTimePicker({
            // interval:1,
            change:function(e){
                // var val = e.sender.element.val();
                // o.model.arrival_time = val;
            }
        });

        c.append(html);
    }

    function editor_droplist(c,o){
        var html = $('<div> <select data-bind="value:'+o.field+'" name="'+o.field+'"></select> </div>');
        var droplist = html.find('select');

        if(o.field=="day_num"){
            var arr =[];
            var len = agenda_data.days;
            for (var i = 1; i<=len; i++){
                arr.push({text:'第'+i+'天',value:i})
            }

            droplist.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: arr
            });
        }


        if(o.field=="port"){
            droplist.kendoDropDownList({
                dataSource: agenda_data.port_available
            });
        }

        c.append(html);
    }

    var cols2 = [
        {title:'行程日期',field:'day_num',template:'<span class="fximg">&nbsp;</span> 第<b>${day_num}</b>天',editor: editor_droplist},
        {title:'停靠港口',field:'port',editor: editor_droplist},
        {title:'抵达时间',field:'arrival_time',editor:editor_timepicker,format:"{0:hh:mm}"},
        {title:'离开时间',field:'departure_time',editor:editor_timepicker,format:"{0:hh:mm}"},
        {title:'行程描述',field:'detail',editor:editor_with_textarea},
        {title:'备注',field:'remark',editor:editor_with_textarea},
        {title:"操作",
            command: [
                {name:"edit",text:{edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#agenda_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:agenda_data.source,
            schema: {
                model:{
                    id:'day_num',
                    fields:{
                        arrival_time:{type:'text'},
                        picture:{editable:false}
                    }
                }
            }
        },
        columns:cols2,
        editable:'popup'
        // groupable: true,
        // sortable: true,
    });
});
