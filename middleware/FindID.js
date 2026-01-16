import User from "../db/UserModel.js";
export const findUserByID= async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({msg:"user not found"})
      req.user=user
    next();
  } catch (error) {
    res.status(400).json({msg:"invalid id"})
  }
}