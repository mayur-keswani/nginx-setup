const router = require('express').Router()

router.post("/verify-token", (req, res, error) => {
//   if (req.get("Authorization")){

    if (req.get("Authorization").split(" ").reverse()[0].toString() === "1234"){
         console.log(" Verified");
         res.status(200).json({ active: true });
    }
        

    else {
      console.log("N. Verified");
      return res.status(401).json({ active: false });
    }
    
//   }
//   else{
//     console.log("N. G. Headers");
//     res.status(500).json({active:false})
//   }
   
});



module.exports=router