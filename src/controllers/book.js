const Book = require('../models/Book');

const createBook = async (req, res) => {
  try {
    const { title, author, price, description } = req.body;
    const book = await Book.create({ title, author, price, description });
    res.status(201).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBook, getBooks, updateBook, deleteBook };
