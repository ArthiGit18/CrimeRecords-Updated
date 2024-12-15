const express = require('express');
const Testimonial = require('../models/testimonialModel');
const router = express.Router();

// List all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new testimonial
router.post('/', async (req, res) => {
    const { name, work, content } = req.body;

    try {
        const newTestimonial = new Testimonial({ name, work, content });
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a testimonial
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, work, content } = req.body;

    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            id,
            { name, work, content },
            { new: true }
        );
        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a testimonial
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json({ message: 'Testimonial deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
