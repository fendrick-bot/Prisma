const { Router } = require('express');
const postBlog = require('../controllers/postControllers');
const { authUser } = require('../controllers/userControllers');

const router = Router();

router.get('/' , (req , res) => {
    res.json({
        success:true,
        msg:"post route is working"
    })
})

router.post('/postblog' , [authUser , postBlog] , async (req , res) => {
    res.json(res.data);
})

module.exports = router;