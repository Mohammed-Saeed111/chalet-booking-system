import { Router } from 'express';
import auth from '../middleware/auth.js';

const router = Router();

// Example protected route (e.g., dashboard or bookings)
router.get('/dashboard', auth, (req, res) => {
  // req.user is set by the auth middleware (contains token payload)
  return res.json({ message: 'Protected route access granted', user: req.user });
});

export default router;



