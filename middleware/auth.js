const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    //Get token from header
    const token=req.header('x-auth-token');

    //Chek if no token
    if(!token){
        return res.status(401).json({
            msg: 'No token, auth denied'
        })
    }

    //Verify token
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        //set user id
        req.user=decoded.user;
        next()
    }catch (error) {
        req.status(401).json({
            msg: 'Token is not valid'
        })
    }
}