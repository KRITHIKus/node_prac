import bcrypt from 'bcrypt'
import User from '../db/UserModel.js'
import crypto from 'crypto'

import jwt from "jsonwebtoken"


const SALT_ROUNDS=10;
export const signup= async (req,res)=>{
    try{
const {name,email,password,role}=req.body
if(!name || !email || !password){
    return res.status(400).json({msg:"required all fields"})
}
const existEmail= await User.findOne({email})
if(existEmail){
    return res.status(409).json({msg:"eamil is taken "})
}
const hashed= await bcrypt.hash(password,SALT_ROUNDS)
const user = new User({name,email,password:hashed,role:role || "user"})
await user.save()
const returnToUSer= ({_id:user._id,name:user.name,email:user.email,role:user.role})
return res.status(201).json({msg:"user created sucessfully",userDetails:returnToUSer})
    }
    catch(err){
return res.status(500).json({msg:`server error , error=> ${err}`}) 
    }
}

export const login=async(req,res)=>{
   
try {
     const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({msg:"both reuired"})
    }
    const user = await User.findOne({email})
    if(!user){
         return res.status(409).json({msg:"enter valid email"})
    } 

    const match= await bcrypt.compare(password,user.password)
    if(!match)return res.status(409).json({msg:"enter valid password"})


        //const token = crypto.randomBytes(32).toString("hex")
        
        const token = jwt.sign({userId:user._id},process.env.JWT, {expiresIn:"1h"})
        user.authToken=token
        await user.save()

    res.cookie("auth_token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })

        const usersafe={_id:user._id,name:user.name,email:user.email,role:user.role}
return res.status(200).json({msg:"login successfull",userDetails:usersafe})

} catch (error) {
    return res.status(500).json({msg:`internal server error,  error => ${error}`})
}
}

export const logout= async(req,res)=>{
    try {
        const token = req.cookies.auth_token;
        if(!token){
            return  res.status(401).json({msg:"No Token Found"})
        }
        const user= await User.findOne({authToken:token})
        if(user){
            user.authToken=null
            await user.save()
        } 
        res.clearCookie("auth_token",{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        return res.status(200).json({msg:"logout sucessfull"})
    } catch (error) {
        return res.status(500).json({msg:`Logout failed :${error}`})
    }
}

export const passwordUpdate= async(req,res)=>{
    try {
        const{password,newPassword}=req.body
const user = await User.findById(req.params.id)
        if(!password || !newPassword){
            return res.status(400).json({msg:"enter old password and new password"})
        }
         if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
const match=await bcrypt.compare(password,user.password)
if(!match){
      return res.status(400).json({msg:"enter correct password"})
}

const hashed= await bcrypt.hash(newPassword,SALT_ROUNDS)
user.password=hashed
await user.save()
 res.status(200).json({msg:"password updated sucessfully"})
    } catch (error) {
        
    }
}