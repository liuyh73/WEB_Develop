var start=false;
var end=true;
var win=false;
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

function mix(){
    var num=0;
    var blocks=document.querySelectorAll("#ImgContainer div");
    while(num<160){
        var rn=Math.floor(Math.random()*4);
        var position=document.getElementById("Block16").value;
        if(rn===0&&!(position<=4&&position>=0)){
            exchange(blocks[position-4-1],document.getElementById("Block16"));
            num++;
        }
        if(rn===1&&position%4!==0){
            exchange(blocks[position+1-1],document.getElementById("Block16"));
            num++;
        }
        if(rn===2&&!(position<=16&&position>=13)){
            exchange(blocks[position+4-1],document.getElementById("Block16"));
            num++;
        }
        if(rn===3&&position%4!==1){
            exchange(blocks[position-1-1],document.getElementById("Block16"));
            num++;
        }
    }
}

function handleStart(){
    if(end){
        start=true;
        end=false;
        $("#StartBtn").text("End");
        //mix();
        timeCount();
    }
    else{
        showMsg();
    }
}

function canMove(target){
    var piece0=document.querySelector("#Block16");
    if(Math.abs(piece0.value-target.value)===4||(Math.abs(piece0.value-target.value)===1
        &&Math.floor((piece0.value-1)/4)===Math.floor((target.value-1)/4)))
        return true;
    return false;
}

function handleClick(event){
    if(start&&$("#PauseBtn").text()==="Pause"){
        var target=event.target;
        if(canMove(target)){
            var piece0=document.querySelector("#Block16");    
            var temp_id=target.id;
            target.id=piece0.id;
            piece0.id=temp_id;
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