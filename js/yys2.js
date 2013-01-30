head.ready(function(){

    function editor_with_textarea(c,o){
        $('<textarea style="width:200px;height:50px" class="k-textbox" name="'+o.field+'" data-bind="value:'+o.field+'"></textarea>').appendTo(c);
    };

    var edit = '<a class="k-button k-button-icontext k-grid-edit" href="#"><span class="k-icon k-edit"></span>编辑</a><a class="k-button k-button-icontext k-grid-delete" href="#"><span class="k-icon k-delete"></span>删除</a>'

    var cols2 = [
        {field:"name",title:"证件名称"},
        {field:"required",title:"提供情况"},
        {field:"detail",title:"说明",editor:editor_with_textarea},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#stzl_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:stzl_data,
            schema: {
                model:{
                    fields:{
                        name:{type:'text'},
                        require:{type:'text'},
                        detail:{type:'text'},
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
