const jwt = require('jsonwebtoken')
const {ADMIN_USER_TYPE} = require("../constants");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
     if(decodedToken.userType !== ADMIN_USER_TYPE){
         return res.status(403).json({permission: "You don't have permission to perform this action"})
     }
    next()
}
