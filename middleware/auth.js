const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // console.log(req.headers)
    console.log(req.cookie);
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log('hello', token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).send('invalid token !'); //invalid token
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT