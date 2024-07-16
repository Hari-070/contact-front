const express=require('express')
const mongoose=require('mongoose')
const { login, signup } = require('./Controllers/AuthControllers')
const {newContact, getContact, deleteContact, updateContact}=require('./Controllers/ContactController')
const cors=require('cors')


const app=express()
app.use(express.json());
app.use(cors())
const PORT=3000

mongoose.connect("mongodb+srv://harianand2102:EAxjido8HRI0yP5p@contact.iw3rnmy.mongodb.net/?retryWrites=true&w=majority&appName=Contact")

app.post("/login",cors(),login)
app.post("/signup",cors(),signup)
app.post("/addContact",cors(),newContact)
app.post("/getContact",cors(),getContact)
app.post("/deleteContact",cors(),deleteContact)
app.post("/update",cors(),updateContact)

app.listen(PORT,()=>{
    console.log(`app is running in the port ${PORT}`)
})
