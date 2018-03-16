var start=false;
var end=true;
var win=false;
var cur=new PuzzleNode([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
var des=new PuzzleNode([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
window.onload=function(){
    var map=document.getElementById("ImgContainer");
    for(var i=1;i<=16;i++){
        var piece=document.createElement("div");
        piece.className="panda";
        piece.id="Block"+i;
        piece.value=i;
        map.appendChild(piece);
    }

    map.onclick=handleClick;
    var switchBtn=document.getElementById("SwitchBtn");
    var startBtn=document.getElementById("StartBtn");
    var pauseBtn=document.getElementById("PauseBtn");
    var autoBtn=document.getElementById("AutoBtn");

    switchBtn.addEventListener("click",handleSwitch);
    startBtn.addEventListener("click",handleStart);
    pauseBtn.addEventListener("click",handlePause);
    autoBtn.addEventListener("click",handleAuto);
}

function handleSwitch(){
    if(end){
        if($("#SwitchBtn").text()==="Mouse"){
            $("body").removeClass("BodyPandaClass").addClass("BodyMouseClass");
            $("#SwitchBtn").text("Panda");
            $("#ImgContainer div").removeClass("panda").addClass("mouse");
            $("#BtnContainer button").removeClass("BtnPandaClass").addClass("BtnMouseClass");
        }
        else{
            $("body").removeClass("BodyMouseClass").addClass("BodyPandaClass");
            $("#SwitchBtn").text("Mouse");
            $("#ImgContainer div").removeClass("mouse").addClass("panda");
            $("#BtnContainer button").removeClass("BtnMouseClass").addClass("BtnPandaClass");
        }
    }
}

function exchange(target,space){
    var temp_id=space.id;
    space.id=target.id;
    target.id=temp_id;
}

function Mix(){
    cur.mix();
    var blocks=document.querySelectorAll("#ImgContainer div");
    for(var i=0;i<16;i++){
        blocks[i].id="Block"+cur.stateList[i];
    }
}

function handleStart(){
    if(end){
        start=true;
        end=false;
        $("#StartBtn").text("End");
        Mix();
        timeCount();
    }
    else{
        showMsg();
    }
}

function canMove(target){
    var piece0=document.querySelector("#Block16");
    if(piece0.value-target.value==4){
        cur.move(0);
        return true;
    }
    if(piece0.value-target.value==-4){
        cur.move(2);
        return true;
    }
    if(Math.floor((piece0.value-1)/4)===Math.floor((target.value-1)/4)&&piece0.value-target.value==1){
        cur.move(3);
        return true;
    }
    if(Math.floor((piece0.value-1)/4)===Math.floor((target.value-1)/4)&&piece0.value-target.value==-1){
        cur.move(1);
        return true;
    }
    return false;
}

function handleClick(event){
    if(start&&$("#PauseBtn").text()==="Pause"){
        var target=event.target;
        if(canMove(target)){
            var piece0=document.querySelector("#Block16");  
            exchange(target,piece0);  
            document.querySelector("#Steps input").value++;
            check();
        }
    }
}

function handlePause(){
    if(start){
        if($("#PauseBtn").text()==="Pause"){
            $("#PauseBtn").text("Go");
            clearTimeout(clock);
        }
        else{
            $("#PauseBtn").text("Pause");
            timeCount();
        }
    }
}

function timeCount(){
    document.querySelector("#Time input").value++;
	clock=setTimeout("timeCount()",1000);
}

function handleAuto(){
    var blocks=document.querySelectorAll("#ImgContainer div");
    var piece0=document.querySelector("#Block16");
    var puzzle=new Puzzle(cur,des);
    puzzle.run();
    switch(puzzle.path[1]){
        case 0:
            exchange(blocks[piece0.value-4-1],piece0);
            break;
        case 1:
            exchange(blocks[piece0.value+1-1],piece0);
            break;
        case 2:
            exchange(blocks[piece0.value+4-1],piece0);
            break;
        case 3:
            exchange(blocks[piece0.value-1-1],piece0);
            break;
    }
    cur.move(puzzle.path[1]);
    document.querySelector("#Steps input").value++;
    check();
}

function reset(){
    start=false;
    end=true;
    win=false;
    $("#StartBtn").text("Start");
    $("#PauseBtn").text("Pause");
    clearTimeout(clock);
    document.querySelector("#Time input").value=0;
    document.querySelector("#Steps input").value=0;
    cur=new PuzzleNode([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    des=new PuzzleNode([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    var blocks=document.querySelectorAll("#ImgContainer div");
    for(var i=0;i<=15;i++)
        blocks[i].id="Block"+(i+1);
}

function check(){
    for(var i=1;i<=16;i++){
        var block=document.querySelector("#Block"+i);
        if(block.value!==i) return;
    }
    win=true;
    showMsg();
}

function showMsg() {
	$("#Container").addClass("blur");
	setTimeout(function() {
        var Msg;
        if(win)
            Msg = $("<div class=\"MsgDiv\"><p>You win with "+document.querySelector("#Time input").value+" seconds and "+
                document.querySelector("#Steps input").value+" steps!</p></div>");
        else
            Msg = $("<div class=\"MsgDiv\"><p>You end the game and lose!</p></div>");
        Msg.click(function() {
			$("#Container").removeClass("blur");
            $(".MsgDiv").remove();
            reset();
		});
		$("body").append(Msg);
	}, 100);
}