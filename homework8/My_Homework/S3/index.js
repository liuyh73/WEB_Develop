window.onload=function(){
    $('#button').bind('mouseleave',reset);
    $('.icon').bind('click',handleRobot);
};

function enable(target){
    if(!$(target).children("span").is(':visible')){
        $(target).bind('click',getRandomValue).addClass("enable");
    }
}

function disable(target){
    $(target).unbind('click').removeClass('enable');
}

function handleRobot(){
    $('.icon').unbind()
    $('.button').bind('click',getRandomValue).click();
}

function getRandomValue(event){
    var target=event.target;
    $(target).unbind('click');
    $(target).children("span").removeClass('hide');
    setTimeout(function(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200) {
                disable(target);
                $(target).children("span").text(request.responseText);

                if($("span:eq(0)").text()!=='...' && $("span:eq(1)").text()!=='...' &&
                    $("span:eq(2)").text()!=='...' && $("span:eq(3)").text()!=='...' && 
                    $("span:eq(4)").text()!=='...')  {
                    $('.info').addClass("enable").bind('click',calcValue).trigger('click');
                }
            }
        }
        request.open('GET','ajax'+$(target).text());
        request.send();
        $('#button').one('mouseleave',{request: request},cancelRequest);
    },0);
}

function cancelRequest(event){
    event.data.request.abort();
}

function calcValue(event){
    var result=Number($("span:eq(0)").text())+Number($("span:eq(1)").text())
                +Number($("span:eq(2)").text())+Number($("span:eq(3)").text())
                +Number($("span:eq(4)").text());
    $(event.target).text(result);
    $('.info').removeClass("enable");
    $('.info').unbind('click');
}

function reset(){
    $('.button').addClass('enable').unbind();
    $('span').addClass('hide').text('...');
    $('.info').unbind().removeClass('enable').text('');
    $('.icon').bind('click',handleRobot);
}