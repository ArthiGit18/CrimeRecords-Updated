const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const aboutRoutes = require('./routes/aboutRoutes');
const topPicksRoutes = require('./routes/topPicksRoutes');
const forensicFactsRoutes = require('./routes/forensicFactsRoutes');
const cardRoutes = require('./routes/cardRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

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

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to Crime Chronicles API');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
