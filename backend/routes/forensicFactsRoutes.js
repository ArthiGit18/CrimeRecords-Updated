const express = require('express');
const ForensicFact = require('../models/forensicFactsModel');
const router = express.Router();

// Get all Forensic Facts
router.get('/', async (req, res) => {
    try {
        const facts = await ForensicFact.find();
        res.status(200).json(facts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a Forensic Fact
router.post('/', async (req, res) => {
    try {
        const { image, title, description, story, likes, views } = req.body;

        if (!image || !title || !description) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const newForensicFact = new ForensicFact({
            image,
            title,
            description,
            story,
            likes,
            views,
        });

        await newForensicFact.save();
        res.status(201).json(newForensicFact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a Forensic Fact
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { image, title, description, story, likes, views } = req.body;

    try {
        const updatedFact = await ForensicFact.findByIdAndUpdate(
            id,
            { image, title, description, story, likes, views },
            { new: true }
        );
        if (!updatedFact) {
            return res.status(404).json({ message: 'Forensic Fact not found' });
        }
        res.status(200).json(updatedFact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a Forensic Fact
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFact = await ForensicFact.findByIdAndDelete(id);
        if (!deletedFact) {
            return res.status(404).json({ message: 'Forensic Fact not found' });
        }
        res.status(200).json({ message: 'Forensic Fact deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
