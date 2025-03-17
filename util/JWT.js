const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports.verifyToken = function (required = true) {
    //  为有无token设计不同的数据获取验证
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(' ')[1] : null
        if (token) {
            try {
                const decoded = jwt.verify(token, secret);
                req.user = decoded.userInfo;
                next();
            } catch (error) {
                console.error("JWT Verification Error:", error);
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({msg: 'Unauthorized: Token expired'});
                } else if (error.name === 'JsonWebTokenError') {
                    return res.status(401).json({msg: 'Unauthorized: Invalid token'});
                } else {
                    return res.status(401).json({msg: 'Unauthorized: ' + error.message});
                }
            }
        } else if (required) {
            return res.status(401).json({msg: 'Please enter token'});
        } else {
            next()
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