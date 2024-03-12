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

module.exports = {signup , authUser , loginuser , getuserByUsername};