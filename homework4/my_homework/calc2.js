(function(){
var initial=true;
var calculated=false;

window.onload=function(){
	var button=document.getElementById("buttons");
	button.addEventListener('click',buttonOnClick);
};

function buttonOnClick(event){
	var btn=event.target;
	switch(btn.value) {
		case "CE":
			handleReset();
			break;
		case "←":
			handleBack();
			break;
		case "=":
			handleCalculate();
			break;
		default:
			handleClick(btn.value);
			break;
	}
}

function handleReset() {
	document.getElementsByTagName("input")[0].value="0";
	initial=true;
	calculated=false;
}

function handleBack() {
	var content=document.getElementsByTagName("input")[0].value;
	if(initial)	return;
	else if(content.length===1) handleReset();
	else document.getElementsByTagName("input")[0].value=content.slice(0,content.length-1);
}

function handleCalculate() {
	var expression = document.getElementsByTagName("input")[0].value;
	var result;
	try {
		result =getResult(expression);
		document.getElementsByTagName("input")[0].value=result;
		calculated=true;
	}
	catch(e){
		handleReset()
		alert(e);
	}
}

function handleClick(text) {
	if(calculated) {
		if(isOperator(text)) {
			document.getElementsByTagName("input")[0].value+=text;
			calculated=false;
		} else{
			handleReset();
			input(text);
		}
	}else {
		input(text);
	}
}

function input(text){
	if(initial&&text==="0") 	return;
	else if(initial && text!=="0")	{
		if(text==="." || isOperator(text)) {
			document.getElementsByTagName("input")[0].value+=text;
		}
		else{
			document.getElementsByTagName("input")[0].value=text;
		}
		initial = false;
	}
	else {
		document.getElementsByTagName("input")[0].value+=text;
	}
}

function isOperator(text) {
	return text === "+" || text === "-" || text === "*" || text === "/";
}

function isNumber(num) {
	var reg=/^-?\d+\.?\d*$/;
	return reg.test(num);
}

function getWeight(item){
	switch(item) {
		case "*": 
		case "/": return 2;
		case "-":
		case "+": return 1; 
		default: return 0; 
	}
}

function compareWeight(item1, item2){
	return getWeight(item1)>=getWeight(item2);
}

function getRPN(expression) {
	var reg=/(\+|\-|\*|\/|\(|\))/;
	var expArr=expression.split(reg).filter(item => item!=="");
	var numberStack=[],operatorStack=[];
	for(var i=0;i<expArr.length;i++){
		if(isNumber(expArr[i]))	numberStack.push(expArr[i]);
		else if(expArr[i]==='(' || isOperator(expArr[i])){
			
			if(expArr[i]==='(') operatorStack.push(expArr[i]);
			else {
				var top=operatorStack[operatorStack.length-1];
				while(compareWeight(top,expArr[i])&&operatorStack.length>0){
					numberStack.push(top);
					operatorStack.pop();
					top=operatorStack[operatorStack.length-1];
				}
				operatorStack.push(expArr[i]);
			}

		}
		else if(expArr[i]===')'){
			top = operatorStack.pop();
			while(top!=='('){
				if(operatorStack.length===0)	throw Error("Invalid Input!");
				numberStack.push(top);
				top=operatorStack.pop();
			}
		}
	}
	while(operatorStack.length>0) numberStack.push(operatorStack.pop());
	return numberStack;
}

function getResult(expression){
	var arr=getRPN(expression);
	alert(arr);
	var stack=[];
	for(var i=0;i<arr.length;i++){
		if(isNumber(arr[i]))	stack.push(arr[i]);
		else {
			num1=stack.pop();
			num2=stack.pop();

			switch (arr[i]) {
				case "+":
					stack.push(Add(num1,num2));
					break;
				case "-":
					if(num2===undefined)	stack.push(-num1);
					stack.push(Sub(num2,num1));
					break;
				case "*":
					stack.push(Mut(num1,num2));
					break;
				case "/":
					stack.push(Div(num2,num1));
					break;
			}
		}
	}
	return stack[0];
}

function Add(num1,num2){
	var len1;
    try {
     	len1 = num1.toString().split(".")[1].length;
    } catch (e) {
      	len1 = 0;
    }
    var len2;
    try {
      	len2 = num2.toString().split(".")[1].length;
    } catch (e) {
      	len2 = 0;
    }

    var power=Math.pow(10,Math.max(len1,len2));
    if(len1>=len2){
    	num1=Number(num1.toString().replace(".",""));
    	num2=Number(num2.toString().replace(".",""))*Math.pow(10,len1-len2);
    }
    else{
    	num1=Number(num1.toString().replace(".",""))*Math.pow(10,len2-len1);
    	num2=Number(num2.toString().replace(".",""));
    }
    return (num1+num2)/power;
}
function Sub(num1,num2) {
	var len1;
    try {
     	len1 = num1.toString().split(".")[1].length;
    } catch (e) {
      	len1 = 0;
    }
    var len2;
    try {
      	len2 = num2.toString().split(".")[1].length;
    } catch (e) {
      	len2 = 0;
    }
    var power=Math.pow(10,Math.max(len1,len2));
    var result=(num1*power-num2*power)/power;

    return result;
}
function Mut(num1,num2) {
	var len=0;
	try {
		len+=num1.toString().split(".")[1].length;
    } catch (e) {}
    try {
     	len+=num2.toString().split(".")[1].length;
    } catch (e) {}
    var result=Number(num1.toString().replace("."))
    	*Number(num2.toString().replace("."))/
    	Math.pow(10,len);
    return result;
}

function Div(num1,num2){
	var len1;
    try {
     	len1 = num1.toString().split(".")[1].length;
    } catch (e) {
      	len1 = 0;
    }
    var len2;
    try {
      	len2 = num2.toString().split(".")[1].length;
    } catch (e) {
      	len2 = 0;
    }
    with(Math){
    	var result=Number(num1.toString().replace(".",""))/
    		Number(num2.toString().replace(".",""))/
    		pow(10,len1-len2);
    }
    return result;
}

})();