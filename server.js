const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');

require('dotenv').config();

const app = express();
// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Middleware for parsing application/json
app.use(express.json());

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/authservice';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AuthService running on port ${PORT}`));
