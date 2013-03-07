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

    $('.close-button').click(function(){
        kendo_window.close();
    });


    function editor_with_textarea(c,o){
        $('<textarea style="width:200px;height:50px" class="k-textbox" name="'+o.field+'" data-bind="value:'+o.field+'"></textarea>').appendTo(c);
    }

    function editor_droplist(c,o){
        var html = $('<div> <select data-bind="value:'+o.field+'" name="'+o.field+'"></select> </div>');
        var droplist = html.find('select');

        if(o.field=="cabin"){
            droplist.kendoDropDownList({
                dataTextField: "name",
                dataValueField: "name",
                dataSource: kcxx_data.cabin_data
            });
        }

        if(o.field=="max"){
            droplist.kendoDropDownList({
                dataTextField: "value",
                dataValueField: "value",
                dataSource: [{value:2},{value:3},{value:4}]
            });
        }

        if(o.field=="windows"){
            droplist.kendoDropDownList({
                dataTextField: "value",
                dataValueField: "value",
                dataSource: [{value:'有'},{value:'无'}]
            });
        }

        if(o.field=="bed"){
            droplist.kendoDropDownList({
                dataTextField: "value",
                dataValueField: "value",
                dataSource: [{value:'单床'},{value:'双床'}]
            });
        }

        c.append(html);
    }

    var cols = [
        {field:"name",title:"可入住人数"},
        {title:"操作",
            command: [
                {name:"edit",text:{edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#cabin_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:kcxx_data.cabin_data,
            schema: {
                model:{
                    id:'name'
                }
            }
        },
        columns:cols,
        editable:{
            // template:kendo.template($('#edit_template').html()),
            mode:'inline',
            confirmation:'确定要删除这条记录么？'
        }
    });

    var cols2 = [
        {field:"cabin",title:"舱型",editor:editor_droplist},
        {field:"room",title:"房型",template:'<span class="fximg">#= room #</span>'},
        {field:"floor",title:"楼层"},
        {field:"acreage",title:"面积(m2)"},
        {field:"windows",title:"窗户",editor:editor_droplist},
        {field:"bed",title:"床型",editor:editor_droplist},
        {field:"max",title:"可入住人数",editor:editor_droplist},
        {field:"room_intro",title:"客舱描述",editor:editor_with_textarea},
        {title:"操作",
            command: [
                {name:"edit",text:{title:"123",edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#kcxx_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:kcxx_data.source,
            schema: {
                model:{
                    id:'room',
                    fields:{
                        acreage:{type:'text',defaultValue:''},
                        windows:{type:'text',defaultValue:'有'},
                        bed:{type:'text',defaultValue:'双床'},
                        cabin:{type:'text',defaultValue:'内舱房'},
                        max:{type:'number',defaultValue:4},
                    }
                }
            }
        },
        columns:cols2,
        editable:{
            // template:kendo.template($('#edit_template').html()),
            mode:'popup',
            confirmation:'确定要删除这条记录么？'
        },
        edit:function(e){
            $(e.container).parent().find('.k-edit-field').eq(-2).after('<div class="k-edit-label"><label for="picture">图片</label></div><div data-container-for="picture" class="k-edit-field"><input type="file" name="cruise_picture" data-bind="value:picture"></div>');
        }
    });

});
