const mongoose = require('mongoose');

const newsPostSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
    enum: ['worldwide', 'local', 'sport', 'economy', 'entertainment'],
    required: true,
  },
  isBreaking: {
    type: Boolean,
    default: false,
  },
  breakingExpiresAt: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('NewsPost', newsPostSchema);
