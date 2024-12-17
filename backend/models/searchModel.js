const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema({
  mainImage: { type: String, required: true },
  title: { type: String, required: true },
  place: { type: String, required: true },
  description: { type: String, required: true },
  story: { type: String, required: true }, // HTML content
  video: { type: String, required: false },
  additionalImages: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Search", SearchSchema);
