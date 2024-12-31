const Doctor = require('../models/doctor.models.js');

// Create a new doctor
exports.createDoctor = async (req, res) => {
    try {
        const { name, specialization, consultationFee } = req.body;

        // Validation
        if (!name || !specialization || !consultationFee) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const doctor = new Doctor({
            name,
            specialization,
            consultationFee
        });

        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Failed to fetch doctors' });
    }
};
