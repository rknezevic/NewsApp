const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: messages.AUTH.INVALID_TOKEN });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: messages.AUTH.INVALID_TOKEN });
  }
};

const permissionCheck = (...allowedRoles) => {
    return (req, res, next) => {
      console.log(req.user.role);
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: messages.PERMISSIONS.FORBIDDEN });
      }
      next();
    };
  };
  
module.exports = { authMiddleware, permissionCheck };
