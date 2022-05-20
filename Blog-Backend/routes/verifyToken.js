const jwt = require('jsonwebtoken');
const secret = require('../SecretKey')

module.exports = function(req,res,next){
    var token = req.query.token;
    if (!token){
        token = req.body.token
    }
    if (!token){
        token = req.query.token
    }
    if(!token) return res.status(401).send('Access Denied');

    try{
        console.log("token received")
        //it will return back the id
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next()
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}