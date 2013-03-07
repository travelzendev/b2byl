head.ready(function(){

    function editor_with_textarea(c,o){
        $('<textarea style="width:200px;height:50px" class="k-textbox" name="'+o.field+'" data-bind="value:'+o.field+'"></textarea>').appendTo(c);
    }

    var cols = [
        {field:"name",title:"公司名称",template:'<center><div><img src="#= data.picture#" width="120" height="50"  /></div><div>#= data.name #</div></center>',width:140},
        {field:"remark",title:"备注",editor:editor_with_textarea,template:"#= data.remark && data.remark.replace(/\\n/g,'<br>') #"},
        {title:"操作",
            command: [
                {name:"edit",text:{title:"123",edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
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
                id:'name',
                model:{
                    fields:{
                        name:{type:'text',defaultValue:''},
                        remark:{type:'text',defaultValue:''},
                        picture:{type:'text',defaultValue:'http://b2b.10106266.com/img/dt/logo.png'}
                    }
                }
            }
        },
        columns:cols,
        editable:{
            // template:kendo.template($('#edit_template').html()),
            mode:'popup',
            confirmation:'确定要删除这条记录么？'
        },
        edit:function(e){
            // $(e.container).parent().find('.k-edit-field').eq(-1).hide();
            $(e.container).parent().find('.k-edit-field').eq(0).after('<div class="k-edit-label"><label for="picture">公司图片</label></div><div data-container-for="picture" class="k-edit-field"><input type="file" name="cruise_picture" data-bind="value:picture"></div>');
        }
    });

});
