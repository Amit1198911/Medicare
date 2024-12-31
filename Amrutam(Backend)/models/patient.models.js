const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    walletBal: {
        type: Number,
        required: true,
        default: 5000  // Assume a wallet balance field exists
    },
    appointment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Appointment'
    }
},{timestamps: true});

module.exports = mongoose.model('Patient', patientSchema);
