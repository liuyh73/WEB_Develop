$(function(){
    var queue=getRandomClick();
    console.log(queue);
    $('.icon').on('click',{queue: queue},robotHandler);
    $('#button').on('mouseleave',reset);
});

function reset(){
    var queue=getRandomClick();
    $('.icon').off().on('click',{queue: queue},robotHandler);
    $('p:eq(1)').addClass('hide');
    $('p:eq(0)').addClass('hide').text('');
    $('.button').off().addClass('enable');
    $('span').addClass('hide').text('...');
    $('.info').off().removeClass('enable').text('');
}

function robotHandler(event){
    $('.icon').off();
    $('p:eq(1)').text(event.data.queue.map(str => str[0]).join('->')).removeClass('hide');
    $('p:eq(0)').removeClass('hide');

    console.log($('p:eq(0)').text());
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

function getRandomValue(target, data, err){
    var request=$.ajax({
        type:'GET',
        async: true,
        url: 'ajax5',
        
        beforeSend: function(xhr){
            console.log('Before Send..');
        },

        success: function(number, textStatus, jqXHR){
            $(target).removeClass("enable").children("span").text(number);
            data.sum+=Number(number);
            console.log("textStatus: "+textStatus);
            console.log("data.sum: "+data.sum);
            enableOthers(target);

            var preText=$('p:eq(0)').html();
            if(!err){
                switch(target){
                    case $('.button')[0]: $('p:eq(0)').html(preText+'A: 这是个天大的秘密<br/>');break;
                    case $('.button')[1]: $('p:eq(0)').html(preText+'B: 我不知道<br/>');break;
                    case $('.button')[2]: $('p:eq(0)').html(preText+'C: 你不知道<br/>');break;
                    case $('.button')[3]: $('p:eq(0)').html(preText+'D: 他不知道<br/>');break;
                    case $('.button')[4]: $('p:eq(0)').html(preText+'E: 才怪<br/>');break;
                }
            }
            else{
                switch(target){
                    case $('.button')[0]: $('p:eq(0)').html(preText+'A: 这不是个天大的秘密<br/>');break;
                    case $('.button')[1]: $('p:eq(0)').html(preText+'B: 我知道<br/>');break;
                    case $('.button')[2]: $('p:eq(0)').html(preText+'C: 你知道<br/>');break;
                    case $('.button')[3]: $('p:eq(0)').html(preText+'D: 他知道<br/>');break;
                    case $('.button')[4]: $('p:eq(0)').html(preText+'E: 是的<br/>');break;
                }
            }

            preText=$('p:eq(0)').html();
            if(!$("span").is(':hidden')){
                $('.info').addClass("enable").click({result: data.sum},bubbleHandler).click().off();
                if(!err)
                    $('p:eq(0)').html(preText+'大气泡: 楼主异步调用战斗力感人，目测不超过'+data.sum);
                else
                    $('p:eq(0)').html(preText+'大气泡: 楼主异步调用战斗力强大，目测已超过'+data.sum);
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
    var err=null;
    if(getRandomNumber()===0){
        err=new Error();
    }
    getRandomValue(this, event.data, err);
}

function bHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    var err=null;
    if(getRandomNumber()===0){
        err=new Error();
    }
    getRandomValue(this, event.data, err);
}

function cHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    var err=null;
    if(getRandomNumber()===0){
        err=new Error();
    }
    getRandomValue(this, event.data, err);
}

function dHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    var err=null;
    if(getRandomNumber()===0){
        err=new Error();
    }
    getRandomValue(this, event.data, err);
}

function eHandler(event){
    disableOthers(this);
    $(this).off().children("span").removeClass('hide');
    var err=null;
    if(getRandomNumber()===0){
        err=new Error();
    }
    getRandomValue(this, event.data, err);
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