const mongoose = require('mongoose');

// Define schema for cards
const cardSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        story: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
