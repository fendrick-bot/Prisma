const prisma = require("../prisma");

const postBlog = async (req , res , next) => {
    const {title , body} = req.body;
    const authorId = req.user.id;
    const image = "null";
    const slug = title.split(" ").join("-");
    const likeCount = 0;
    if(!title || !body || !authorId){
        return res.json({
            success:false,
            "error":"please enter all Fields"
        });
    }
    const data = await prisma.post.create({
        data:{
            title,
            body,
            author:{connect:{id:authorId}},
            Image:image,
            slug,
            likeCount
        }
    });
    res.data = data;
    next();
}

const getAlldata = async (req , res , next) => {
    const user = req.query.username;
    if(!user){
        return res.json({
            success:false,
            error:"please provide username"
        })
    }
    const data = await prisma.user.findUnique({
        where:{
            username:user
        },
        include:{
            posts:true,
            followers:true,
            following:true,
        }
    })
    res.data = data;
    next();
}

module.exports = {postBlog , getAlldata};