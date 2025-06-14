const Procurement = require('../models/Procurement');
const Book = require('../models/Book');

const createProcurement = async (req, res) => {
  try {
    const { school, books } = req.body;

    // Ambil detail semua buku yang dipesan
    const bookDocs = await Book.find({
      _id: { $in: books.map((b) => b.book) },
    });

    // Hitung total dan lengkapi data books
    const items = books.map((b) => {
      const bookDoc = bookDocs.find((doc) => doc._id.toString() === b.book);
      if (!bookDoc) {
        throw new Error(`Book with id ${b.book} not found`);
      }
      return {
        book: b.book,
        quantity: b.quantity,
        price: bookDoc.price,
      };
    });

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Simpan procurement
    const procurement = await Procurement.create({
      school,
      books: items.map((i) => ({
        book: i.book,
        quantity: i.quantity,
      })),
      totalPrice,
      status: 'pending',
      paymentUrl: `https://payment-gateway.com/pay/${new Date().getTime()}`,
    });

    res.status(201).json({
      success: true,
      procurement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProcurements = async (req, res) => {
  try {
    const procurements = await Procurement.find()
      .populate('school')
      .populate('books.book');

    res.status(200).json({
      success: true,
      procurements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const validateProcurement = async (req, res) => {
  try {
    const { id } = req.params;
    const procurement = await Procurement.findById(id);

    if (!procurement) {
      return res.status(404).json({
        success: false,
        message: 'Procurement not found',
      });
    }

    if (procurement.status !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment not completed',
      });
    }

    procurement.status = 'validated';
    await procurement.save();

    res.status(200).json({
      success: true,
      message: 'Procurement validated',
      procurement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const markPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const procurement = await Procurement.findById(id);

    if (!procurement) {
      return res.status(404).json({
        success: false,
        message: 'Procurement not found',
      });
    }

    procurement.status = 'paid';
    await procurement.save();

    res.status(200).json({
      success: true,
      message: 'Payment status updated to paid',
      procurement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProcurement,
  getProcurements,
  validateProcurement,
  markPaid,
};
