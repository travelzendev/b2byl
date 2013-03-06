head.ready(function(){

    function editor_detail(c,o){

        var cols = $('<div id="movetree" class="clearfix"><div class="movetree-col"><h3 id="h3col1">选定实体资料</h3> <div id="col1">  </div> </div><div id="col-m"> <button id="addall"> &laquo; </button> <br> <button id="removeall"> &raquo; </button><br> <button id="add"> &lsaquo; </button><br> <button id="remove"> &rsaquo; </button> </div>  <div class="movetree-col"><h3 id="h3col1">未选实体资料</h3> <div id="col2">  </div> </div></div>');
        var col1 = cols.find('#col1');
        var col2 = cols.find('#col2');

        var addall = cols.find('#addall');
        var removeall = cols.find('#removeall');
        var remove = cols.find('#remove');
        var add = cols.find('#add');

        var tcol1 = col1.kendoTreeView({
            // dragAndDrop: true,
            dataSource: o.model.detail.toJSON()
            // , dataTextField: [ "categoryName", "subCategoryName" ]
        }).data('kendoTreeView');

        var options = zlfl_data.options.filter(function(i,e){
            var res = true;
            $.each(o.model.detail,function(i2,e2){
                if ( e2.text == i.text) {
                    res = false;
                    return false;
                }
            });

            return res;
        });

        var tcol2 = col2.kendoTreeView({
            // dragAndDrop: true,
            dataSource: options
            // , dataTextField: [ "categoryName", "subCategoryName" ]
        }).data('kendoTreeView');

        cols.appendTo(c);

        function removeSelected(ele){
            ele.select('.k-last');
        }

        add.bind('click',function(){
            var sel = tcol2.select();
            if( sel.length ){
                tcol1.append(sel);
                tcol2.remove(sel);
                removeSelected(tcol1);
                o.model.detail.push({text:sel.text()});
            }
        });
        remove.bind('click',function(){
            var sel = tcol1.select();
            var index = sel.index();
            if( sel.length ){
                tcol2.append(sel);
                tcol1.remove(sel);
                removeSelected(tcol2);
                o.model.detail.splice(index,1);
            }
        });
        addall.bind('click',function(){
            var sel = tcol2.select('.k-item');
            if( sel.length ){
                tcol1.append(sel);
                tcol2.remove(sel);
                removeSelected(tcol1);
            }
        });
        removeall.bind('click',function(){
            var sel = tcol1.select('.k-item');
            if( sel.length ){
                tcol2.append(sel);
                tcol1.remove(sel);
            }
            removeSelected(tcol2);
        });
    };

    var cols = [
        {field:"name",title:"分类名称"},
        {field:"count",title:"所需实体资料(份)"},
        {field:"detail",title:"详情",editor:editor_detail,template:'# var it = data.detail; if( it ) { data.count = it.length; $.each(it,function(idx,e){#   <div class="desc-item">  #= e.text #  </div>   # }); } #'},
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
            data:zlfl_data.data,
            schema: {
                model:{
                    id:'name',
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
