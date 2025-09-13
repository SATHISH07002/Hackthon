const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expenseNumber: {
    type: String,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Rent', 'Utilities', 'Logistics', 'Marketing', 'Office Supplies', 'Maintenance', 'Insurance', 'Other']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'cheque', 'upi', 'other'],
    required: true
  },
  vendor: {
    name: { type: String, trim: true },
    contact: { type: String, trim: true },
    phone: { type: String, trim: true }
  },
  receipt: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  recurring: {
    isRecurring: { type: Boolean, default: false },
    frequency: { 
      type: String, 
      enum: ['weekly', 'monthly', 'quarterly', 'yearly'],
      required: function() { return this.recurring.isRecurring; }
    },
    nextDue: { type: Date }
  }
}, {
  timestamps: true
});

// Index for search and filtering
expenseSchema.index({ category: 1 });
expenseSchema.index({ status: 1 });
expenseSchema.index({ createdAt: -1 });

// Pre-save middleware to generate expense number
expenseSchema.pre('save', async function(next) {
  if (this.isNew && !this.expenseNumber) {
    const count = await this.constructor.countDocuments();
    this.expenseNumber = `E-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Expense', expenseSchema);
