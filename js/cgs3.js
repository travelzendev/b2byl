head.ready(function(){
    store.clear();

    $('.fximg').ezpz_tooltip();

    window.room_count_change = function(e){
        var that = e.sender;
        var val = that._value;
        var max = that.element.data('max');
        var ele = that.element.closest('.fxwrap');
        var cuid = that.element.data('cuid');
        var len = that.element.closest('.fxwrap').find('.fxrow-'+cuid).size();
        var tlen = that.element.closest('.fxwrap').index()/2-1;
        var index = that.element.closest('tr').prevAll('.fxdatarow').size();

        var room_data = viewModel.room_info[tlen].room_type[index];

        if(val==0){
            that.element.closest('tr').find('.fxhide').hide();
            reset_room(cuid);
        }else{
            if(val<len){
                delete_room(cuid,room_data);
            }

            if(val>0){
                that.element.closest('tr').find('.fxhide').show();
                $('.fxrow-'+cuid).eq(0).find('.fxaction').attr('checked',true).removeAttr('disabled');
            }

            if(val>len){
                add_room(ele,cuid,val,room_data);
            }
        }

    }

    function reset_room(cuid){
        $('.fxrow-'+cuid).eq(0).find('.fxaction').attr('checked',false).attr('disabled',true);
    }

    function add_room(ele,cuid,val,room_data){
        var item = {real:2};
        if(room_data.room_number_availale){
             item.room_number='可选房号';
        }else{
             item.room_number='随机';
        }
        room_data.order.push(item);

        var html = $('#yl_detail_added_row').html();

        window.vvvv = function(e){
            var that = e.sender;
            var index = that.element.closest('tr').prevUntil('.fxdatarow').size()+1;
            room_data.order[index].real = that._value;
        }

        var tpl = kendo.template(html);
        $('.fxrow-'+cuid).eq(-1).after(tpl(room_data));
        kendo.init(ele);
    }

    function delete_room(cuid,room_data){
        $('.fxrow-'+cuid).eq(-1).remove();
        room_data.order.pop();
    }

    $('#yl_detail_info').delegate('.fxaction','change',function(e){
        var that = $(this);
        var tr = that.closest('tr');
        var fxdatarow = $('.fxdatarow').eq(tr.prevAll('.fxdatarow').size()-1);
        if(tr.hasClass('fxdatarow')==false){
            tr.remove();
        }
        var fxroomcount = fxdatarow.find('input.fxroomcount[data-role]').data("kendoNumericTextBox");
        fxroomcount.value(fxroomcount._value-1);
    });

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
        format:"#",
        culture:'zh-CHS'
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

    $('.fximg').ezpz_tooltip();

    viewModel.bind('change',function(e){
        // console.log(e);
    });

    // $('body').delegate('.roomcounttd .k-link','click',function(){
        // console.log(viewModel);
    // });

    $('#submit').bind('click',function(e){
        e.preventDefault();
        //存储在本地，不提交
       var submited = viewModel.toJSON();

        store.set('cgs_submited_data', submited);

        // location.href="cgs5.html";
        console.log(submited);
    });

});
