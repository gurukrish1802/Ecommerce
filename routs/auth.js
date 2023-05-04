const router =require("express").Router();

const CryptoJS=require("crypto-js");
const User = require("../models/user");
const product = require("../models/product");





//Register
router.post("/reg",(req,res)=>
{
    const newUser=new User({
        userName:req.body.userName,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_WD).toString()

    });
    newUser.save().then(result=>{
        res.redirect("/")
    })
    .catch(err=>{console.log(err)})
        
    })
    //Login    

router.post("/login",async(req,res)=>
{
    try{
        const user= await User.findOne({userName:req.body.userName})
        !user&&res.status(401).json("wrong user")
        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_WD)
        const Opassword=hashedPassword.toString(CryptoJS.enc.Utf8)
     
        
        if(Opassword==req.body.password){  
           
            const userval =user
            const pro=await product.find()
        
               
                res.render("home.ejs",(val=userval,prod=pro))
                                   
        
        }
        else{
           res.status(401).json("PassWord is Wrong")
        }

        



    }
    catch(err){
        console.log(err)
    }
    
})






module.exports=router;