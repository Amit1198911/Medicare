// appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller.js');

// Route for booking an appointment
router.post('/', appointmentController.bookAppointment);
// Get all appointments
router.get('/', appointmentController.getAllAppointments);

module.exports = router;
