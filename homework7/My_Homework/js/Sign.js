var userList=[];
var usernameState=idState=telphoneState=emailState=false;

window.onload=function(){
    $("span.msg").addClass("hide");
    $("#username").bind('blur',handleUsername);
    $("#id").bind('blur',handleId);
    $("#telphone").bind('blur',handleTelphone);
    $("#email").bind('blur',handleEmail);
    document.getElementsByTagName("button")[0].onclick = handleReset;
    document.getElementsByTagName("button")[1].onclick = handleRegister;
};

function handleUsername(){
    var re=/^[a-zA-Z][a-zA-Z\d_]{5,17}$/;
    var msg=document.getElementsByClassName("msg")[0];

    if(re.test($("#username").val())){
        msg.classList.add("hide");
        $("#usernameCheck").html('<i class="fa fa-check-square"></i>');
        usernameState=true;
    }
    else{
        msg.classList.remove("hide");
        $("#usernameCheck").html('');
        usernameState=false;
    }
}

function handleId(){
    var re=/^[1-9]\d{7}$/;
    var msg=document.getElementsByClassName("msg")[1];

    if(re.test($("#id").val())){
        msg.classList.add("hide");
        $("#idCheck").html('<i class="fa fa-check-square"></i>');
        idState=true;
    }
    else{
        msg.classList.remove("hide");
        $("#idCheck").html('');
        idState=false;
    }
}

function handleTelphone(){
    var re=/^[1-9]\d{10}$/;
    var msg=document.getElementsByClassName("msg")[2];

    if(re.test($("#telphone").val())){
        msg.classList.add("hide");
        $("#telphoneCheck").html('<i class="fa fa-check-square"></i>');
        telphoneState=true;
    }
    else{
        msg.classList.remove("hide");
        $("#telphoneCheck").html('');
        telphoneState=false;
    }
}

function handleEmail(){
    var re=/^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/;
    var msg=document.getElementsByClassName("msg")[3];

    if(re.test($("#email").val())){
        msg.classList.add("hide");
        $("#emailCheck").html('<i class="fa fa-check-square"></i>');
        emailState=true;
    }
    else{
        msg.classList.remove("hide");
        $("#emailCheck").html('');
        emailState=false;
    }
}

function handleReset(){
    $("span.msg").addClass("hide");
    $("span.repeatMsg").html('');
    $("input").val("");
    $("#usernameCheck").html('');
    $("#idCheck").html('');
    $("#telphoneCheck").html('');
    $("#emailCheck").html('');
}

function handleRegister(){
    handleUsername();handleId();handleTelphone();handleEmail();

    var msg=document.getElementsByClassName("msg")[4];
    if(usernameState && idState && telphoneState && emailState){

        msg.classList.add("hide");
        var newuser={};
        newuser.username=$("#username").val();
        newuser.id=$("#id").val();
        newuser.telphone=$("#telphone").val();
        newuser.email=$("#email").val();

        userList.push(newuser);
    }
    else{
        msg.textContent="请正确填写信息之后再提交!";
        msg.classList.remove("hide");
        return false;
    }
}
