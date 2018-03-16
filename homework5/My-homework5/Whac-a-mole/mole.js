var gameStart=false;
var clock;
var time=30;
var theLastMole;
window.onload=function(){
	var map=document.getElementById("map");
	for(var i=1;i<=60;i++){
		var but=document.createElement("button");
		but.className="old_mole";
		map.appendChild(but);
	};
	reset();
	var Start_Stop_Button=document.querySelector("#nav button");
	Start_Stop_Button.addEventListener('click',Start_Stop_Game);	

	map.onclick=handleClickMole;

}
function reset(){
	gameStart=false;
	document.getElementsByTagName("input")[1].value=0;
	document.getElementsByTagName("input")[0].value=30;
	time=30;
}
function Start_Stop_Game(){
	if(!gameStart){
		if(time===0)	reset();
		gameStart=true;
		document.getElementsByTagName("button")[1].textContent="Playing";
		document.getElementsByTagName("input")[0].value=time;
		if(time===30) handleRandomMole();
		timeCount();
	}
	else{
		time=document.getElementsByTagName("input")[0].value;
		clearTimeout(clock);
		gameStart=false;
		document.getElementsByTagName("button")[1].innerHTML="Stop";
	}
}

function handleClickMole(event){
	if(gameStart){
		var but=event.target;
		var score=document.getElementsByTagName("input")[1];
		if(but.className==="old_mole new_mole"){
			score.value++;
			but.classList.remove("new_mole");
			handleRandomMole();
		}
		else if(but.className==="old_mole"){
			if(score.value>0)	score.value--;
		}
	}
}

function handleRandomMole(){
	var number=Math.floor(Math.random()*60);
	var mole=document.getElementsByClassName("old_mole")[number];
	mole.classList.add("new_mole");
	theLastMole=mole;
}

function timeCount(){
	if(time<=0){
		document.getElementsByTagName("button")[1].textContent="GameOver";
		document.getElementsByTagName("input")[0].value=0;		
		gameStart=false;
		theLastMole.classList.remove("new_mole");
		alert("Game Over!\n"+"Your score is: "+document.getElementsByTagName("input")[1].value);
		return;
	}
	document.getElementsByTagName("input")[0].value=time;
	time--;
	clock=setTimeout("timeCount()",1000);
}

