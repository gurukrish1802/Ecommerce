const user = require("../models/user")
const userdetails=require("./auth")

const jwt = require("jsonwebtoken")
const verifytoken=(req,res,next)=>{
    const authHeader=userdetails.accessToken
    if(authHeader){
      const token = authHeader
        jwt.verify(token,process.env.PASS_WD,(err,user)=>{
            if(err) res.status(403).json("Token in INVALID!!!!")
            req.user=user
            next()
        })

    }
    else{
        return res.status(401).json("You are not authenticated(((())))")


    }
}

const verifytokenandauth = (req,res,next)=>{
  verifytoken=(req,res,()=>{ if(req.user.id==req.params.id||req.user.isAdmin){
    next()
  }
  else{
    res.status(403).json("You are not allowed")
  }
 

})
}
module.exports={verifytoken,verifytokenandauth}