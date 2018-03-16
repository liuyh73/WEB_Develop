function BinaryHeap(){
	this.size=0;
	this.arr=[0];

	function cmp(a,b){
		return a.getF()<=b.getF();
	}

	this.empty=function(){
		return this.size===0;
	}

	this.push=function(x){
		var i=++this.size;
		for(;i!=1&&!cmp(this.arr[Math.floor(i/2)],x);i=Math.floor(i/2)){
			this.arr[i]=this.arr[Math.floor(i/2)];
		}
		this.arr[i]=x;
	}

	this.top=function(){
		if(this.empty())	return;
		return this.arr[1];
	}

	this.pop=function(){
		if(this.empty())	return;
		var rootEle=this.arr[1], lastEle=this.arr[this.size--];

		var child;
		for(var i=1;2*i<=this.size;i=child){
			child=2*i;
			if(child < this.size && cmp(this.arr[child+1],this.arr[child])){
				++child;
			}
			if(cmp(lastEle,this.arr[child])){
				break;
			}else{
				this.arr[i]=this.arr[child];
			}
		}
		this.arr[i]=lastEle;
	}

}

function PuzzleNode(stateList_){
	this.stateList=stateList_;
	this.g=0;
	this.h=0;
	this.parent=null;
	this.direct=null;
	
	(function(node){

		for(var i=0;i<16;i++){
			if(node.stateList[i]==16){
				node.emptyPos=i;
				return;
			}
		}
	})(this);

	this.getAdjNode = function(direction){
		var new_node=new PuzzleNode(this.stateList.slice());
		new_node.move(direction);
		return new_node;
	}

	this.move = function(direction){
		var diff;
		if(direction==0) diff=-4;
		else if(direction==1)	diff=1;
		else if(direction==2)	diff=4;
		else diff=-1;

		var targetPos=this.emptyPos+diff;
		this.stateList[this.emptyPos]=this.stateList[targetPos];
		this.stateList[targetPos]=16;
		this.emptyPos=targetPos;
	}

	this.canMove = function(direction){
		switch(direction){
			case 0:
				return !(this.emptyPos<=3&&this.emptyPos>=0);
			case 1:
				return (this.emptyPos+1)%4!==0;
			case 2:
				return !(this.emptyPos<=15&&this.emptyPos>=12);
			case 3:
				return this.emptyPos%4!==0;
			default:
				return false;
		}
	}

	this.equal = function(anotherNode){
		return this.stateList.toString() === anotherNode.stateList.toString();
	}

	this.mix = function(){
		for(var i=0;i<=160;i++){
			var rv=Math.floor(Math.random()*4);
			if(this.canMove(rv)){
				this.move(rv);
			}
		}
	}

	this.getF = function() {
		return this.g + this.h;
	}

};


function Puzzle(src_,des_){
	this.src=src_;
	this.des=des_;
	this.openList=new BinaryHeap();
	this.closeList=[];
	this.path=[];

	this.run = function(){
		this.openList.push(this.src);

		while(!this.openList.empty()){
			var curr=null;
			do{
				curr=this.openList.top();
				this.openList.pop();
			}while(!this.openList.empty() && this.closeList[curr.stateList.toString()]);

			if (this.openList.empty() && this.closeList[cur.stateList.toString()]) {
				return;
			}

			this.closeList[curr.stateList.toString()]=true;
			if(curr.equal(this.des)){
				this.constructPath(curr);
				return;
			}

			for(var direction=0;direction<=3;++direction){
				if(curr.canMove(direction)){
					var adj=curr.getAdjNode(direction);
					
					if(!this.closeList[adj.stateList.toString()]){
						adj.parent=curr;
						adj.direct=direction;
						adj.g=curr.g+1;
						adj.h=this.getEstimate(adj);
						this.openList.push(adj);
					}
				}
			}
		}
	}

	this.getEstimate = function(n) {
		var stateList = n.stateList;
		var desVal = this.des.stateList;

		var wrongNext = 0;
		for (var i = 0; i < 15; i++) {
			if (stateList[i] + 1 != stateList[i + 1]) {
				wrongNext++;
			}
		}

		var wrong = 0;
		for (var i = 0; i < 16; ++i) {
			if (stateList[i] != desVal[i]) {
				++wrong;
			}
		}

		var manhatten = 0, geometric = 0;
		for (var i = 0; i < 16; ++i) {
			if (stateList[i]!==16) {  
				var curR = Math.floor(i / 4);
				var curC = Math.floor(i / 4);
				var desR = Math.floor((stateList[i] - 1)/4);
				var desC = Math.floor((stateList[i] - 1)/4);
				var dR = curR > desR ? curR - desR : desR - curR;
				var dC = curC > desC ? curC - desC : desC - curC;
				manhatten += dR + dC;
				geometric += Math.sqrt(dR * dR + dC * dC);
			}
		}

		return 5 * (1 * wrongNext + 0 * wrong + 2 * manhatten + 1 * geometric);
	}

	this.constructPath=function(n){
		if(n.parent){
			this.constructPath(n.parent);
		}
		this.path.push(n.direct);
	}

};