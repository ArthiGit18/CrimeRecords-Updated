const express = require('express');
const TopPick = require('../models/topPicksModel');
const router = express.Router();

// Get all Top Picks
router.get('/', async (req, res) => {
    try {
        const topPicks = await TopPick.find();
        res.status(200).json(topPicks); // Returns Top Picks as JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a Top Pick (HTML content in the story)
router.post('/topPicks', async (req, res) => {
    try {
        const { image, title, description, story, likes, views } = req.body;

        // Ensure that the 'story' is stored as HTML content
        const newTopPick = new TopPick({
            image, 
            title, 
            description, 
            story, // HTML content here
            likes, 
            views
        });

        await newTopPick.save();

        res.status(201).json(newTopPick); // Send the created top pick in response
    } catch (error) {
        console.error('Error creating top pick:', error);
        res.status(500).json({ message: 'Error creating top pick' });
    }
});

// Update a Top Pick (Handle HTML content in 'story')
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { image, title, description, story, likes, views } = req.body;

    try {
        const updatedTopPick = await TopPick.findByIdAndUpdate(
            id,
            { image, title, description, story, likes, views }, // story is HTML content
            { new: true }
        );
        if (!updatedTopPick) {
            return res.status(404).json({ message: 'Top Pick not found' });
        }
        res.status(200).json(updatedTopPick);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a Top Pick
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTopPick = await TopPick.findByIdAndDelete(id);
        if (!deletedTopPick) {
            return res.status(404).json({ message: 'Top Pick not found' });
        }
        res.status(200).json({ message: 'Top Pick deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
