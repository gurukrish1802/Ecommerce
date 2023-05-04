 const express = require("express")
 const app = express()
 const mongoose=require("mongoose")
 const dotenv= require("dotenv")
 const{urlencoded}=require("express")


 const authRoute=require("./routs/auth")
 const userRoute=require("./routs/ruser")
 const productRoute=require("./routs/rproducts")
 const cartRoute=require("./routs/rcart")
 const orderRoute=require("./routs/rorder")
const product = require("./models/product")
const user = require("./models/user")

 

 dotenv.config()
 mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("db connected"))
 .catch((err)=>{
    console.log(err);
 })
 app.set("ecomerce engine","ejs")
 app.use(express.static('public'))
 app.use('/js',express.static(__dirname +'public/js'))
 app.use('/css',express.static(__dirname +'public/css'))
 app.use('/img',express.static(__dirname +'public/img'))
 
 app.use(express.urlencoded({extended:true}))
 app.use("/api/auth",authRoute)
 app.use("/api/user",userRoute)
 app.use("/api/products",productRoute)
 app.use("/api/cart",cartRoute)
 app.use("/api/order",orderRoute)

 


 app.listen(process.env.PORT_NO,()=>{
    console.log("back server connected")
 }) 
 app.get("/",async(req,res)=>{
   const produ= await product.find()
  
  res.render("home.ejs",(val="",prod=produ))
 

 })
 app.get("/:val/home",async(req,res)=> {
  

   const produ= await product.find()
   const udval=await user.findById(req.params.val)
  
   
   res.render("home.ejs",(val=udval,prod=produ))
 
 } )
app.get("/lr",(req,res)=>{ 
   res.render("accnt.ejs",(val=""))
})

app.get("/c/:val",async(req,res)=>{
  
   const produ= await product.find()
   const udval=await user.findById(req.params.val)
  
   
   res.render("contacts.ejs",(val=udval,prod=produ))
})

app.get("/c/",async(req,res)=>{
  
   const produ= await product.find()

  
   
   res.render("contacts.ejs",(val='',prod=produ))
})

