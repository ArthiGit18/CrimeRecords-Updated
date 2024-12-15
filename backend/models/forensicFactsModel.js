const mongoose = require('mongoose');

// Schema for Forensic Facts
const forensicFactsSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        story: { type: String, required: true },
        likes: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ForensicFact', forensicFactsSchema);
