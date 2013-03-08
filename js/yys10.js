head.ready(function(){
    $('.datepicker').kendoDatePicker();
    var cols2 = [
        {title:"&nbsp;",template:'<input class="checkall_item" type="checkbox" />',width:'30px',headerTemplate:'<input type="checkbox" class="checkall" />'},
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
        {title:"其它费用",template:'#= "计算得" #'},
        {title:"全付",field:'pay_all',template:'#= pay_all?"是":"否" #'},
        {field:"id",title:"客舱价格",template:'<a href="yys11.html?id=${id}">#= cabin_priced?"已设置":"未设置" #</a>'},
        {field:'published',title:"状态",template:'#= kendo.toString(published?"已发布":"未发布") #'},
        {title:"操作",template:kendo.template($('#edit_button').html()) }
    ];

    $("#voyage_data").kendoGrid({
        scrollable:false,
        toolbar:[{
            name:'create',
            text:'新增航次'
        },{
            template:'<b id="clone_line" class="k-button">航线复制</b>'
        }],
        dataSource:{
            data:voyage_data,
            schema: {
                model:{
                    id:'id',
                    fields:{
                        pay_all:{type:'number',defaultValue:0},
                        published:{type:'number',defaultValue:0},
                        cabin_priced:{type:'number',defaultValue:0}
                    }
                }
            }
        },
        columns:cols2,
        editable:{
            template:kendo.template($('#edit_template').html()),
            mode:'popup',
            confirmation:'确定要删除这条记录么？'
        },
        edit:function(e){
            var c = $(e.container);
            // c.width(800).data("kendoWindow").center();
            c.find('.k-grid-update').html('<span class="k-icon k-update"></span>保 存');
            c.find('.k-grid-cancel').html('<span class="k-icon k-cancel"></span>取 消');

            var cols = [
                {field: 'name',title:'名称'},
                {field: 'price',title:'价格',width:120},
                {title:"操作",
                    width:160,
                    command: [
                        {name:"edit",text:{edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                        {name:"destroy",text:"删 除"}
                    ]
                }
            ];

            var cols2 = [
                {field: 'name',title:'名称'},
                {field: 'price',title:'价格',width:120},
                {field: 'unit',title:'单位',width:80,editor:function(c,o){
                    var html = $('<div> <select data-bind="value:'+o.field+'" name="'+o.field+'"></select> </div>');
                    var droplist = html.find('select');

                    droplist.kendoDropDownList({
                        dataSource: ['人','份']
                    });

                    c.append(html);
                }},
                {field: 'remark',title:'说明'},
                {title:"操作",
                    width:160,
                    command: [
                        {name:"edit",text:{edit: "编 辑",	update: "保 存",	cancel: "取 消"}},
                        {name:"destroy",text:"删 除"}
                    ]
                }
            ];

            $("#discount").kendoGrid({
                scrollable:false,
                toolbar:[{
                    name:'create',
                    text:'增加'
                }],
                dataSource:{
                    data:e.model.discount,
                    schema: {
                        model:{
                            id:'name',
                            fields:{
                                price:{type:'number'}
                            }
                        }
                    }
                },
                columns:cols2,
                editable:{
                    mode:'inline',
                    confirmation:'确定要删除这条记录么？'
                },
                edit:function(e){
                    var c = $(e.container);
                    // c.width(800).data("kendoWindow").center();
                    c.find('.k-grid-update').html('<span class="k-icon k-update"></span>保 存');
                    c.find('.k-grid-cancel').html('<span class="k-icon k-cancel"></span>取 消');
                }
            });
            $("#other_fees").kendoGrid({
                scrollable:false,
                toolbar:[{
                    name:'create',
                    text:'增加'
                }],
                dataSource:{
                    data:e.model.others,
                    schema: {
                        model:{
                            id:'name',
                            fields:{
                                price:{type:'number'}
                            }
                        }
                    }
                },
                columns:cols,
                editable:{
                    mode:'inline',
                    confirmation:'确定要删除这条记录么？'
                },
                edit:function(e){
                    var c = $(e.container);
                    // c.width(800).data("kendoWindow").center();
                    c.find('.k-grid-update').html('<span class="k-icon k-update"></span>保 存');
                    c.find('.k-grid-cancel').html('<span class="k-icon k-cancel"></span>取 消');
                }
            });
        }
    });


    $('body').delegate('.checkall','click',function () {
        $(this).closest('.block').find(':checkbox').attr('checked', this.checked);
    });

    $('body').delegate('.checkall_item','change',function () {
        if( typeof $(this).attr('checked') == 'undefined'){
            $('.checkall').removeAttr('checked');
        }
    });

    // 开航日期
    var windows = $("#window");
    var kendo_window = windows.kendoWindow({
        width:'500px',
        modal:true,
        visible:false
    }).data("kendoWindow").center();

    $('#clone_line').bind('click',function(){
        kendo_window.title('舱型设置');
        kendo_window.open();
    });

    $('.close-button').click(function(){
        kendo_window.close();
    });


});
