import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = Router();

// POST /api/auth/register - Create a new user account
router.post('/register', async (req, res) => {
  try {
    // Validate required fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ 
        status: 'error',
        message: 'All fields (name, email, and password) are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format'
      });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        status: 'error',
        message: 'Email is already registered'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash password with bcrypt
    const password_hash = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await User.create({ 
      name, 
      email, 
      password_hash,
      role: 'user' // Default role for registration
    });

    // Generate JWT token
    const payload = { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    };
    
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    // Set secure cookie with JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return success response without sensitive data
    const { password_hash: _, ...safeUser } = user.toObject();
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      user: safeUser
    });
  } catch (err) {
    logger.error('Registration error:', err);
    
    // Handle specific MongoDB errors
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'error',
        message: 'Email is already registered'
      });
    }
    
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred during registration'
    });
  }
});

// POST /api/auth/login - Authenticate user and return token
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user by email and include password_hash
    const user = await User.findOne({ email }).select('+password_hash');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    // Set secure cookie with JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return success response without sensitive data
    const { password_hash: _, ...safeUser } = user.toObject();
    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      user: safeUser
    });
  } catch (err) {
    logger.error('Login error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred during login'
    });
  }
});

// POST /api/auth/logout - Clear authentication token
router.post('/logout', (req, res) => {
  try {
    // Clear the token cookie
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0)
    });

    return res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (err) {
    logger.error('Logout error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred during logout'
    });
  }
});
export default router;