import mongoose from "mongoose";
const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        trim:true
    },
     password:{
        type:String,
        required:true
    },
        email:{
        type:String,
        required:true,
        unique:true
    },
    verified:{
            type:Boolean,
            default:false
        }
    });
    export const User = mongoose.model("user",userSchema);