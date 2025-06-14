const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('School', SchoolSchema);
