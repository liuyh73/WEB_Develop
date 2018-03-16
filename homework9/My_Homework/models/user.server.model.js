var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    id: Number,
    telphone: Number,
    email: String,
    password: String
});

mongoose.model('user',userSchema);