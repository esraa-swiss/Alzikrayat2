require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const photoRoutes = require('./routes/photoRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Alzikrayat API is running');
});
app.use('/api/auth',authRoutes);
app.use('/api/photos',photoRoutes);
app.use('/api/photos/:id/comments',commentRoutes);
app.use(errorHandler);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });