const prisma = require("../prisma");
const CookieToken = require("../utils/cookieToken");
const { getuser } = require("../utils/jwtAuth");
const bcrypt = require('bcrypt');

const signup = async (req , res , next) => {
    const {name , email , password , username} = req.body;
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if(!name || !email || !password || !username){
        return res.status(400).json({
            success:false,
            error:"please enter all feilds"
        })
    }

    const data = await prisma.user.findUnique({
        where:{
            username:username
        }
    })

    if(data){
        return res.json({
            success:false,
            error:"username already exist"
        })
    }

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hash,
            username
        }
    });
    CookieToken(user , res , next);
}

const loginuser = async (req , res , next) => {
    const {username , password} = req.body;
    if(!username || !password){
        return res.json({
            "success":false,
            "error":"please enter all fields"
        });
    }

    const data = await prisma.user.findUnique({
        where:{
            username:username
        }
    });

    if(!data){
        return res.json({
            success:false,
            error:"user not exist"
        });
    }

    const compare = bcrypt.compareSync(password, data.password);

    if(!compare){
        return res.json({
            success:false,
            error:"email or password wrong"
        })
    }

    CookieToken(data , res , next);

    next();
}


const authUser = (req , res , next) => {
    const token = req.headers.cookie?.split('=')[1];
    if(!token) return res.json({success:false , "error":"user is not authourized"});
    const user = getuser(token);
    req.user = user;
    next();
}

const getuserByUsername = async (req , res , next) => {
    console.log(req.params);
    const user = await prisma.user.findUnique({
        where:{
            username:req.params.username
        }
    })
    if(!user){
        return res.json({status:false , error:"user not exist"})
    }
    res.user = user;
    next();
}

const addFollower = async (req , res , next) => {
    const {followingId} = req.body;
    const userId = req.user.id;
    try {
        const data1 = await prisma.following.create({
            data:{
                followingId,
                userId
            }
        })
        const data2 = await prisma.followers.create({
            data:{
                userId:followingId,
                followerId:userId
            }
        })
        if(data1 && data2){
            res.data = {following:data1 , follower:data2}
        }
        next();
    } catch (error) {
        return res.status(400).json({success:false , msg:"something went wrong"});
    }
    
}

const finduser = async (req , res , next) => {
    const name = req.params.name;
    try {
        const data = await prisma.user.findMany({
            where:{
                OR:[
                {
                    username:{
                        startsWith:name
                    }
                },
                {
                    email:{
                        startsWith:name
                    }
                },
                {
                    name:{
                        startsWith:name
                    }
                }
            ]
            }
        })
        res.data = data;
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false , msg:"something went wrong"});
    }
    next();
}

module.exports = {signup , authUser , loginuser , getuserByUsername , addFollower , finduser};
