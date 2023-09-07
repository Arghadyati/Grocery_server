const exp=require("express") 
const fs=require("fs");
const Product=require("../model/Product_mod")
const router=exp.Router()

router.post("/add",async(req,res)=>{

 var objpimg=req.files.pimg;
  objpimg.mv("./public/product_img/"+objpimg.name,async(err)=>{
    if(err){
        throw err;
    }else{
     var isobj={ category:req.body.category,
      pname:req.body.pname,
      pprice:req.body.pprice,
      pd:req.body.pd,
      pimg:objpimg.name
     };

    await Product.create(isobj);
    res.json({msg:"Ins Product"});

    }
  })


});
   



router.get("/sel",async(req,res)=>{
    var data=await Product.aggregate([
 {
    $lookup:{
     from:"categories",
    localField:"category",
    foreignField:"_id",
    as:"catdata"
    }
 },
    ]);

    res.json(data);
});

router.post("/del",async(req,res)=>{
  var id=req.body.id;
  
  var dtata=await Product.findById(id);

  fs.unlinkSync("./public/product_img/"+dtata.pimg);

  await Product.findByIdAndDelete(id);

  res.json({msg:"delete product"});
});

module.exports=router;