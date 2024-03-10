const express = require('express');
const userRoute = require('./router/userRoute');
const postRoute = require('./router/postRoute');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/user' , userRoute);
app.use('/api/post' , postRoute);

app.listen('3000' , () => {
    console.log("app is listen at port 3000");
})
