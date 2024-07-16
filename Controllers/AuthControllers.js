const {Router}=require('express')
const express=require('express');
const User = require('../models/UserModel');
const bcrypt =require('bcryptjs')

const router=express.Router();

router.signup=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        if(!username || !email || !password){
            return res.status(401).json("Fill all the fields!")
        }
        const user=await User.findOne({email:email})
        if(user){
            return res.status(401).json("email already exists!")
        }
        if(password.length<=5){
            return res.status(401).json("minimum length for passwrod is 6")
        }
        const enpas=await bcrypt.hash(password,8)
        const data=new User({
            username,
            email,
            password:enpas
        })
        await data.save();
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json("some error in signup!")
    }
}

router.login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(401).json("Fill all the fields!")
        }
        const isEmail=await User.findOne({email:email})
        if(!isEmail){
            return res.status(401).json("this user doesn't exist!")
        }
        const ispas=await bcrypt.compare(password,isEmail.password)
        if(!ispas){
            return res.status(401).json("incorrect password!")
        }
        res.status(201).json(isEmail)
    } catch (error) {
        console.log(error)
        res.status(500).json("some error in login!")
    }
}

module.exports=router