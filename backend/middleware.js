const jwt = require("jsonwebtoken");
const {JWT_SECRET: TOKEN} = require("./config");

function authMiddleware(req, res, next) {
    try{
        authToken = req.headers.authorization;
        if(authToken) {
            authToken = authToken.split(" ")[1];
        }
        jwt.verify(authToken, TOKEN);
        req.userId = jwt.decode(authToken).id
        next();
    }
    catch(error){
        return res.status(403).send({
            message: "You are not authorized"
        });
    }
};

module.exports = {
    authMiddleware
}