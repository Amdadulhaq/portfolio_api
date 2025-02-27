const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  img: { type: String },
  codeLink: { type: String },
  liveLink: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
