
const router = require("express").Router();
// const { default: got } = import("got");
const { createWriteStream } = require("fs");
const axios =require('axios');
const fs =require('fs')


router.get("/index", (req, res, error) => {
  return res.json({ message: "You can now access this page!" });
});


router.get("/:image", async(req, res,error) => {
 
  
   let url = `https://wireframe.intellimedianetworks.com/gohtv/images/profile/expression14.jpg`;
//   let url =
//     "https://images.unsplash.com/photo-1640622656891-04960a7aa678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80";
  console.log(url)
  res.setHeader("Content-Type", "image/jpeg");

  axios.get(url, { responseType: "stream" })
  .then(response => {  
      // Saving file to working directory  
      response.data.pipe(res)
   })  
   .catch(error=>{
      console.log(error)
   })
  
  
});

router.get("/image/:imageurl", (req, res, error) => {
  return res.json({
    message: `You have visted image page with param: ${req.params.imageurl}`,
  });
});
module.exports=router