const express = require('express');
const About = require('../models/aboutModel');
const router = express.Router();

// Get all About content
router.get('/', async (req, res) => {
    try {
        const aboutContent = await About.find();
        res.status(200).json(aboutContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create About content
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    try {
        const newAbout = new About({ title, content });
        const savedAbout = await newAbout.save();
        res.status(201).json(savedAbout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update About content
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedAbout = await About.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedAbout) {
            return res.status(404).json({ message: 'About content not found' });
        }
        res.status(200).json(updatedAbout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete About content
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAbout = await About.findByIdAndDelete(id);
        if (!deletedAbout) {
            return res.status(404).json({ message: 'About content not found' });
        }
        res.status(200).json({ message: 'About content deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
