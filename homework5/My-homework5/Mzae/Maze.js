var cheatFlag;
var start;
window.onload=function(){
	reset();
	document.getElementById("Start").onmouseover=gameStart;
	document.getElementById("End").onmouseover=gameOver;
	document.getElementById("map").onmouseleave=gameCheat;
	var walls=document.querySelectorAll("#map div");
	for(var i=0;i<5;i++){
		walls[i].onmouseover=gameLose;
		walls[i].onmouseleave=wallsReset;
	}
}

function reset(){ 
	cheatFlag=false;
	start=false;
	document.getElementById("map").className="";
}

function gameStart(){
	document.getElementById("info").textContent="";
	start=true;
	cheatFlag=false;
	document.getElementById("map").className="map";
}

function gameCheat(){
	if(start)
		cheatFlag=true;
}

function gameLose(){
	if(start){
		document.getElementById("info").textContent="You Lose!";
		document.getElementById("info").className='lose';
		this.classList.add('cheat_style');
		reset();
	}
}

function wallsReset(){
	this.classList.remove('cheat_style');
}

function gameOver(){
	if(start){
		if(cheatFlag){
			document.getElementById("info").textContent="Don't cheat,you should start from the 'S' and move to the 'E' inside the maze!";
			document.getElementById("info").className='cheat';
		}
		else{
			document.getElementById("info").textContent="You Win!";
			document.getElementById("info").className='win';
		}
	}
	else{
		document.getElementById("info").textContent="Don't cheat,you should start from the 'S' and move to the 'E' inside the maze!";
		document.getElementById("info").className='cheat';
	}
	reset();
}