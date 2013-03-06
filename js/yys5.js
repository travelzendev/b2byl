head.ready(function(){

    function editor_with_textarea(c,o){
        $('<textarea style="width:200px;height:50px" class="k-textbox" name="'+o.field+'" data-bind="value:'+o.field+'"></textarea>').appendTo(c);
    }

    var cols = [
        {field:"name",title:"邮轮名称",template:'<center><div><img src="#= data.picture#" width="120" height="50"  /></div><div>#= data.name #</div></center>',width:140},
        {field:"company",title:"所属公司"},
        {field:"rule",title:"规则条款",editor:editor_with_textarea,template:"#= data.rule && data.rule.replace(/\\n/g,'<br>') #"},
        {field:"remark",title:"备注",editor:editor_with_textarea,template:"#= data.remark && data.remark.replace(/\\n/g,'<br>') #"},
        {field:"id",title:"客舱信息"},
        {title:"操作",
            command: [
                {name:"edit",text:{title:"123",edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#jcxx_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:jcxx_data,
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
