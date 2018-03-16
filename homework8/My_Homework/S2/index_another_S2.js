window.onload=function(){
    $('.button').bind('click',getRandomValue);
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

function handleRobot(event){
    $('.icon').unbind();
    $().trigger('click');
}

function getRandomValue(event){
    var target=event.target;
    $('.button').each(function(index){
        if(this!==target){
            disable(this);
        }
    });
    $(target).children("span").removeClass('hide');

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200) {
            $(target).children("span").text(request.responseText);
            disable(target);

            if(!$("span").is(':hidden')){
                $('.info').addClass("enable").bind('click',calcValue).trigger('click');
                $('.icon').bind('click',{queue: queue},handleRobot);
            }
            $('.button').each(function(index){
                if(this!==target){
                    enable(this);
                }
            });
            $('.button:eq('+event.data.queue.shift()+')').trigger('click');
        }else{
            console.log("request.readyState: "+request.readyState);
        }
    }
    request.open('GET','ajax'+$(target).text());
    request.send();

    $('#button').one('mouseleave',{request: request},cancelRequest);
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
    getRandomClick();
    $('.button').addClass('enable').unbind().bind('click',getRandomValue);
    $('span').addClass('hide').text('...');
    $('.info').unbind().removeClass('enable').text('');
}

function getRandomClick() {
    var queue=[];
    while(queue.length<5){
        var rv=getRandomNumber();
        if(!queue.includes(rv)){
            queue.push(rv);
        }
    }
    console.log(queue);
}

function getRandomNumber() {
  return Math.round(Math.random() * 4);
}