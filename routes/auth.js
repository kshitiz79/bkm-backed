const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Admin login with hardcoded credentials
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check hardcoded credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@bkmglobal.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'BKM@Admin123';

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate a simple session token (in production, use JWT)
    const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        email: adminEmail,
        token: sessionToken,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/auth/verify
// @desc    Verify admin session
// @access  Private
router.post('/verify', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Simple token verification (decode and check timestamp)
    try {
      const decoded = Buffer.from(token, 'base64').toString('ascii');
      const [email, timestamp] = decoded.split(':');

      // Check if token is less than 24 hours old
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (tokenAge > maxAge) {
        return res.status(401).json({
          success: false,
          message: 'Token expired'
        });
      }

      if (email !== (process.env.ADMIN_EMAIL || 'admin@bkmglobal.in')) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Token valid',
        data: {
          email,
          role: 'admin'
        }
      });

    } catch (decodeError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });
    }

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Token verification failed'
    });
  }
});

module.exports = router;