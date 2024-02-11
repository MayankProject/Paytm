const jwt = require("jsonwebtoken")
const User = require("./db/schemas")

require('dotenv').config()
const JwtPass = process.env.JWT_PASS

const authenticationCheck = async (req, res, next)=>{
    const token = req.headers.token
    if (!token) return res.status(401).json({
        "message": 'Unauthorized Request!'
    })
    
    const verified = jwt.verify(token, JwtPass)
    if (verified){
        const user = await User.findOne({
            email: verified.email
        })
        req.user = user;
        next();
    }
    else{
        res.status(401).json({
            message: 'Unauthorized Access Detected!'
        })
    }
}


module.exports = {
    authenticationCheck
}