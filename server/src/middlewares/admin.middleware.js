const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = isAdmin;
