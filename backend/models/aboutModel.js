const mongoose = require('mongoose');

// Schema for About Content
const aboutSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
