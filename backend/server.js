const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const uploadRoutes = require('./routes/upload');
const letterRoutes = require('./routes/letter');
app.use('/api/letter', letterRoutes);
app.use('/api/upload', uploadRoutes);

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT} ✅`)
    );
  })
  .catch(err => console.error('DB connection failed ❌', err));