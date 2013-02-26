head.ready(function(){

    store.clear();

    $.fn.backTop = function(){
        var t = $(this);
        var opts = t.data();
        opts = $.extend({
            hide:true,
            showtop:10,
            stop:0
        },opts);

        var postop = $(window).scrollTop();

        if(opts.hide && postop < opts.showtop){
            t.hide();
        }

        t.bind('click',function(){
            window.scrollTo(0,0);
        });

        if(opts.hide){
            $(window).bind('scroll',function(){
                var postop = $(this).scrollTop();

                if( postop > opts.showtop ){
                    t.show(100);
                }else{
                    t.hide(100);
                }
            });
        }

    };


    $('#backTop').backTop();


    $('body').delegate('.icon-search','click',function(){
        alert('此功能暂不能用');
    });

    cgs_data.total={source:[]};

    $('.fximg').ezpz_tooltip();

    var tbody = kendo.template($('#tbody').html());
    $('#yl_detail_info').append(tbody({ len:cgs_data.room_info.length,room_info:cgs_data.room_info }));

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
            reset_room(room_data,tr);
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

        spin_blur(e);
    }

    $('.inline-div').on('click',function(e){
        e.preventDefault();
        var anchor = this.href.split('#')[1];
        var offsetTop = $('#'+anchor).offset().top;
        window.scrollTo(0,offsetTop-95);
    });

    function reset_room(room_data,tr){
        tr.find('.fxhide').hide();
        delete room_data.order;
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

    $('#yl_detail_calc').delegate('.fxaction','click',function(e){
        var index = $(this).data('index');
        viewModel.others_info[index].set('count',0);
        kendo.bind($("#yl_detail_calc"), viewModel);
    });

    $('#yl_detail_discount').delegate('.fxaction','click',function(e){
        var index = $(this).data('index');
        viewModel.discount[index].set('count',0);
        kendo.bind($("#yl_detail_discount"), viewModel);
    });

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
            tr.next().filter(".fxaddedrow").remove();
        }

        if(room_data.order.length==0){
            reset_room(room_data,tr);
        }

        room_data.set('roomcount',room_data.roomcount-1);
    });

    $('#yl_detail_total').delegate('.fxaction','click',function(){
        var that = $(this);
        var tr = that.closest('.total_addrow');
        var index = tr.index();
        var data = that.data();

        viewModel.total.source.splice(index,1);

        if(data.id=='room_info'){
            viewModel['room_info'][data.pidx]['room_type'][data.idx].set('roomcount',0);
        }

        if(data.id=='others_info' || data.id=='discount'){
            viewModel[data.id][data.idx].set('count',0);
        }

    });

    $('.numerictextbox').kendoNumericTextBox({
        format:"#",
        culture:'zh-CHS'
    });

    var others_info_tmpl= kendo.template($('#others_info_tmpl').html());
    $('#yl_detail_calc').append(others_info_tmpl({len:cgs_data.others_info.length,val:cgs_data.others_info}));

    var discount_tmpl= kendo.template($('#discount_tmpl').html());
    $('#yl_detail_discount').append(discount_tmpl({len:cgs_data.discount.length,val:cgs_data.discount}));

    window.spin_blur = function(e){
        e.sender.element.blur();
    }

    var viewModel = kendo.observable(cgs_data);
    var funcs = {
        discount_calc:function(i){
            var that = this.discount[i];
            return that.price * that.count;
        },
        discount_state:function(i){
            var html = '';
            if(this.discount[i].count>0){
                html += '<span class="fxhide" style="font-size: 16px;">&#10004;</span>';
                if(!this.discount[i].readonly){
                    html += '<input type="button" data-index="'+i+'" class="fxaction fxhide" style="" value="×">';
                }
            }
            return html;
        },
        others_calc:function(i){
            var that = this.others_info[i];
            return that.price * that.count;
        },
        others_state:function(i){
            var html = '';
            if(this.others_info[i].count>0){
                html +=  '<span class="fxhide" style="font-size: 16px;">&#10004;</span>'
                if(!this.others_info[i].readonly){
                    html += '<input type="button" data-index="'+i+'" class="fxaction fxhide" style="" value="×">'
                }
            }
            return html;
        }
    }
    $.extend(viewModel,funcs);

    kendo.bind($(".content"), viewModel);

    viewModel.room_info.bind('change',function(e){
        var that = e.items[0];
        if(that.roomcount==0){
            delete that.order;
            var rows = $('.fxrow-'+that.cuid);
            rows.filter('.fxaddedrow').remove();
            rows.filter('.fxdatarow').find('.fxhide').hide();
        }
    });

    viewModel.others_info.bind('change',function(e){
        kendo.bind($("#yl_detail_calc"), viewModel);
    });

    viewModel.discount.bind('change',function(e){
        kendo.bind($("#yl_detail_discount"), viewModel);
    });

    viewModel.bind('change',function(e){
        var count_customer = 0;
        var source = new kendo.data.ObservableArray([]);

        $.each(viewModel.room_info,function(idx,e){
            var pidx = idx;
            $.each(e.room_type,function(idx,e){
                if(e.order && e.roomcount>0){
                    source.push({
                        name:e.room,
                        count:e.roomcount,
                        row_total:e.roomcount*e.price,
                        id: 'room_info',
                        idx:idx,
                        pidx:pidx
                    });
                    $.each(e.order,function(idx,e){
                        count_customer += e.real;
                    });
                }
            });
        });

        $.each(viewModel.others_info,function(idx,e){
            if(e.count>0){
                source.push({
                    name:e.name,
                    count:e.count,
                    row_total:e.count*e.price,
                    id:'others_info',
                    idx:idx,
                    readonly:e.readonly
                });
            }
        });

        $.each(viewModel.discount,function(idx,e){
            if(e.count>0){
                source.push({
                    name:e.name,
                    count:e.count,
                    row_total:e.count*e.price,
                    id:'discount',
                    idx:idx,
                    readonly:e.readonly
                });
            }
        });

       var total_money = 0;
       $.each(source,function(idx,e){
            total_money += e.row_total;
       });

        viewModel.total.count_customer = count_customer;
        viewModel.total.total_money = total_money;
        viewModel.total.source = source;
        kendo.bind($("#yl_detail_total"), viewModel);
    });

    viewModel.trigger('change');

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
