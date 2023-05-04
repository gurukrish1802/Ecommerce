const router =require("express").Router();
const user = require("../models/user");

const product = require("../models/product");
const order = require("../models/order");




router.get("/addorder/:val/:prod",async(req,res)=>{
    const dborder = await order.find({"userID":req.params.val})

    if(dborder!=""){
         
         
        
        try{
            const userorder=await order.findOneAndUpdate({"userID":req.params.val},{
                $push:{
                    products:req.params.prod
                }
            })
            
            
              
              
            
            
            const userval= await user.findById(req.params.val)
            const products= await product.findById(req.params.prod)
            res.render("productdetails.ejs",(val=userval,prod=products))
          
        
        
             
        }
    
    catch{
            res.status(401)
        }
        

    



    }else{
    const orde = await new order({
        userID:req.params.val,
        products:[req.params.prod ]

    })
    await orde.save().then(()=>{
        console.log("order ADDED");
    }).catch(err=>{
        console.log(err)

    })
    const userval= await user.findById(req.params.val)
    const products= await product.findById(req.params.prod)
    res.render("productdetails.ejs",(val=userval,prod=products))
    
}

})


router.get("/order/:val",async(req,res)=>{

   
   
    const userval = await user.findById(req.params.val)
    if(await order.findOne({"userID":req.params.val})){
        const orde = await order.findOne({"userID":req.params.val})
        const cid = await orde.products
    
        const produ=[]

        for (let i = 0; i < cid.length; i++) {
             produ [i] = await product.findById(cid[i])
            
            
        } 
        
       
        
        res.render("order.ejs",(val=userval,prod=produ))

         
    }else{
        res.render("order.ejs",(val=userval,prod=""))
        

    }
    

  
   

   
})
router.get("/remove/:val/:prod",async(req,res)=>{
    try{
        const userorder=await order.findOneAndUpdate({"userID":req.params.val},{
            $pull:{
                products:req.params.prod
            }
        })
         
    const userval = await user.findById(req.params.val)
    if(await order.findOne({"userID":req.params.val})){
        const orde = await order.findOne({"userID":req.params.val})
        const cid = await orde.products
    
        const produ=[]

        for (let i = 0; i < cid.length; i++) {
             produ [i] = await product.findById(cid[i])
            
            
        }
        
       
        console.log(produ);
        res.render("order.ejs",(val=userval,prod=produ))

         
    }else{
        res.render("order.ejs",(val=userval,prod=""))
        

    }
    

  
   
 
    }

catch{
        res.status(401)
    }
    

    

})
router.get("/allorder/:val",async(req,res)=>{

   
   
    const userval = await user.findById(req.params.val)
    if(await order.find()){
        const orde = await order.find()
        console.log(orde);
       
        const cid=[]
       
        var count=0;
        for ( i=0 ; i < orde.length; i++) {
            let n=orde[i].products.length
            console.log("n"+n);
             for (j=0; j <n; j++) {
                console.log("this j"+j);

            
                cid[count]= await orde[i].products[j]
             
                console.log(cid[count])
                count++
             
            
                
            }
            


          
           
       } 
       

    
        const produ=[]
        

        for (let i = 0; i < cid.length; i++) {
            produ [i] = await product.findById(cid[i])
           
           
             
            
            
        } 
       
       
        
        res.render("order.ejs",(val=userval,prod=produ))

         
    }else{
        res.render("order.ejs",(val=userval,prod=""))
        

    }
    

  
   

   
})

router.get("/addorder//:prod",async(req,res)=>{
  
    res.redirect("/lr")




})








module.exports=router;


  