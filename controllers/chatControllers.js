const prisma = require("../prisma");


const getAllChatList = async (req , res , next) => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                userIds: {
                  hasSome: [req.user.id],
                },
            },
            include:{
                users:{
                    where:{
                        NOT: {
                            id:req.user.id
                        },
                    }
                }
            }
        })
        res.data = data;
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
                  hasSome: [req.user.id , req.params.id],
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
    const {reciverId , chatId , text} = req.body;
    try {
        const data = await prisma.message.create({
            data:{
                senderId:req.user.id,
                reciverId:reciverId,
                chatId:chatId,
                text:text
            }
        })
        console.log(data);
    } catch (error) {
        return res.status(400).json({success:false , msg:"something went wrong"});
    }
    next();
}


module.exports = {getAllChatList , getChatData , addChat};