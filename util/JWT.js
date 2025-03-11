const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.userInfo;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).send('Unauthorized: Token expired');
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).send('Unauthorized: Invalid token');
        } else {
            res.status(401).send('Unauthorized: ' + error.message);
        }
    }
}

module.exports.createToken = async userInfo => {
    return jwt.sign(
        {userInfo},
        `${secret}`,
        {
            expiresIn: 60 * 60 * 24,
            issuer: 'bghong7g'
        }
    );
}