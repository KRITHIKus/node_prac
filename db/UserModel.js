import mongoose from "mongoose";

let userSchema =new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["user","admin"],default:"user"},
    authToken:{type:String},
    createdAt:{type:Date,default:Date.now}

},{timestamps:true})

const User= mongoose.model("User",userSchema)
export default User 