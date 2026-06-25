const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  landlordName:    { type: String, required: true },
  propertyAddress: { type: String, required: true },
  violation: {
    clause_text:        String,
    legal_reference:    String,
    plain_english:      String,
    recommended_action: String,
  },
  letterText: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'awaiting', 'resolved'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Letter', letterSchema);