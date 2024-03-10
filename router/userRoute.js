const { Router } = require("express");
const { signup, loginuser, authUser } = require("../controllers/userControllers");

const router = Router();

router.get('/' ,authUser, (req , res) => {
    res.json(req.user);
})

router.post('/signup' , signup , (req , res) => {
    res.status(200).json(res.data);
})

router.post('/login', loginuser , (req , res) => {
    res.json(res.data);
})

module.exports = router;
