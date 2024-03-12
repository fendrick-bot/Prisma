const { Router } = require("express");
const { signup, loginuser, authUser, getuserByUsername } = require("../controllers/userControllers");
const { getAllpost } = require("../controllers/postControllers");

const router = Router();

router.get('/' , authUser , (req , res) => {
    res.json(req.user);
})

router.get('/all' , (req , res) => {
    console.log(req.params);
    return res.json({success:false});
    // res.json({user:res.user , posts : res.posts});
})

router.post('/signup' , signup , (req , res) => {
    res.status(200).json(res.data);
})

router.post('/login', loginuser , (req , res) => {
    res.json(res.data);
})



module.exports = router;
