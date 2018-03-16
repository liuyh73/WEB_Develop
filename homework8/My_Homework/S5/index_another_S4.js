window.onload=function(){
    var queue=getRandomClick();
    $('.button').bind('click',getRandomValue);
    $('#button').bind('mouseleave',reset);
    $('.icon').bind('click',{queue: queue},handleRobot);
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
    var list=[];
    for(var i=0;i<5;i++){
        switch(event.data.queue[i]){
            case 0: list.push('A');break;
            case 1: list.push('B');break;
            case 2: list.push('C');break;
            case 3: list.push('D');break;
            case 4: list.push('E');break;
        }
    }
    $('p').text(list.join('->')).removeClass('hide');
    $('.button:eq('+event.data.queue.shift()+')').unbind().click(event.data,getRandomValue).click();
}

function getRandomValue(event){
    var target=event.target;
    $('.button').each(function(index){
        if(this!==target){
            disable(this);
        }
    });
    $(target).unbind('click');
    $(target).children("span").removeClass('hide');

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200) {
            $(target).children("span").text(request.responseText);
            disable(target);

            if(!$("span").is(':hidden')){
                $('.info').addClass("enable").bind('click',calcValue).trigger('click');
                var queue=getRandomClick();
                $('.icon').bind('click',{queue: queue},handleRobot);
            }
            $('.button').each(function(index){
                if(this!==target){
                    enable(this);
                }
            });
            
            $('.button:eq('+event.data.queue.shift()+')').unbind('click').click(event.data,getRandomValue).click();
        }else{
            console.log("request.readyState: "+request.readyState);
        }
    }
    request.open('GET','ajax4');
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
    var queue=getRandomClick();
    console.log(queue);
    $('.icon').unbind('click').bind('click',{queue: queue},handleRobot);
    $('p').addClass('hide');
    $('.button').addClass('enable').unbind('click').bind('click',getRandomValue);
    $('span').addClass('hide').text('...');
    $('.info').unbind('click').removeClass('enable').text('');
}

function getRandomClick() {
    var queue=[];
    while(queue.length<5){
        var rv=getRandomNumber();
        if(!queue.includes(rv)){
            queue.push(rv);
        }
    }
    return queue;
}

function getRandomNumber() {
  return Math.round(Math.random() * 4);
}