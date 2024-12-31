const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
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
        required: true,
        min: [0, "Fee must be a positive number."]
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Discount cannot be negative."]
    },
    finalAmount: {
        type: Number
    },
    discountType: {
        type: String,
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment' // Reference to Appointment model
    }
}, {timestamps: true});

// Pre-save hook to calculate final amount
transactionSchema.pre('save', function(next) {
    if (this.discountType === 'percentage') {
        this.finalAmount = Math.max(0, this.fee - (this.fee * this.discount / 100));
    } else {
        this.finalAmount = Math.max(0, this.fee - this.discount);
    }
    next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
