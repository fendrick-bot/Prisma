const { Router } = require("express");
const { authUser } = require("../controllers/userControllers");
const { getAllChatList, getChatData, addChat } = require("../controllers/chatControllers");


const router = Router();


router.get('/' , [authUser , getAllChatList] , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

router.get('/c/:id' , [authUser , getChatData] , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

router.post('/message' , addChat , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})


module.exports = router;