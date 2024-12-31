const Appointment = require('../models/appointment.models.js');
const Doctor = require('../models/doctor.models.js');
const Patient = require('../models/patient.models.js');

exports.bookAppointment = async (req, res) => {
    console.log(req.body);
    
    try {
        const { doctorId, patientId, appointmentDate } = req.body;

        // Check if the doctor and patient exist
        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            return res.status(404).json({ message: 'Doctor or Patient not found' });
        }

        // Check if the patient has already booked an appointment with this doctor
        const existingAppointment = await Appointment.findOne({ doctorId, patientId });
        let discount = 0;

        if (!existingAppointment) {
            // First-time appointment with this doctor, apply discount
            discount = 10; // Example: Apply 10% discount or a fixed amount
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            doctorId,
            patientId,
            appointmentDate,
            status: 'pending', // default status is pending
            discountUsed: discount > 0, // Set this to true if a discount is applied
            discount: discount
        });

        // Save the appointment
        await newAppointment.save();

        // Optionally, you can update patient's wallet balance or any other data based on the discount
        // Assuming you have wallet balance in Patient schema, you can deduct the discounted amount if necessary.

        res.status(201).json({
            message: 'Appointment booked successfully!',
            appointment: newAppointment
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        // Fetch all appointments from the database
        const appointments = await Appointment.find();
        res.status(200).json(appointments);  // Return the appointments correctly
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments' });
    }
};

