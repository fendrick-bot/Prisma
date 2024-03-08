const prisma = require("../prisma");
const CookieToken = require("../utils/cookieToken");


const signup = async (req , res , next) => {
    const {name , email , password} = req.body();
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

module.exports = {signup};
