const express = require('express');
const router = express.Router();
const Patient = require('../models/patient.models.js');

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient already registered' });
    }

    // Save new patient
    const newPatient = new Patient({
      name,
      email,
      password,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Signup successful' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', patient });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
