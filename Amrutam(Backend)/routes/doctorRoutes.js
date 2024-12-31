const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');

// Create a new doctor
router.post('/', doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);

module.exports = router;
