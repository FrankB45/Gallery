const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: 'No authorization header provided'});
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token'});
        }
        req.user = user;
        next();
    });

}