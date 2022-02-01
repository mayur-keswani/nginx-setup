const express = require('express');
const app = express();
const AuthRoutes = require('./routes/auth');
const UserRoutes = require('./routes/user');



app.use(UserRoutes);

app.use(AuthRoutes);

app.listen(8000,()=>{
    console.log("You are live !")
})