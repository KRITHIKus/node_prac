import { use } from "react";
import User from "../db/UserModel.js";
import {fileURLToPath} from "url"
import path from "path";
import fs from "fs/promises"

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)



export const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ msg: "name and password is required" });
    }
    const user = new User({ name, password });
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getusers = async (req, res) => {
  try {
    const { filter, value } = req.query;
    let users;
    if (filter && value) {
      const query = { [filter]: new RegExp(value, "i") };
      users = await User.find(query);
    } else {
      users = await User.find();
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const ById = async (req, res) => {
  res.json(req.user);
};

export const updateUser = async (req, res) => {
  try {
    const { name, password, role, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({
          msg: "Name and password ,role,email are required for full update",
        });
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, password, role, email },
      { new: true, runValidators: true },
    );
    if (!updateUser) return res.status(404).json({ msg: "User not found" });
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const Deleteuser = await User.findByIdAndDelete(req.params.id);
    if (!Deleteuser) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "user deleted sucessfully", Deleteduser: Deleteuser });
  } catch (error) {
    res.status(400).json({ msg: err.message });
  }
};

export const read = async (req, res) => {
  try {
    res.status(201).json({ msg: req.mess });
  } catch (error) {
    res.status(500).json({ msg: "internal server error inc", error });
  }
};

export const PrimeNUM = async (req, res) => {
  try {
    const { number } = req.body;
    const num = parseInt(number);
    function prime(n) {
      if (n === 2) return true;
      if (n <= 1) return false;
      if (n % 2 === 0) return false;

      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }

    function generate(n) {
      let res = [];
      for (let i = 2; i <= n; i++) {
        let isp = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
          if (i % j === 0) {
            isp = false;
            break;
          }
        }
        if (isp) {
          res.push(i);
        }
      }
      return res.join(" ");
    }

    return res.status(200).json({
      msg: prime(num)
        ? `${num} is a prime number`
        : `${num} is not a prime number`,
      Primenumbers: `List of Prime Numbers: ${generate(num)}`,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Server error" });
  }
};

export const downl= async(req,res)=>{
try {
  const filepath=path.join(__dirname,"../n1.txt")

res.download(filepath,"n1.rxt",(err)=>{
  if(err){
    return res.status(500).json({msg:"error in downloading file",error:err})
  }
})
} catch (error) {
      res.status(500).send("Something went wrong");

}
}
export const uploadHandler=async(req,res)=>{
   try {
    console.log("file recived:",req.file)
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    res.status(201).json({msg:"file upload sucessfull",})
   } catch (error) {
    res.status(500).json({ msg: "Upload failed" });
   }
}
