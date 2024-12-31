const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true        
    },
    specialization : {
        type : String,
        required : true
    },
    consultationFee : {
        type : Number,
        required : true
    },
    appointment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Appointment'
    }
},{timestamps: true})

module.exports = mongoose.model('Doctor', doctorSchema);
