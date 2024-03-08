const express = require('express');
const userRoute = require('./userRoute');
const router = express.Router()

router.get('/' , (req , res) => {
    res.json({
        success:true
    })
})

router.use(userRoute);

module.exports = router;