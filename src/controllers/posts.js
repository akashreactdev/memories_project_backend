import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async(req,res) => {
  try{
    const postMessage = await PostMessage.find();
    res.status(200).json({message:"Post Listed View",post:postMessage})
  }catch(error){
    res.status(404).json({message:"Post Not Found",error:error});
  }
}

export const createPost = async(req,res) => {
    const post = req.body
    const newPost = new PostMessage(post);
    try{
       await newPost.save();     
       res.status(201).json({message:"Post Created SuccessFully",post:newPost})  
    }catch(error){
        res.status(404).json({message:"Post is Not Created",error:error})
    }
}

export const updatePost = async(req,res) => {
  const id = req.params.id
  try{
      const updatedPost = await PostMessage.findByIdAndUpdate({_id:id},req.body,{new:true});
      res.status(200).send({message:"Post Update SuccessFully",updatePost:updatedPost})
    }catch(error){
      res.status(404).send({message:"Post Update SuccessFully",error:error})
    }
}

export const deletePost = async(req,res) => {
  const id = req.params.id;
  try{  
     await PostMessage.findByIdAndDelete({_id:id});
    res.status(200).send({message:"Post Deleted SuccessFully"}) 
  }catch(error){
    res.status(404).send({message:"Post is not deleted",error:error})
  }
}


export const likePost = async(req,res) => {

  const id = req.params.id;

  try{
    const post = await PostMessage.findById({_id:id});
    console.log(post)

    const index = post.likes.findIndex((id)=>id === String(req.userId))  

    if(index === -1){
      post.likes.push(req.userId)
    }else{
      post.likes = post.likes.filter((id)=>id!==String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate({_id:id},post,{new:true});
    res.status(200).send({message:"post like",updatedPost})
  }catch(error){
    res.status(404).send({message:"post is not liked",error:error})
  }
}

