import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/me - Get current user profile
router.get('/', auth, async (req, res) => {
  try {
    // req.user is set by auth middleware and contains decoded JWT data
    const { id, email, role } = req.user;
    
    // Optional: Fetch fresh user data from database
    const user = await User.findById(id).select('-password_hash');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    return res.json({
      status: 'success',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

export default router;