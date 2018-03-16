var validator = {
    form: {
        username: {
            status: false,
            errorMessage: '6~18位英文字母,数字或下划线;英文字母开头'
        }, 
        id: {
            status: false,
            errorMessage: '8位数字,不能以0开头'
        }, 
        telphone: {
            status: false,
            errorMessage: '11位数字,不能以0开头'
        }, 
        email: {
            status: false,
            errorMessage: '按照讲义中的规则,不能有数字或特殊字符'
        },
        password: {
            status: false,
            errorMessage: '6~12位数字、大小写字母、中划线、下划线'
        }
    }, 

    isUsernameValid: function (username){
        return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
    },

    isIdValid: function (id){
        return this.form.id.status = /^[1-9]\d{7}$/.test(id);
    },

    isTelphoneValid: function (telphone){
        return this.form.telphone.status = /^[1-9]\d{10}$/.test(telphone);
    },

    isEmailValid: function (email){
        return this.form.email.status = /^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
    },

    isPasswordValid: function(password){
        return this.form.password.status = /^[0-9a-zA-Z_\-]{6,12}$/.test(password);
    },

    isFieldValid: function(fieldname, value){
        var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
        return this["is" + CapFiledname + 'Valid'](value);
    },

    isFormValid: function(){
        return this.form.username.status && this.form.id.status && this.form.telphone.status && this.form.email.status && this.form.password.status;
    },

    getErrorMessage: function(fieldname){
        return this.form[fieldname].errorMessage;
    },

    isAttrValueUnique: function(registry, user, attr){
        for (var key in registry) {
            if (registry.hasOwnProperty(key) && registry[key][attr] == user[attr]) return false;
        }
        return true;
    }
}

if (typeof module == 'object') { // 服务端共享
    module.exports = validator
}
