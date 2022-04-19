require('dotenv').config({ debug: true });
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function jwtAuthenticate(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        res.status(401);
        return res.json({message:'JWT token missing.'})
    }

    jwt.verify(token, jwtSecret, function(err, decoded){
        if (err){
            console.log(err)
            switch (err.name){
                case 'TokenExpiredError':
                    res.status(401);
                    return res.json({message:'Token expired.'})
                    break;
                case 'JsonWebTokenError':
                    res.status(401);
                    return res.json({message:'Token validation failed.'})
                    break;
            }
        }

        console.log(decoded);

        req.token = decoded;

        next();
    })





}

module.exports = jwtAuthenticate;