const Router=require('express')
const express=require('express');
const Contact = require('../models/ContactModel');

const router=express.Router();

router.newContact=async(req,res)=>{
    try {
        const {user,Cname,Cnumber,Cmail,Cpic}=req.body
        if(!user || !Cname || !Cnumber){
            return res.status(400).json("give the contact name and number!")
        }
        const iscon=await Contact.findOne({user:user,Cnumber:Cnumber})
        if(iscon){
            return res.status(401).json("this number is already exist in your contact!")
        }
        const data=new Contact({
            user,Cname,Cnumber,Cmail,Cpic
        })
        await data.save()
        return res.status(201).json("Contact has been added successfully!")
        
    } catch (error) {
        console.log(error)
        res.status(500).json("error occured in creating contact!")
    }
}

router.updateContact=async(req,res)=>{
    try {
        const {user,Cname,upname,upnum,upmail}=req.body
        const con=await Contact.findOneAndUpdate(
            {user:user,Cname:Cname},
            {Cname:upname,Cnumber:upnum,Cmail:upmail},
            {new:true}
        )
        if(!con){
            return res.status(400).json("user not found")
        }
        return res.status(200).json("updated successfully!")
    } catch (error) {
        console.log(error)
        res.status(500).json("error occured in updating contact!")
    }
}

router.deleteContact=async(req,res)=>{
    try {
        const {user,Cname}=req.body

        const isdel=await Contact.findOneAndDelete({user:user,Cname:Cname})
        if(!isdel){
            return res.status(400).json("user not found")
        }
        return res.status(200).json("user deleted successfully!")
    } catch (error) {
        console.log(error)
        res.status(500).json("error occured in deleting contact!")
    }
}

router.getContact=async(req,res)=>{
    try {
        const {username}=req.body
        const Cdata=await Contact.find({user:username})
        if(!Cdata){
            return res.status(400).json("contact doesnt exist")
        }
        res.status(200).json(Cdata)
    } catch (error) {
        res.status(500).json("error occured in getting contact!")
        console.log(error)
    }
}

module.exports=router