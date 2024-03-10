const prisma = require("../prisma");
const CookieToken = require("../utils/cookieToken");
const { getuser } = require("../utils/jwtAuth");


const signup = async (req , res , next) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        res.status(400).json({
            success:false,
            error:"please enter all feilds"
        })
    }
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    });
    CookieToken(user , res , next);
}

const loginuser = async (req , res , next) => {
    const {email , password} = req.body;
    if(!email || !password){
        return res.json({
            "success":false,
            "error":"please enter all fields"
        });
    }

    const data = await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(!data){
        return res.json({
            success:false,
            error:"user not exist"
        });
    }

    if(data.password != password){
        return res.json({
            success:false,
            error:"invalid login credientals"
        })
    }

    CookieToken(data , res , next);
    next();
}


const authUser = (req , res , next) => {
    const token = req.headers.cookie.split('=')[1];
    if(!token) return res.json({success:false , "error":"user is not authourized"});
    const user = getuser(token);
    req.user = user;
    next();
}


module.exports = {signup , authUser , loginuser};
