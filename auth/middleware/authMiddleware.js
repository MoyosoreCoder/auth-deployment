const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";  // Ensure SECRET_KEY is set

const authMiddleware = (req, res, next) => {
    try {
        // Get token from headers
        const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided or malformed token." });
        }

        const token = authHeader.split(" ")[1]; // Extract the actual token

        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;  // Attach user info to the request
        next();  // Proceed to the next middleware or route handler

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = authMiddleware;
