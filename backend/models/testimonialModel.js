const mongoose = require('mongoose');

// Schema for testimonials
const testimonialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        work: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
