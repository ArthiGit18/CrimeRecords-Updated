import React, { useState } from "react";
import { Rating } from "@mui/material"; // MUI Rating for stars
import { Star } from "@mui/icons-material";
import axios from "axios"; // For making API requests

const ContactSection = () => {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const contactData = { name, field, description, contactNumber, email, rating };

    try {
      const response = await axios.post("http://localhost:3001/api/contact", contactData);
      alert(response.data.message || "Form submitted successfully!");
      setName("");
      setField("");
      setDescription("");
      setContactNumber("");
      setEmail("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label className="input-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contact-input"
          required
        />
        
        <label className="input-label">Field</label>
        <input
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="contact-input"
          required
        />

        <label className="input-label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="contact-textarea"
          required
        />

        <label className="input-label">Contact Number</label>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="contact-input"
          required
        />

        <label className="input-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="contact-input"
          required
        />

        <div className="rating-container">
          <label>Ratings</label>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            max={5}
            icon={<Star fontSize="inherit" />}
            emptyIcon={<Star fontSize="inherit" sx={{ color: "red" }} />}
            className="rating-stars"
          />
        </div>

        <button type="submit" className="contact-submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
