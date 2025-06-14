const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    procurement_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Procurement',
        required: true,
      },
    ],
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    xendit_invoice_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    paid_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
