head.ready(function(){
    store.clear();

    $('body').delegate('.icon-search','click',function(){
        alert('此功能暂不能用');
    });

    $('.fximg').ezpz_tooltip();

    var tbody = kendo.template($('#tbody').html());
    $('#yl_detail_info table').append(tbody({ len:cgs_data.room_info.length }));

    window.room_count_change = function(e){
        var that = e.sender;
        var tr = that.element.closest('tr');
        var val = that._value;
        var max = that.element.data('max');
        var cuid = that.element.data('cuid');
        var len = that.element.closest('.fxwrap').find('.fxrow-'+cuid).size();
        var tlen = that.element.closest('.fxwrap').index()/2-1;
        var index = tr.prevAll('.fxdatarow').size();

        var room_data = viewModel.room_info[tlen].room_type[index];

        if(val==0){
            tr.find('.fxhide').hide();
            reset_room(cuid);
        }else{
            if(val<len){
                delete_room(cuid,room_data);
            }

            if(val>0){
                tr.find('.fxhide').show();
                if ( val==1 && typeof room_data.order=='undefined') {
                    room_data.order = new kendo.data.ObservableArray([]);
                    var item = {real:2};
                    if(room_data.room_number_availale){
                        item.room_number='选房';
                    }else{
                        item.room_number='随机';
                    }
                    room_data.order.push(item);
                    kendo.bind(tr.find('.fxreal[data-role]'),room_data);
                    kendo.bind(tr.find('.fxroomnumber'),room_data);
                }
            }

            if(val>len){
                add_room(cuid,val,room_data);
            }
        }

    }

    function reset_room(cuid){
        $('.fxrow-'+cuid).eq(0).find('.fxhide').hide();
    }

    function add_room(cuid,val,room_data){
        var item = {real:2};
        if(room_data.room_number_availale){
            item.room_number='选房';
        }else{
            item.room_number='随机';
        }

        room_data.order.push(item);

        var html = $('#yl_detail_added_row').html();
        var tpl = kendo.template(html);

        var last = $('.fxrow-'+cuid).eq(-1).after(tpl(room_data));
        kendo.init($('.fxrow-'+cuid).eq(-1));

        kendo.bind($(".fxaddedrow.fxrow-"+cuid), room_data);
    }

    function delete_room(cuid,room_data){
        $('.fxrow-'+cuid).eq(-1).remove();
        room_data.order.pop();
    }

    $('#yl_detail_info').delegate('.fxaction','click',function(e){
        var that = $(this);
        var tr = that.closest('tr');
        var cuid = that.data('cuid');
        var fxdatarow = $('.fxdatarow').eq(tr.prevAll('.fxdatarow').size()-1);
        var room_index = tr.prevUntil('.fxdatarow').size()+1;
        var tlen = tr.closest('.fxwrap').index()/2-1;
        var index = tr.prevAll('.fxdatarow').size();
        index = tr.hasClass('fxdatarow')?index:index-1;

        var room_data = viewModel.room_info[tlen].room_type[index];

        if(tr.hasClass('fxdatarow')==false){
            room_data.order.splice(room_index,1);
            tr.remove();
        }else{
            room_data.order.splice(0,1);
            kendo.bind(tr.find('.fxreal[data-role]'),room_data);
            kendo.bind(tr.find('.fxroomnumber'),room_data);
            kendo.bind($(".fxaddedrow.fxrow-"+cuid), room_data);
            tr.next().remove();
        }

        if(room_data.order.length==0){
            delete room_data.order;
            tr.find('.fxhide').hide();
            reset_room(cuid);
        }

        room_data.set('roomcount',room_data.roomcount-1);
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

    $('.fximg').ezpz_tooltip();

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

});
