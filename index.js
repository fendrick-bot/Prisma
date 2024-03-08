const express = require('express');
const userRoute = require('./router/HomeRoute');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const app = express();

app.use('/' , userRoute);

app.listen('3000' , () => {
    console.log("app is listen at port 3000");
})

