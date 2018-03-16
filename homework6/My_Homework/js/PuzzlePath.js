/*
A*算法
*/

/*
The definition of the move direction.
*/
var Direction = {
    NONE: 0,
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4
};

/*
A binary heap for the algorithm.
*/
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

/*
N-Puzzle node definition.

The value of the node must be like this:
{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16} (row = 4, col = 4)
Value 16 indicates the empty grid in the puzzle. 
*/

function NPuzzleNode(val_, row_, col_) {
    this.val=val_;
    this.row = row_;
    this.col = col_;
    this.g = 0;
    this.h = 0;
    this.parent = null;
    this.direc = null;

    for(var i=0;i<16;i++){
        if(this.val[i]==16){
            this.emptyPos=i;
        }
    }

    this.getAdjNode = function(direc) {
        var n = new NPuzzleNode(this.val.slice(), this.row, this.col);
        n.move(direc);
        return n;
    }

    this.move = function(direc) {
        var displace;
        switch (direc) {
            case Direction.LEFT:
                displace = -1;
                break;
            case Direction.UP:
                displace = -this.col;
                break;
            case Direction.RIGHT:
                displace = 1;
                break;
            case Direction.DOWN:
                displace = this.col;
                break;
            case Direction.NONE:
            default:
                displace = 0;
                break;
        }
        var goalPos = this.emptyPos + displace;
        var tmp = this.val[this.emptyPos];
        this.val[this.emptyPos] = this.val[goalPos];
        this.val[goalPos] = tmp;
        this.emptyPos = goalPos;
    }

    this.canMove = function(direc) {
        switch (direc) {
            case Direction.LEFT:
                return this.getCol(this.emptyPos) != 0;
            case Direction.UP:
                return this.getRow(this.emptyPos) != 0;
            case Direction.RIGHT:
                return this.getCol(this.emptyPos) != this.col - 1;
            case Direction.DOWN:
                return this.getRow(this.emptyPos) != this.row - 1;
            case Direction.NONE:
                return true;
            default:
                return false;
        }
    }

    this.equalTo = function(node) {
        return this.val.toString() == node.val.toString();
    }

    this.mix = function() {
        for (var i = 0; i < 160; ++i) {
            var d = Math.floor(1 + Math.random() * 4);
            if (this.canMove(d)) {
                this.move(d);
            }
        }
    }

    this.getRow = function(i) {
        return Math.floor(i / this.col);
    }

    this.getCol = function(i) {
        return Math.floor(i % this.col);
    }

    this.getF = function() {
        return this.g + this.h;
    }
};

/*
Find the successful way.
*/
function NPuzzle(src_, des_) {
    this.src = src_;
    this.des = des_;
    this.openList = new BinaryHeap();
    this.closeList = [];
    this.pathDirec = [];

    this.run = function() {
        this.openList.push(this.src);
        while (!this.openList.empty()) {

            var cur = null;
            do {
                cur = this.openList.top();
                this.openList.pop();
            } while (!this.openList.empty() && this.closeList[cur.val.toString()]);

            if (this.openList.empty() && this.closeList[cur.val.toString()]) {
                return;
            }

            this.closeList[cur.val.toString()] = true;
           
            if (cur.equalTo(this.des)) {  
                this.constructPath(cur);
                return;
            }

            for (var direc = 1; direc <= 4; ++direc) {  
                if (cur.canMove(direc)) {
                    var adj = cur.getAdjNode(direc);
                    if (!this.closeList[adj.val.toString()]) {
                        adj.parent = cur;
                        adj.direc = direc;
                        adj.g = cur.g + 1;
                        adj.h = this.getEstimate(adj);
                        this.openList.push(adj);
                    }
                }
            }
        }
    }

    this.getEstimate = function(n) {
        var val=n.val;
        var size=val.length;

        var wrongNext=0;
        for (var i=0; i<size-1;i++) {
            if (val[i]+1 != val[i + 1]) {
                wrongNext++;
            }
        }

        var manhatten = 0, geometric = 0;
        for (var i = 0; i < size; ++i) {
            if (val[i]!=16) {  
                var curR = n.getRow(i);
                var curC = n.getCol(i);
                var desR = n.getRow(val[i]-1);
                var desC = n.getCol(val[i]-1);
                var dR = curR>desR ? curR-desR : desR-curR;
                var dC = curC>desC ? curC-desC : desC-curC;
                manhatten += dR+dC;
                geometric += Math.sqrt(dR*dR+dC*dC);
            }
        }

        return 5*(1*wrongNext+2*manhatten+1*geometric);
    }

    this.constructPath = function(n) {
        if (n.parent) {
            this.constructPath(n.parent);
        }
        this.pathDirec.push(n.direc);
    }
};
