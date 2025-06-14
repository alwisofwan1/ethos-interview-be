const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    price: { type: Number, required: true },
    isbn: { type: String },
    publisher: { type: String },
    year: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);
