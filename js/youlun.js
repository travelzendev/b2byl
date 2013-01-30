$(function(){
    head.js('../js/kendo.web.min.js',
            '../js/kendo.culture.zh-CHS.min.js',
            '../js/store.min.js',
  function(){
    kendo.culture('zh-CHS');

    window.contact_info={
        name:'阿斯',
        phonenumber:'13800',
        email:'sf@163.com',
    };

    window.delivery_info = {
        type:'快递',
        address:'上海浦东',
        name:'啊死',
        phonenumber:'13800',
        zipcode:'123456'
    };

    window.invoice_info = {
        title:'123',
        detail:'fa fdksal',
        special: 'fdsal fdksajl',
    };

    //运营商数据
    window.yys_data = {};
    //实体资料
    window.stzl_data = [{
        name:'身份证复印件',
        required: '必须',
        detail:'行程结束后还有半年以上有效期，可接收电子护照。'
    }];
    //资料分类
    window.zlfl_data = [{
        type:'在职',
        count:3,
        detail:'身份证复印件',
    }];
    //模板及样图管理
    window.moban_data = [{
        name:'个人信息表',
        moban:'httpddd.docx',
        yangtu:'xxx.jpg'
    }];
    //基础信息
    window.jcxx_data = [{
        name:'维多利亚',
        picture:'http://b2b.10106266.com/img/dt/logo.png',
        company:'歌诗达',
        rule:'fdslfdksal',
        remark:'xxx',
        id:111
    }];
    //公司信息
    window.company_data = [{
        name:'歌诗达',
        picture:'http://b2b.10106266.com/img/dt/logo.png',
        remark:'fkdslafkdsl'
    }];
    //客舱信息
    window.kcxx_data = [{
        cabin:'海景房',
        room:'标准1',
        room_id:'1',
        room_intro:'设备介绍：浴室，电锤，电话，电视',
        floor:'5~7层',
        acreage:'6.6~9.0',
        windows:'无',
        bed:'双床',
        price:5200,
        max:2
    }];
    //航线信息
    window.line_data = [{
        id:1,
        line_type:'东南亚',
        line_name:'"歌诗达维多利亚号"新加坡、马来西亚豪华畅游6日游',
        departure_date:'2012-10-10,2012-10-11',
        via:'新加坡,吉隆坡,普吉岛',
        order_last_date:'7',
        days:3,
        departure_city:'上海',
        arrival_city:'上海',
        cruise_name:'卡罗琳',
        company:'歌诗达',
        min_price:222,
        chd_age_limit:10,
        picture:'http://www.dd.png',
        provision_text:'xxx',
        qa_text:'xxx',
        fee_text:'xxx',
        recommendation_text:'xxx',
        hot:true,
        published:true
    }];

    //行程信息
    window.agenda_data = [{
        day_num:1,
        port:'新加坡',
        arrival_time:'12:50:20',
        departure_time:'19:30:20',
        detail:'几日xxx',
        remark:'xxx',
        picture:'http://b2b.10106266.com/img/dt/logo.png',
    }];

    //航次信息
    window.voyage_data=[{
        id:1,
        number:"Kbkfds-f-121321",
        type:'团队游',
        departure_date:'212-11-10',
        min_price:8000,
        port_charges:1799,
        visa_charges:600,
        adt_insurance:100,
        chd_insurance:100,
        earnest:1000,
        the_fourth:6900,
        other_charges:2000,
        pay_all:true,
        published:false,
        cabin_priced:true,
    }];

    //客舱价格
    window.cabin_price_data = [{
        cabin:'海景房',
        room:'标准1',
        room_id:1,
        max:3,
        acting_price:4000,
        price:4000,
        coefficient:1.5,
        can_be_added:true,
        left_tickets:6,
    }];

    //舱型信息
    window.cabin_data = [{id:1,name:'内舱房'},{id:2,name:'海景房'}];

    //采购商公司
    window.cgsinfo_data = [{
        name:'xx旅行社',
        type:'其他类型公司',
        shortname:'fhq',
        position:'上海长宁区',
        rebate:4,
    }];


    //统计信息
    window.statistics_data=[{
        name:'歌斯达',
        departure_date:'1021-12-24',
        number:'kfdsla-fdsa-123-2',
        line_name:'f邮轮处女星号新加坡-槟城-普吉岛五天四晚',
        cabin:'xxx舱',
        sold:10,
        unpayment:10,
        left:1,
    }];

    window.order_info_detail = {
        selected:false,
        order_num:'YK25126516515151',
        line_name:'丽星邮轮处女星号新加坡-槟城-普吉岛五天四晚',
        cabin_count:3,
        psr_count:5,
        departure_date:'2012-01-05',
        book_date:'2012-01-05',
        order_total:2250,
        order_return:50,
        order_status:'待付款',
        order_pay:'全款/定金',
        psrinfo_status:'齐全',
        material_status:'缺资料',
        attachment_count:2,
        pay_type:'支付宝',
        pay_status:'已支付',
        pay_account:'20120010231',
        book_type:'网上预订'
    };

    window.refund_info = {
        return_ticket: true,
        reason:'推船',
        money:'5900',
        remark:'无需说明',
        status:{
            result:'部分退票',
            money:'5000',
            remark:'xxx,只能退一半'
        }
    };

    window.order_info = [{
        selected:false,
        order_num:'YK25126516515151',
        line_name:'丽星邮轮处女星号新加坡-槟城-普吉岛五天四晚',
        cabin_count:3,
        psr_count:5,
        departure_date:'2012-01-05',
        book_date:'2012-01-05',
        order_total:2250,
        order_return:50,
        order_status:'待付款',
        psrinfo_status:'齐全',
        material_status:'缺资料',
        attachment_count:2,
    },
    {
        selected:false,
        order_num:'YK25126516515151',
        line_name:'丽星邮轮处女星号新加坡-槟城-普吉岛五天四晚',
        cabin_count:3,
        psr_count:5,
        departure_date:'2012-01-05',
        book_date:'2012-01-05',
        order_total:2250,
        order_return:50,
        order_status:'待付款',
        psrinfo_status:'齐全',
        material_status:'缺资料',
        attachment_count:2,
    },
    {
        selected:false,
        order_num:'YK25126516515151',
        line_name:'丽星邮轮处女星号新加坡-槟城-普吉岛五天四晚',
        cabin_count:3,
        psr_count:5,
        departure_date:'2012-01-05',
        book_date:'2012-01-05',
        order_total:2250,
        order_return:50,
        order_status:'待付款',
        psrinfo_status:'齐全',
        material_status:'缺资料',
        attachment_count:2,
    }];

    window.cgs_data={
        order_num:"YHk5261561515151",
        additional_info:{
            remark:"备备备备备注注注注注备注",
            total:0,
        },
        line_info:{
            adt_amount:1,
            chd_amount:0,
            line_name:'"歌诗达维多利亚号"新加坡、马来西亚豪华畅游6日游',
            departure_date:'2012-10-10',
            days:3,
            departure_city:'上海',
            arrival_city:'上海',
            cruise_name:'N250',
            cruise_id:'N250',
        },
        room_info:[{
            cabin:'海景房',
            room:'标准1',
            room_id:'1',
            room_intro:'设备介绍：浴室，电锤，电话，电视',
            floor:'5~7层',
            acreage:'6.6~9.0',
            windows:'无',
            bed:'双床',
            price:5200,
            max:2,
            real:2,
            roomcount:2,
            selected:false
        },{
            cabin:'内舱房',
            room:'标准2',
            room_id:'2',
            room_intro:'设备介绍：浴室，电锤，电话，电视',
            floor:'5~7层',
            acreage:'6.6~9.0',
            windows:'无',
            bed:'双床',
            price:5600,
            max:2,
            real:2,
            roomcount:2,
            selected:false
        },{
            cabin:'内舱房',
            room:'标准2',
            room_id:'222',
            room_intro:'设备介绍：浴室，电锤，电话，电视',
            floor:'5~7层',
            acreage:'6.6~9.0',
            windows:'无',
            bed:'双床',
            price:9600,
            max:2,
            real:2,
            roomcount:2,
            selected:true
        }],
        others_info:[
            {name:'成人保险',price:124,count:1},
            {name:'儿童保险',price:124,count:1},
            {name:'签证',price:124,count:1},
            {name:'港务费、税费、小费',price:124,count:1},
        ]
    };

    if($('.mo-cgs3').length){
        head.js('../js/cgs3.js');
    }

    if($('.mo-cgs5').length){
        head.js('../js/cgs5.js');
    }

    if($('.mo-cgs7').length){
        head.js('../js/cgs7.js');
    }

    if($('.mo-cgs8').length){
        head.js('../js/cgs8.js');
    }

    if($('.mo-cgs9').length){
        head.js('../js/cgs9.js');
    }

    if($('.mo-yys2').length){
        head.js('../js/yys2.js');
    }

    if($('.mo-yys3').length){
        head.js('../js/yys3.js');
    }

    if($('.mo-yys4').length){
        head.js('../js/yys4.js');
    }

    if($('.mo-yys5').length){
        head.js('../js/yys5.js');
    }

    if($('.mo-yys6').length){
        head.js('../js/yys6.js');
    }

    if($('.mo-yys7').length){
        head.js('../js/yys7.js');
    }

    if($('.mo-yys8').length){
        head.js('../js/yys8.js');
    }

    if($('.mo-yys9').length){
        head.js('../js/yys9.js');
    }

    if($('.mo-yys10').length){
        head.js('../js/yys10.js');
    }

    if($('.mo-yys11').length){
        head.js('../js/yys11.js');
    }

    if($('.mo-yys14').length){
        head.js('../js/yys14.js');
    }

    if($('.mo-yys15').length){
        head.js('../js/yys15.js');
    }


    });

});
