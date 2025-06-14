const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const verifyToken = require('../config/jwt');

router.post('/book', verifyToken, bookController.createBook);

router.get('/book', verifyToken, bookController.getBooks);

router.put('/book/:id', verifyToken, bookController.updateBook);

router.delete('/book/:id', verifyToken, bookController.deleteBook);

module.exports = router;
