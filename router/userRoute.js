const { Router } = require("express");
const { signup } = require("../controllers/userControllers");

const router = Router();


router.get('/' , (req , res) => {
    res.json({
        success:true
    })
})

router.post('/signup' , signup , (req , res) => {
    res.status(200).json(data);
})

module.exports = router;
