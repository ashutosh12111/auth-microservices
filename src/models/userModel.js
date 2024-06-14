const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        requiure:true,
        unique:true
    },
    password:{
        type: String, required: true
    },
    isVerfied:{
        type:Boolean ,default:false,
    },
    walletBalence:{
        type:String, default:'0'
    }
})


// module.export = mongoose.model("User", userSchema)
module.exports = User = mongoose.model("users", userSchema);
