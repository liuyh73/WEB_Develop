$(function(){
    $('input').focus(function(){
        $(this).prev().addClass('red');
    });
    $('input').blur(function(){
        $(this).prev().removeClass('red');
    });
});