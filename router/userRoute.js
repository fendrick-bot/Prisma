const { Router } = require("express");
const { signup, loginuser, authUser, getuserByUsername } = require("../controllers/userControllers");
const { getAlldata } = require("../controllers/postControllers");

const router = Router();

router.get('/' , authUser , (req , res) => {
    res.json(req.user);
})

router.get('/all' , getAlldata , (req , res) => {
    return res.json({success:true , data:res.data});
})

router.post('/signup' , signup , (req , res) => {
    res.status(200).json(res.data);
})

router.post('/login', loginuser , (req , res) => {
    res.json(res.data);
})



module.exports = router;
