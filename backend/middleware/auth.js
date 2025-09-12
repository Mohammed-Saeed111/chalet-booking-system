import jwt from 'jsonwebtoken';

// Express middleware to verify JWT from Authorization header
// Expected format: Authorization: Bearer <token>
export default function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'secret';

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      // attach decoded payload to request
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}



