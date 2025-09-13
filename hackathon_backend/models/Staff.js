const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  position: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  department: {
    type: String,
    required: true,
    trim: true,
    enum: ['Management', 'Sales', 'Inventory', 'Finance', 'HR', 'Operations', 'Staff'],
    default: 'Staff'
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  experience: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    match: [/^[\+]?[0-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'terminated'],
    default: 'active'
  },
  avatar: {
    type: String,
    default: ''
  },
  emergencyContact: {
    name: { type: String, trim: true },
    relationship: { type: String, trim: true },
    phone: { type: String, trim: true }
  },
  documents: [{
    type: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  }],
  notes: {
    type: String,
    trim: true,
    maxlength: 1000
  }
}, {
  timestamps: true
});

// Index for search functionality
staffSchema.index({ name: 'text', position: 'text', email: 'text' });
staffSchema.index({ department: 1 });
staffSchema.index({ status: 1 });

// Virtual for full name
staffSchema.virtual('fullName').get(function() {
  return this.name;
});

// Virtual for years of service
staffSchema.virtual('yearsOfService').get(function() {
  const now = new Date();
  const joinDate = new Date(this.joinDate);
  const diffTime = Math.abs(now - joinDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 365);
});

module.exports = mongoose.model('Staff', staffSchema);
