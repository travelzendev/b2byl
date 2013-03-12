head.ready(function(){
    $('#price_panel .k-input').on('focus',function(){
        $('.price_panel_button').show();
    });
    $('#price_range_cancel').on('click',function(){
        $('.price_panel_button').hide();
    });
    $('#price_range_submit').on('click',function(){
        alert('确认');
        $('.price_panel_button').hide();
    });
    $('body').on('click',function(e){
       var out = $(e.target).closest('#price_panel').size();
       if(out==0){
        $('.price_panel_button').hide();
       }
    });
});
