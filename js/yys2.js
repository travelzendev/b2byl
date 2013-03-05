head.ready(function(){

    function editor_with_textarea(c,o){
        $('<textarea style="width:200px;height:50px" class="k-textbox" name="'+o.field+'" data-bind="value:'+o.field+'"></textarea>').appendTo(c);
    }

    function editor_required(c,o){
        var html = "<input type='radio' data-bind='checked:"+o.field+"' value='1' name='"+o.field+"'>必须&nbsp;&nbsp;<input type='radio' data-bind='checked:"+o.field+"' value='0' name='"+o.field+"'>酌情"
        c.append(html);
    }

    var cols = [
        {field:"name",title:"证件名称"},
        {field:"required",title:"提供情况",editor:editor_required,
            template:'# if(required){ #  必须  # }else{#  酌情 # } #'},
        {field:"detail",title:"说明",editor:editor_with_textarea,template:'#= data.detail&&detail.replace(/\\n/g,"<br>") #'},
        {title:"操作",
            command: [
                {name:"edit",text:{title:"123",edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#stzl_data").kendoGrid({
        // scrollable: {
        //     virtual: true
        // },
        // sortable: true,
        // groupable: true,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:stzl_data,
            schema: {
                model:{
                    id:"name",
                    fields:{
                        name:{type:'text'},
                        required:{type:'number'},
                        detail:{type:'text'}
                    }
                }
            }
        },
        columns:cols,
        editable:{
            mode:'popup',
            confirmation:'确定要删除这条记录么？'
        }
    });

});
