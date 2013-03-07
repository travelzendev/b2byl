head.ready(function(){

    var cols2 = [
        {title:"&nbsp;",template:'<input class="checkall_item" type="checkbox" />',width:'30px',headerTemplate:'<input type="checkbox" class="checkall" />'},
        {field:"line_name",title:"航线名称",template:'# if(data.hot) { # <span class="hot-icon">热</span> #} # #= line_name #'},
        {field:"cruise_name",title:"所属邮轮"},
        {field:"company",title:"所属公司"},
        {field:"line_type",title:"航线类型"},
        {field:"days",title:"行程天数"},
        {field:"min_price",title:"最低价格"},
        {field:"departure_city",title:"上船"},
        {field:"arrival_city",title:"下船"},
        {field:'published',title:"状态",template:'#= kendo.toString(published?"已发布":"未发布") #'},
        {title:"操作",template:kendo.template($('#edit_button').html()) }
    ];

    $("#line_data").kendoGrid({
        scrollable:false,
        toolbar:kendo.template($('#edit_toolbar').html()),
        dataSource:{
            data:line_data,
            schema: {
                model:{
                    id:'id',
                    fields:{
                        line_name:{type:'text',defaultValue:''},
                        published:{type:'boolean',defaultValue:false}
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

            var departure_date = c.find('#departure_date').data("kendoDatePicker");
            var departure_date_data = c.find('#departure_date_data');

            departure_date.bind('change', function(d){
                var old = departure_date_data.val();
                if (old != ''){
                    old += ','
                }
                departure_date_data.val( old + d.sender.element.val() );
            });

            // var uploader = c.find(".upload-files").data('kendoUpload');
            // uploader.localization = {
            //     cancel: "取消",
            //     dropFilesHere: "拖放文件到这里",
            //     remove: "移除",
            //     retry: "重试",
            //     select: "选择文件...",
            //     statusFailed: "失败了",
            //     statusUploaded: "上传成功",
            //     statusUploading: "正在上传",
            //     uploadSelectedFiles: "上传文件"
            // };
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

});
