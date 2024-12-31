const Transaction = require('../models/transaction.models.js');
const Appointment = require('../models/appointment.models.js');
const Patient = require('../models/patient.models.js');

exports.createTransaction = async (req, res) => {
    try {
        const { doctorId, patientId, fee, discount, discountType, appointmentId } = req.body;

        // Fetch the appointment data using the provided appointmentId
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if the patient exists and has enough balance
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        if (patient.walletBal < fee - discount) {
            return res.status(400).json({ message: 'Insufficient wallet balance for the discounted fee.' });
        }

        // Deduct the discount from the patient's wallet
        patient.walletBal -= (fee - discount);
        await patient.save();

        // Create a new transaction and save it
        const transaction = new Transaction({
            doctorId,
            patientId,
            fee,
            discount,
            discountType,
            finalAmount: fee - discount,
            appointmentId: appointment._id  // Saving reference to the appointment
        });

        await transaction.save();

        // Return the created transaction with populated appointment data
        const populatedTransaction = await Transaction.findById(transaction._id).populate('appointmentId');
        
        res.status(201).json({
            message: 'Transaction created successfully!',
            transaction: populatedTransaction
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// exports.getAllTransactions = async (req, res) => {
//     try {
//         const transactions = await Transaction.find().populate('appointmentId'); // Populate appointment data
//         res.status(200).json(transactions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate({
                path: 'appointmentId',
                select: 'discount discountUsed'  // Fetch only discount and discountUsed
            })
            .populate('doctorId', 'name')  // Populate doctor name
            .populate('patientId', 'name');  // Populate patient name

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
    }
};

