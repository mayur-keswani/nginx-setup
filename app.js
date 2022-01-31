const express = require('express');
const app = express();
const AuthRoutes = require('./routes/auth');
const UserRoutes = require('./routes/user');

// app.use("/image/:imageUrl", (req, res, next) => {
//   res.status(200).send(req.params);
// });


app.use(UserRoutes);

app.use(AuthRoutes);

app.listen(8000,()=>{
    console.log("You are live !")
})