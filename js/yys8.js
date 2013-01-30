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

    var cols = [
        {field:"name",title:"可入住人数"},
        {title:"操作",command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
    ];

    $("#cabin_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:cabin_data,
            schema: {
                model:{
                    fields:{
                        name:{type:'text'},
                        moban:{type:'text'},
                        yangtu:{type:'text'},
                    }
                }
            }
        },
        columns:cols,
        editable:'inline',
        // groupable: true,
        // sortable: true,
    });

    var cols2 = [
        {title:"&nbsp;",template:'<input type="checkbox">',width:'30px'},
        {field:"line_name",title:"航线名称"},
        {field:"hot",title:"热门"},
        {field:"cruise_name",title:"所属邮轮"},
        {field:"company",title:"所属公司"},
        {field:"line_type",title:"航线类型"},
        {field:"days",title:"行程天数"},
        {field:"min_price",title:"最低价格"},
        {field:"departure_city",title:"上船"},
        {field:"arrival_city",title:"下船"},
        {field:"id",title:"行程维护",template:'<a href="yys9.html?id=${id}">进入</a>'},
        {title:"航次维护",template:'<a href="yys10.html?id=${id}">进入</a>'},
        {field:'published',title:"状态",template:'#= kendo.toString(published?"已发布":"未发布") #'},
        {title:"编辑",width:'160px',command: [{
            name:'edit',
            text:'编辑'
        }, {
            name:'destroy',
            text:'删除'
        }]},
        {field:'published',title:'&nbsp;',template:'#= kendo.toString(!published?"<b class=\'k-button pub\'>发布</b>":"<b class=\'k-button unpub\'>取消发布</b>") #'}
    ];

    $("#line_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:line_data,
            schema: {
                model:{
                    fields:{
                        name:{type:'text'},
                        moban:{type:'text'},
                        yangtu:{type:'text'},
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
