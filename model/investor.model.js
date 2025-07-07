import mongoose from "mongoose";
const investorSchema  = new mongoose.Schema({
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
    budget:{
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
     occupation: String,           
  sectorsofinterest: String ,
    isLoggedIn: {
        type: Boolean,
        default: false
      },      
    verified:{
        type:Boolean,
        default:false
    }
});
export const Investor = mongoose.model("investor",investorSchema);