const mongoose=require("mongoose")
const cartSchema =new mongoose.Schema(
    {
    userID:{type:String,required:true,unique:true},
    products:[{type:String}]
  
    
    
    },
    {timestamps:true}
);



module.exports=mongoose.model("Cart",cartSchema);