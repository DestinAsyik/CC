const jwt = require('jsonwebtoken');
const { User } = require('../Models');

exports.authenticateToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        console.log("Received Token:", token); 

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(decoded.user_id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message); 
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};