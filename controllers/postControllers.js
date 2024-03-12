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

const getAllpost = async (req , res , next) => {
    const user = res.user;
    const posts = await prisma.post.findMany({
        where:{
            authorId:user.id
        }
    })
    res.posts = posts;
    next();
}

module.exports = {postBlog , getAllpost};