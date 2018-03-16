window.onload=function(){
    $('.button').bind('click',getRandomValue);
    $('#button').bind('mouseleave',reset);
};

function enable(target){
    if(!$(target).children("span").is(':visible')){
        $(target).bind('click',getRandomValue);
        $(target).addClass("enable");
    }
}

function disable(target){
    $(target).unbind('click');
    $(target).removeClass('enable');
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
        if(request.readyState === 4) {
            if(request.status === 200) {
                $(target).children("span").text(request.responseText);
                disable(target);

                if($("span:eq(0)").is(':visible') && $("span:eq(1)").is(':visible') &&
                    $("span:eq(2)").is(':visible') && $("span:eq(3)").is(':visible') && 
                    $("span:eq(4)").is(':visible'))  {
                    $('.info').addClass("enable");
                    $('.info').bind('click',calcValue);
                }
                $('.button').each(function(index){
                    if(this!==target){
                        enable(this);
                    }
                });
            }
            else{
                console.log("request.status: "+request.status);
            }
        } 
        else {
            console.log("request.readyState: "+request.readyState);
        }
    }
    request.open('GET','ajax'+$(target).text());
    request.send();

    $('#button').bind('mouseleave',{request: request},cancelRequest);
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
    $('.button').addClass('enable').unbind().bind('click',getRandomValue);
    $('span').addClass('hide').text('...');
    $('.info').unbind().removeClass('enable').text('');
}