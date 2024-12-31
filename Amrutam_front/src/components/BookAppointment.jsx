import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BookAppointment = () => {
    const [doctorId, setDoctorId] = useState('');
    const [patientId, setPatientId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const navigate = useNavigate();

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/appointments', {
                doctorId,
                patientId,
                appointmentDate
            });

            toast.success('Appointment booked successfully!');  // Success toast

            setTimeout(() => {
                navigate("/transaction", { replace: true });
              }, 500);  // Delay 1.5s to let toast show
        } catch (error) {
            toast.error(`Failed to book appointment: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Book an Appointment</h2>
                <form onSubmit={handleBooking} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Doctor ID</label>
                        <input
                            type="text"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Patient ID</label>
                        <input
                            type="text"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Appointment Date</label>
                        <input
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
                    >
                        Book Appointment
                    </button>
                </form>
                
                {/* Toast Container to display toasts */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default BookAppointment;
