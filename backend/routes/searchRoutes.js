const express = require("express");
const multer = require("multer");
const path = require('path');

const Search = require("../models/searchModel");

const router = express.Router();

// In-memory storage for simplicity (Replace with a database in production)
const storedData = [];

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads'); // Ensure the correct directory
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
};

const upload = multer({ storage, fileFilter });

// POST API to upload data
router.post(
    '/',
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'additionalImages', maxCount: 10 },
    ]),
    (req, res) => {
        try {
            const { title, place, description, story } = req.body;

            if (!title || !place || !description || !story) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].path : null;
            const video = req.files['video'] ? req.files['video'][0].path : null;
            const additionalImages = req.files['additionalImages']
                ? req.files['additionalImages'].map((file) => file.path)
                : [];

            const newEntry = {
                id: storedData.length + 1,
                title,
                place,
                description,
                story,
                mainImage,
                video,
                additionalImages,
            };

            storedData.push(newEntry);

            res.status(200).json({
                message: "Upload successful",
                data: newEntry,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// GET API to fetch stored data
router.get('/', (req, res) => {
    try {
        if (storedData.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({
            message: "Data retrieved successfully",
            data: storedData,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// UPDATE - Update a search entry by ID
router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "additionalImages", maxCount: 3 },
  ]),
  async (req, res) => {
    const { title, place, description, story } = req.body;
    const updates = {};

    if (req.files.mainImage) updates.mainImage = req.files.mainImage[0].path;
    if (req.files.video) updates.video = req.files.video[0].path;
    if (req.files.additionalImages) {
      updates.additionalImages = req.files.additionalImages.map(file => file.path);
    }
    if (title) updates.title = title;
    if (place) updates.place = place;
    if (description) updates.description = description;
    if (story) updates.story = story;

    try {
      const updatedSearch = await Search.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      res.status(200).json(updatedSearch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating search entry" });
    }
  }
);

// DELETE - Delete a search entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSearch = await Search.findByIdAndDelete(req.params.id);
    if (!deletedSearch) return res.status(404).json({ message: "Search not found" });
    res.status(200).json({ message: "Search entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting search entry" });
  }
});

module.exports = router;
