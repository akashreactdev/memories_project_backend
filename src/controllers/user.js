import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async(req,res) => {
    const {firstName,lastName,email,password} = req.body
   try{
    const existingUser = await User.findOne({email:email});
    if(existingUser){
       return res.status(400).json({message:"Email Already exist"})
    }
    const result = await User.create({
        name:`${firstName} ${lastName}`,
        email:email, 
        password: bcrypt.hashSync(password)
    })
    const token = jwt.sign({email:result.email,id:result._id},"text",{expiresIn :"1hr"});
    res.status(201).json({result,token})
   }catch(error){
    res.status(500).send({message:"Something went wrong",error:error})
   }
}

export const signin = async(req,res) => {
    const {email,password} = req.body;
    try{
        const existingUser = await User.find({email});
        console.log("existingUser",existingUser)
        if(!existingUser){
            res.status(404).json({message:"User Does't exist"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser[0].password)
        if(!isPasswordCorrect){
            res.status(400).json({message:"Invalid credentias"})
        } 
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1h"});
        res.status(200).json({result:existingUser[0],token});
    }catch(error){
        res.status(500).send({message:"Something went wrong",error:error})
    }
}