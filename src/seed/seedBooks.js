require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

const books = [];

for (let i = 1; i <= 100; i++) {
  books.push({
    title: `Sample Book ${i}`,
    author: `Author ${i}`,
    price: 40000 + i * 100,
    isbn: `978602${String(1000000 + i).slice(0, 7)}`,
    publisher: `Publisher ${(i % 10) + 1}`,
    year: 2015 + (i % 10), // tahun antara 2015-2024
  });
}

const seedBooks = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethos';
    await mongoose.connect(dbUri);

    console.log('MongoDB connected');

    await Book.deleteMany({});
    console.log('Old book data cleared');

    await Book.insertMany(books);
    console.log('Books seeded successfully');

    process.exit();
  } catch (err) {
    console.error('Error seeding books:', err);
    process.exit(1);
  }
};

seedBooks();
