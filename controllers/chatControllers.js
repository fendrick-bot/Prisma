
const prisma = require("../prisma");
const { pusher } = require("../utils/pusher");


const getAllChatList = async (req , res , next) => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                userIds: {
                  hasSome: [req.user.id],
                },
            },
            include:{
                users:true,
            }
        })
        filterdata = data.map((value) => {
            value.users = value.users.filter((v) => {
                if(v.id != req.user.id){
                    return v;
                }
            })
            return value;
        })
        res.data = filterdata;
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false , msg:"something went wrong"});
    }
    next();
}

const getChatData = async (req , res , next) => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                userIds: {
                  hasEvery: [req.user.id , req.params.id],
                },
            },
            include:{
                message:true
            }
        })
        if(data.length === 0){
            const createChat = await prisma.chat.create({
                data:{
                    userIds:[req.user.id , req.params.id]
                }
            })
            res.data = createChat;
        }else{
            res.data = data;
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({success:true , msg:"something went wrong"});
    }
    next();
}

const addChat = async (req , res , next) => {
    const {senderId , reciverId , chatId , text} = req.body;
    pusher.trigger(`${reciverId}-${senderId}` , 'message', {
        "message": text
    });
    try {
        const data = await prisma.message.create({
            data:{
                senderId:senderId,
                reciverId:reciverId,
                chatId:chatId,
                text:text
            }
        })
        res.data = data;
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false , msg:"something went wrong"});
    }
    next();
}


module.exports = {getAllChatList , getChatData , addChat};