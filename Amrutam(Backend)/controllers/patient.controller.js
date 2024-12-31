const Patient = require('../models/patient.models.js');

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const { name, email, walletBal } = req.body;

        // Validation
        if (!name || !email || walletBal === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const patient = new Patient({
            name,
            email,
            walletBal
        });

        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Failed to fetch patients' });
    }
};
