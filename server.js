const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
require('dotenv').config();




const app = express();
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/authservice', { useNewUrlParser: true, useUnifiedTopology: true })
const connectionString = `mongodb://localhost:27017/authservice`
mongoose.connect(connectionString)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AuthService running on port ${PORT}`));
