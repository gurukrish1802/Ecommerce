const mongoose=require("mongoose")
const productSchema =new mongoose.Schema(
    {
    title:{type:String,required:true,unique:true},
    des:{type:String,required:true,},
    img:{type:String,required:true}, 
    catogery:{type:Array},
    star:{type:Number},
    size:{type:String,},
    color:{type:String,},
    prize:{type:String,required:true},
   
    },
    {timestamps:true}
);



module.exports=mongoose.model("Product",productSchema);