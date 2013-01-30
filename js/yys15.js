head.ready(function(){
    var cols2 = [
        {field:"name",title:"邮轮"},
        {field:"departure_date",title:"航次"},
        {field:"number",title:"团号"},
        {field:"line_name",title:"航线名称"},
        {field:"cabin",title:"舱型"},
        {field:"sold",title:"已卖（间）"},
        {field:"unpayment",title:"未付款（间）"},
        {field:"left",title:"剩余（间）"},
    ];

    $('.datepicker').kendoDatePicker();

    $("#statistics_data").kendoGrid({
        dataSource:{
            data:statistics_data,
            schema: {
                model:{
                    fields:{
                        name:{editable:false}
                    }
                }
            }
        },
        columns:cols2,
        // editable:'popup',
        // groupable: true,
        // sortable: true,
    });

});
