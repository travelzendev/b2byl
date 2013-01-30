head.ready(function(){

    var cols2 = [
        {title:"&nbsp;",template:'<input type="checkbox">',width:'30px'},
        {title:"产品类型",field:'type'},
        {title:"团号",field:'number'},
        {title:"出发日期",field:'departure_date'},
        {title:"最低价",field:'min_price'},
        {title:"港务费",field:'port_charges'},
        {title:"签证费",field:'visa_charges'},
        {title:"成人保险费",field:'adt_insurance'},
        {title:"儿童保险费",field:'chd_insurance'},
        {title:"订金费",field:'earnest'},
        {title:"第三第四人船票",field:'the_fourth'},
        {title:"其它费用",field:'other_charges'},
        {title:"全付",field:'pay_all'},
        {field:"id",title:"客舱价格",template:'<a href="yys11.html?id=${id}">#= kendo.toString(cabin_priced?"已设置":"未设置") #</a>'},
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

    $("#voyage_data").kendoGrid({
        toolbar:[{
            name:'create',
            text:'新增'
        }],
        dataSource:{
            data:voyage_data,
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
