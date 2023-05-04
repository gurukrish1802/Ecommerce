const { findById } = require("../models/product");
const product = require("../models/product");
const user=require("../models/user")
const mongoose =require("mongoose")

const router =require("express").Router();

router.get("/product/",async(req,res)=>{
    const prod = await product.find()
          
    
    res.render("products.ejs",(val="",{prod}))

})


router.get("/product/:id",async(req,res)=>{
            let ud=await user.findById(req.params.id)
            let prod = await product.find()
            res.render("products.ejs",(val=ud,{prod:prod}))
       
   
})

router.get("/pddetails/:val/:prod",async(req,res)=>{
    const userval= await user.findById(req.params.val)
    const products= await product.findById(req.params.prod)
    const pro =await  product.find()
    res.render("productdetails.ejs",(val=userval,prod=products,produ=pro))
})
router.get("/pddetails//:prod",async(req,res)=>{
    const products= await product.findById(req.params.prod)
    const pro =await  product.find()
    res.render("productdetails.ejs",(val="",prod=products,produ=pro))

})
router.get("/product/adminall/:val",async(req,res)=>{
    const userval= await user.findById(req.params.val)
    const products =await  product.find()
    res.render("adpro.ejs",(prod=products,val=userval))
})

router.post("/:val/addproducts",async(req,res)=>{
   
    const newproduct= new product(req.body)
      newproduct.save().then(result=>{
       
        console.log("Saved Successfully");
      })
      .catch(err=>{console.log(err)})
      const userval= await user.findById(req.params.val)
      const products =await  product.find()
      res.render("adpro.ejs",(prod=products,val=userval))
})

router.get("/pddetails/:val/:prod/deleteproducts",async(req,res)=>{
  
   
 
    const dele= await product.findByIdAndDelete(req.params.prod)
    
     
        
      const userval= await user.findById(req.params.val)
      const products =await  product.find()
      res.render("adpro.ejs",(prod=products,val=userval))

})

router.get("addcart//:prod",async(req,res)=>{
    window.prompt("Loging first")
    res.redirect("/lr")




})


module.exports=router;