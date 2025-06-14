'use strict';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ethos')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes

// var cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

const schoolRoutes = require('./routes/school');
const bookRoutes = require('./routes/book');
const procurementRoutes = require('./routes/procurement');
const authRoutes = require('./routes/auth');

app.use('/api', authRoutes);
app.use('/api', schoolRoutes);
app.use('/api', bookRoutes);
app.use('/api', procurementRoutes);

// GET API
app.get('/', (req, res) => {
  res.send('This is a GET API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
