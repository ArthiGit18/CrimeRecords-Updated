const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import route files
const aboutRoutes = require('./routes/aboutRoutes');
const topPicksRoutes = require('./routes/topPicksRoutes');
const forensicFactsRoutes = require('./routes/forensicFactsRoutes');
const cardRoutes = require('./routes/cardRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const searchRoutes = require('./routes/searchRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Static folder for uploaded files

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err));

// API Routes
app.use('/api/about', aboutRoutes);
app.use('/api', topPicksRoutes);
app.use('/api/forensicfacts', forensicFactsRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/search", searchRoutes); // Attach search route

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to Crime Chronicles API');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
