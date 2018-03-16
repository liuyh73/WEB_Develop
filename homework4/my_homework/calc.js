/*
	此计算器再算完一个表达式之后，可以直接输入+，-，*，/将此答案作为第一个运算数参与运算；
	当输入数字式，之前的答案就被清空，默认为重新输入新的表达式
*/

// 为了区分*，×和/，÷，用expr表示最终传入eval函数的表达式；txt表示表单控件input的value值；
// buttons表示计算器中所有button的数组；calculated表示计算状态，是否计算完毕。
var expr="",txt,buttons,calculated;

// onload：在页面加载完毕之后给每一个button添加onclick事件
window.onload = function(){
	txt=document.getElementsByTagName('input')[0];
	buttons=document.getElementsByTagName('button');

	for(var i=0;i< buttons.length;i++){
		buttons[i].onclick=(
			function(k){
				return function(){Content(k);}
			})(i);
	}
}

// Content：每次点击按钮，expr和txt相应做出改变
function Content(k){

	//判断是否为刚开始输入算式的状态
	if(txt.value==="0"&&expr==="")	txt.value="",calculated=0;

	//switch 识别不同的button
	switch(buttons[k].value){
		case 'CE': 
				expr=""; txt.value="0";
				break;
		case '←': 
				expr=expr.slice(0,expr.length-1);
				tmp=txt.value.slice(0,txt.value.length-1);
				if(tmp==="")	txt.value="0";
				else txt.value=tmp;
				break;
		// ×÷+- 单独判断：是的输入不可能有两个运算符号相连，且第一位输入不可能是运算符号
		case '×': 
				calculated=0;
				if(first_char(expr))	{txt.value="0"; return 0;}
				if(last_char(expr))	
					expr=expr.slice(0,expr.length-1),txt.value=txt.value.slice(0,txt.value.length-1);
				expr+='*';
				txt.value+='×';
				break;
		case '÷': 
				calculated=0;
				if(first_char(expr))	{txt.value="0"; return 0;}
				if(last_char(expr))	
					expr=expr.slice(0,expr.length-1),txt.value=txt.value.slice(0,txt.value.length-1);
				expr+='/';
				txt.value+='÷';
				break;
		case '+':
				calculated=0;
				if(first_char(expr))	{txt.value="0"; return 0;}
				if(last_char(expr))	
					expr=expr.slice(0,expr.length-1),txt.value=txt.value.slice(0,txt.value.length-1);
				expr+='+';
				txt.value+='+';
				break;
		case '-':
				calculated=0;
				if(first_char(expr))	{txt.value="0"; return 0;}
				if(last_char(expr))	
					expr=expr.slice(0,expr.length-1),txt.value=txt.value.slice(0,txt.value.length-1);
				expr+='-';
				txt.value+='-';
				break;
		case '=': 
				calculate(expr);
				break;
		default: 
				if(calculated)	txt.value="",expr="",calculated=0;
				expr+=buttons[k].value;
				txt.value+=buttons[k].value;
				break;
	}
}

// first_char 判断此输入是否为第一位
function first_char(expression){
	if(expression==="")		return 1;
	return 0;
}

// last_char 判断最后一位是否为运算符号
function last_char(expression){
	if(expression[expression.length-1]==='+'||expression[expression.length-1]==='-'||expression[expression.length-1]==='/'
		||expression[expression.length-1]==='*')
		return 1;
	return 0;
}

// calculate 运算函数
function calculate(expression){
	// 正则表达式匹配不合理的运算
	// if(expression.search(/\/\//)>=0||expression.search(/\/\*/)>=0 
	// 	||expression.search(/^[\/*]/g)>=0)
	// {
	// 	alert('Invalid Expression!');
	// 	txt.value="0";
	// 	expr="";
	// 	return 0;
	// }
	if(expression===""){
		txt.value="0";
		return 0;
	}
	var temp_expr="";
	if(expression[0]!=='0')	temp_expr+=expression[0];
	else if(expression.length>=2&&expression[0]==='0'&&(expression[1]<'0'||expression[1]>'9'))	temp_expr+=expression[0];
	for(var i=1;i<expression.length-1;i++){
		if(((expression[i-1]<'0'||expression[i-1]>'9')&&expression[i-1]!=='.')&&expression[i]==='0'&&(expression[i+1]>='0'&&expression[i+1]<='9'))
			temp_expr+="";
		else
			temp_expr+=expression[i];
	}
	if(expression.length>=2) temp_expr+=expression[expression.length-1];
	expression=temp_expr;
	try{
		if(eval(expression)==Infinity||eval(expression)==-Infinity||isNaN(eval(expression))) alert("Invalid input!"),txt.value="0",expr="";
		else txt.value=parseFloat(eval(expression)).toFixed(7),expr=txt.value;
		calculated=1;
	}catch(exception){
		alert("Invalid input!");
		txt.value="0";
		expr="";
	}
}
