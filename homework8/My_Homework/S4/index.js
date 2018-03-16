$(function(){
    var queue=getRandomClick();
    console.log(queue);
    $('.icon').on('click',{queue: queue},robotHandler);
    $('#button').on('mouseleave',reset);
});

function reset(){
    var queue=getRandomClick();
    $('.icon').off().on('click',{queue: queue},robotHandler);
    $('p').addClass('hide');
    $('.button').off().addClass('enable');
    $('span').addClass('hide').text('...');
    $('.info').off().removeClass('enable').text('');
}

function robotHandler(event){
    $('.icon').off();
    $('p').text(event.data.queue.map(str => str[0]).join('->')).removeClass('hide');
    console.log($('p').text());
    $('.button:eq(0)').click({queue: event.data.queue,sum: 0},aHandler);
    $('.button:eq(1)').click({queue: event.data.queue,sum: 0},bHandler);
    $('.button:eq(2)').click({queue: event.data.queue,sum: 0},cHandler);
    $('.button:eq(3)').click({queue: event.data.queue,sum: 0},dHandler);
    $('.button:eq(4)').click({queue: event.data.queue,sum: 0},eHandler);

    $('.button:eq('+Number(event.data.queue.shift().split('')[1])+')').click();
}

function enableOthers(target){
    $('.button').each(function(index){
        if(!$(this).children("span").is(':visible')){
            $(this).addClass("enable");
        }
    });
}

function disableOthers(target){
    $('.button').each(function(index){
        if(this!==target){
            $(this).off().removeClass('enable');
        }
    });
}

function getRandomValue(target, data){
    var request=$.ajax({
        type:'GET',
        async: true,
        url: 'ajax5',
        
        beforeSend: function(xhr){
            console.log('Before Send..');
        },

        success: function(number, textStatus, jqXHR){
            console.log("textStatus: "+textStatus);
            $(target).removeClass("enable").children("span").text(number);
            data.sum+=Number(number);
            enableOthers(target);
            
            console.log(data.sum);
            if(!$("span").is(':hidden')){
                $('.info').addClass("enable").click({result: data.sum},bubbleHandler).click().off();
            }

            switch(data.queue.shift()){
                case 'A0': $('.button:eq(0)').click({queue: data.queue,sum: data.sum},aHandler).click(); break;
                case 'B1': $('.button:eq(1)').click({queue: data.queue,sum: data.sum},bHandler).click(); break;
                case 'C2': $('.button:eq(2)').click({queue: data.queue,sum: data.sum},cHandler).click(); break;
                case 'D3': $('.button:eq(3)').click({queue: data.queue,sum: data.sum},dHandler).click(); break;
                case 'E4': $('.button:eq(4)').click({queue: data.queue,sum: data.sum},eHandler).click(); break;
            }
        },

        error: function(xhr,textStatus){
            console.log("error: "+xhr);
            console.log("textStatus: "+textStatus);
        },

        complete: function(){
            console.log("finished");
        }
    });
    $('#button').one('mouseleave',function(){
        request.abort();
    });
}

function aHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    getRandomValue(this, event.data);
}

function bHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    getRandomValue(this, event.data);
}

function cHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    getRandomValue(this, event.data);
}

function dHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    getRandomValue(this, event.data);
}

function eHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    getRandomValue(this, event.data);
}

function bubbleHandler(event){
    $(this).text(event.data.result);
    $(this).removeClass("enable");
}

function getRandomClick(){
    var queue=[];
    while(queue.length < 5){
        var rv=transToLittle(getRandomNumber());
        if(!queue.includes(rv)){
            queue.push(rv);
        }
    }
    return queue;
}

function transToLittle(rv){
    switch(rv){
        case 0: return 'A0';
        case 1: return 'B1';
        case 2: return 'C2';
        case 3: return 'D3';
        case 4: return 'E4';
    }
}

function getRandomNumber(){
    return Math.round(Math.random() * 4);
}
