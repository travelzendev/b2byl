head.ready(function(){
    store.clear();

    $(window).bind('scroll',function(){
        var that=$(this);
        var postop = that.scrollTop();
        var ele = $('.total-block');
        if(postop>563){
            !ele.hasClass('total-fixed') && ele.addClass('total-fixed');
        }else{
            ele.removeClass('total-fixed');
        };
    });

    $('.numerictextbox').kendoNumericTextBox({
        format:"#"
    });

    var cols2 = [
        {field:"name",title:"名称"},
        {field:"price",title:"单价",format:"¥{0}"},
        {field:"count",title:"份数",
            template: "<span class='pseudo_input'>${count}</span>",
        },
        {title:"小计",
            template: "¥#= kendo.toString(count*price) #",
        },
        {title:"选择"}
    ];

    $("#yl_detail_calc").kendoGrid({
        scrollable:false,
        dataSource:{
            data:cgs_data.others_info,
            schema: {
                model:{
                    fields:{
                        count:{type:"number",editable:true,validation:{min:0}},
                        price:{editable:false,type:"number"},
                        total:{editable:false,type:'number'},
                        selected:{editable:false,type:'boolean'}
                    }
                }
            }
            // pagesize:10
        },
        columns:cols2,
        editable:true,
        // groupable: true,
        // sortable: true,
        // pageable: {
        //     refresh: true,
        //     pageSizes: true
        // },
    });

    // var iyl_detail_info = kendo.template($('#yl_detail_info_row').html(),{useWithBlock:false});

    // $('#yl_detail_info table').append(iyl_detail_info(cgs_data.room_info));

    var viewModel = kendo.observable(cgs_data);
    kendo.bind($(".content"), viewModel);

    viewModel.bind('change',function(e){
        // console.log(e);
    });

    $('#submit').bind('click',function(e){
        e.preventDefault();
        //存储在本地，不提交
       var submited = viewModel.toJSON();

        store.set('cgs_submited_data', submited);

        // location.href="cgs5.html";
        console.log(submited);
    });

});
