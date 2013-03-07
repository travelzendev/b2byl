head.ready(function(){

    function editor_with_textarea(c,o){
        $('<textarea style="width:200px;height:50px" class="k-textbox" name="'+o.field+'" data-bind="value:'+o.field+'"></textarea>').appendTo(c);
    }

    function editor_droplist(c,o){
        var html = $('<div> <select data-bind="value:company" name="company"></select> </div>');
        var droplist = html.find('select');

        droplist.kendoDropDownList({
            dataTextField: "name",
            dataValueField: "name",
            dataSource: jcxx_data.company_list
        });

        c.append(html);
    }

    var cols = [
        {field:"name",title:"邮轮名称",template:'<center><div><img src="#= data.picture#" width="120" height="50"  /></div><div>#= data.name #</div></center>',width:140},
        {field:"company",title:"所属公司",editor:editor_droplist},
        {field:"rule",title:"规则条款",editor:editor_with_textarea,template:"#= data.rule && data.rule.replace(/\\n/g,'<br>') #"},
        {field:"remark",title:"备注",editor:editor_with_textarea,template:"#= data.remark && data.remark.replace(/\\n/g,'<br>') #"},
        {field:"url",title:"客舱信息",template:'# if(data.url) { # <a href="#= url #">进入</a># } #'},
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
            data:jcxx_data.source,
            schema: {
                model:{
                    id:'name',
                    fields:{
                        name:{type:'text',defaultValue:''},
                        company:{type:'text',defaultValue:'歌诗达'},
                        rule:{type:'text',defaultValue:''},
                        remark:{type:'text',defaultValue:''},
                        url:{type:'text',defaultValue:'yys7.html'},
                        picture:{type:'text',defaultValue:'http://b2b.10106266.com/img/dt/logo.png'}
                    }
                }
            }
        },
        columns:cols,
        editable:{
            // template:kendo.template($('#edit_template').html()),
            mode:'popup',
            confirmation:'确定要删除这条记录么？'
        },
        edit:function(e){
            $(e.container).parent().find('.k-edit-label').eq(-1).hide();
            $(e.container).parent().find('.k-edit-field').eq(-1).hide();
            $(e.container).parent().find('.k-edit-field').eq(1).after('<div class="k-edit-label"><label for="picture">邮轮图片</label></div><div data-container-for="picture" class="k-edit-field"><input type="file" name="cruise_picture" data-bind="value:picture"></div>');
        }
    });

});
