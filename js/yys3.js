head.ready(function(){
    function editor_detail(c,o){

        var cols = $('<div id="movetree" class="clearfix"> <div class="movetree-col" id="col1">  </div> <div id="col-m"> <button> &laquo; </button> <br> <button> &raquo; </button><br> <button> &rsaquo; </button><br> <button> &lsaquo; </button> </div> <div class="movetree-col" id="col2">  </div> </div>');
        var col1 = cols.find('#col1');
        var col2 = cols.find('#col2');

        col1.kendoTreeView({
            dragAndDrop: true,
            dataSource: o.model.source
            // , dataTextField: [ "categoryName", "subCategoryName" ]
        });

        col2.kendoTreeView({
            dragAndDrop: true,
            dataSource: [{text:'新'}]
            // , dataTextField: [ "categoryName", "subCategoryName" ]
        });

        console.log(o);

        cols.appendTo(c);
    };

    var cols = [
        {field:"name",title:"分类名称"},
        {field:"count",title:"所需实体资料(份)"},
        {field:"detail",title:"详情",editor:editor_detail,template:'# var it = data.detail; if( it ) { var arr = it.split(","); data.count = arr.length; data.source = []; $.each(arr,function(idx,e){#   <div class="desc-item">  # data.source.push({text:e});  #   #= e #  </div>   # }); } #'},
        {title:"操作",
            command: [
                {name:"edit",text:{title:"123",edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                {name:"destroy",text:"删 除"}
            ]
        }
    ];

    $("#stzl_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:zlfl_data,
            schema: {
                id:'type',
                model:{
                    fields:{
                        type:{type:'text'},
                        count:{type:'number',editable:false},
                        detail:{type:'text'},
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
