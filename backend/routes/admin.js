import { Router } from 'express';
import auth from '../middleware/auth.js';

const router = Router();

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// GET /api/admin/dashboard - Admin dashboard data
router.get('/dashboard', auth, authorizeAdmin, (req, res) => {
  try {
    return res.status(200).json({
      status: 'success',
      message: 'Admin dashboard access granted',
      admin: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

export default router;