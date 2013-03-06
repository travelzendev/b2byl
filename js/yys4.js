head.ready(function(){
    function editor_func(c,o){
        var html = "<input type='file' name='zl_"+o.field+"' />";
       c.append($(html));
    }

    var cols = [
        {field:"name",title:"名称"},
        {field:"moban",title:"模板",template:'#if (data.moban) {#<a class="fximg" href="#= moban #">#= moban #</a>#}else{# - #}#',editor:editor_func},
        {field:"yangtu",title:"样图",template:'#if (data.yangtu) {#<a class="fximg" href="#= yangtu #">#= yangtu #</a>#}else{# - #}#',editor:editor_func},
        {title:"操作",
            command: [
                {name:"edit",text:{title:"123",edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#moban_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:moban_data,
            schema: {
                model:{
                    id:'name',
                    fields:{
                        name:{type:'text'},
                        moban:{type:'text'},
                        yangtu:{type:'text'},
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
