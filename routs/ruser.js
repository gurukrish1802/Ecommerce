

const router =require("express").Router();
const CryptoJS=require("crypto-js")
const user = require("../models/user")




//Display
router.get("/:val",async(req,res)=>{
 
    
    const userval = await user.findById(req.params.val)
     

        res.render("userd.ejs",{val:userval}) 
    
    
        
 

})
//Update

router.post("/update",async(req,res)=>{
    const userdetails= await user.findById(req.params.id)
    if(req.body.userName==""){
        req.body.userName=userdetails.userName
    }
    if(req.body.password==""){
        req.body.password=userdetails.password

    }
    if(req.body.email==""){
        req.body.email=userdetails.email

    }

    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_WD).toString()
    }

    


        try{
            const upusername=await user.findByIdAndUpdate(req.params.id,{
                $set:req.body
            
            },{new:true})
          
            res.redirect("/")
        
             
        }
    
    catch{
            res.status(401)
        }


})
//delete
router.get("/d/delete",async(req,res)=>{
    try{
        const userdel= await user.findByIdAndDelete(req.params.id)
        
        res.redirect("/")
    }
    catch{
        console.log(err)
    }

})
//Alluser
router.get("/:id/all",async(req,res)=>{

    
    
    try{
        
        const users=await user.find()
        res.render("alluser.ejs",(vals=users),(id=user._id))
    }catch(err){
        res.status(500).json(err)
    }
   

    


})





module.exports=router;

