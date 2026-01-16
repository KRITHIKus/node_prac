import { body,validationResult } from "express-validator";
import User from "../db/UserModel.js";


export const userValidation = [
    body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be String"),

    body("email")
     .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Inavlid email ")
    .normalizeEmail()
    .custom(async(value)=>{
        const user = await User.findOne({email:value})
        if(user){
            throw new Error("email is taken")
        }
        return true
    }),

    body("password")

    .notEmpty().withMessage("password is required")
    .isLength({min:6}).withMessage("Password must be at least 6 characters")

   
]

export const validateReq= async(req,res,next)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    next();
}