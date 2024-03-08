const express = require('express');
const apiRoute = require('./router/apiRoute');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use('/api' , apiRoute);

app.listen('3000' , () => {
    console.log("app is listen at port 3000");
})

