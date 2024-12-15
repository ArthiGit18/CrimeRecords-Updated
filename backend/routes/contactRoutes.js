const express = require("express");
const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");

const router = express.Router();

// Create a new contact entry
router.post("/", async (req, res) => {
  const { name, field, description, contactNumber, email, rating } = req.body;

  try {
    // Save to MongoDB
    const newContact = new Contact({
      name,
      field,
      description,
      contactNumber,
      email,
      rating,
    });
    const savedContact = await newContact.save();

    // Nodemailer transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "crimechronicles13@gmail.com", // Sender Gmail ID
        pass: "jlfk dzet tpdr raxl", // Sender Gmail Password
      },
    });

    // Email to crimechronicles13@gmail.com with user details
    const adminMailOptions = {
      from: "crimechronicles13@gmail.com",
      to: "crimechronicles13@gmail.com", // Admin email
      subject: "New Contact Form Submission",
      text: `
        New contact form submission received:
        --------------------------------------
        Name: ${name}
        Field: ${field}
        Description: ${description}
        Contact Number: ${contactNumber}
        Email: ${email}
        Rating: ${rating}
      `,
    };

    // Thank you email to the user
    const userMailOptions = {
      from: "crimechronicles13@gmail.com",
      to: email, // Send thank you mail to user's email
      subject: "Thank You for Contacting Us",
      text: `
        Hi ${name},
        
        Thank you for reaching out to us! We have received your details and will get back to you shortly.

        Here's a copy of your submission:
        --------------------------------------
        Field: ${field}
        Description: ${description}
        Contact Number: ${contactNumber}
        Email: ${email}
        Rating: ${rating}

        Best Regards, 
        The Crime Chronicles Team
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(201).json({ message: "Contact form submitted and emails sent!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// List all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
