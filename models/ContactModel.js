const express=require('express')
const mongoose=require('mongoose')

const ContactSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    Cname:{
        type:String,
        required:true
    },
    Cnumber:{
        type:String,
        required:true
    },
    Cmail:{
        type:String
    },
    Cpic:{
        type:String
    }
})

const Contact=mongoose.model("contact",ContactSchema)
module.exports=Contact