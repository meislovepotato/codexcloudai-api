//authMiddleware.js
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data to the request object
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Role-based access control
export const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

export default { authorize, authenticate };
