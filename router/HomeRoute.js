const { Router } = require("express");

const router = Router();

router.get('/' , (req , res) => {
    res.json({
        success:true
    })
})

module.exports = router;