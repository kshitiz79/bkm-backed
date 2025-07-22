const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please enter a valid phone number'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  service: {
    type: String,
    enum: [
      'Investment Management',
      'Market Alerts',
      'UpLearn Program',
      'Algo Trading Software',
      'Portfolio Management',
      'Risk Assessment',
      'Other',
      ''
    ],
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  source: {
    type: String,
    enum: ['contact-page', 'home-page', 'other'],
    default: 'contact-page'
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

// Virtual for full contact info
contactSchema.virtual('fullContactInfo').get(function() {
  return `${this.name} (${this.email}) - ${this.phone}`;
});

// Method to mark as resolved
contactSchema.methods.markAsResolved = function() {
  this.status = 'resolved';
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);