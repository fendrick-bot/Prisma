const jwt = require('jsonwebtoken');


const getToken = (user) => {
    return jwt.sign({...user} , process.env.jwt_key);
}

const getuser = (token) => {
    return jwt.verify(token , process.env.jwt_key);
}

module.exports = {getToken , getuser};