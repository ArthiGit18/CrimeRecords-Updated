const express = require('express');
const Card = require('../models/cardModel');
const router = express.Router();

// List all cards
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new card
router.post('/', async (req, res) => {
    const { title, image, description, story } = req.body;

    try {
        const newCard = new Card({ title, image, description, story });
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing card
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, image, description, story } = req.body;

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            id,
            { title, image, description, story },
            { new: true }
        );
        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a card
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCard = await Card.findByIdAndDelete(id);
        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
