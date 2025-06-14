const mongoose = require('mongoose');

const ProcurementSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    books: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'validated', 'activated'],
      default: 'pending',
    },
    isActivated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Procurement', ProcurementSchema);
