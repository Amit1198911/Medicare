const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

// Create a new patient
router.post('/', patientController.createPatient);
router.post('/', patientController.createPatient);
// Get all patients
router.get('/', patientController.getAllPatients);

module.exports = router;
