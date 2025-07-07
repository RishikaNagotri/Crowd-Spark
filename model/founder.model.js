import mongoose from "mongoose";
const founderSchema  = new mongoose.Schema({
    username:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true
    },
    requiredBudget:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    startupName:{
        type:String,
        required:true
    },
    sector:{
        type:String,
        required:true
    },
    startupDescription:{
        type:String
    },
    isLoggedIn: {
        type: Boolean,
        default: false
      },      
    verified:{
        type:Boolean,
        default:false
    }
});
export const Founder = mongoose.model("founder",founderSchema);