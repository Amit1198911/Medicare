const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    fee: {
        type: Number,
        min: [0, "Fee must be a positive number."]
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, "Discount cannot be negative."]
    },
    discountUsed: {  // New field to track discount usage
        type: Boolean,
        default: false
    },
    finalAmount: {
        type: Number
    }
}, { timestamps: true });

// Pre-save hook to calculate final amount
appointmentSchema.pre('save', function(next) {
    this.finalAmount = Math.max(0, this.fee - this.discount);  // Prevent negative finalAmount
    next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
