const express = require('express');
const { body } = require('express-validator');
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus
} = require('../controllers/contactController');

const router = express.Router();

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  
  body('service')
    .optional()
    .isIn([
      'Investment Management',
      'Market Alerts',
      'UpLearn Program',
      'Algo Trading Software',
      'Portfolio Management',
      'Risk Assessment',
      'Other',
      ''
    ])
    .withMessage('Invalid service selection'),
  
  body('source')
    .optional()
    .isIn(['contact-page', 'home-page', 'other'])
    .withMessage('Invalid source')
];

// Routes

// @route   POST /api/contact
// @desc    Create new contact submission
// @access  Public
router.post('/', contactValidation, createContact);

// @route   GET /api/contact
// @desc    Get all contacts (admin only)
// @access  Private (you can add auth middleware later)
router.get('/', getAllContacts);

// @route   GET /api/contact/:id
// @desc    Get single contact by ID
// @access  Private (you can add auth middleware later)
router.get('/:id', getContactById);

// @route   PUT /api/contact/:id/status
// @desc    Update contact status
// @access  Private (you can add auth middleware later)
router.put('/:id/status', [
  body('status')
    .isIn(['new', 'in-progress', 'resolved', 'closed'])
    .withMessage('Invalid status value')
], updateContactStatus);

module.exports = router;