const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST'],       // You can specify other methods like PUT, DELETE if needed
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers allowed for the request
  }));

// MongoDB connection
console.log(process.env.MONGO_URI);

mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);  // Use transaction routes under /api/transactions
app.use('/api/doctors', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/patients', userRoutes);
app.use('/api/appointments', appointmentRoutes);




// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
