import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionsAndAppointments = async () => {
            const token = localStorage.getItem('userToken');

            if (!token) {
                toast.error('You are not logged in!');
                setLoading(false);
                return;
            }

            try {
                const transactionsResponse = await axios.get('http://localhost:4000/api/transactions', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const appointmentsResponse = await axios.get('http://localhost:4000/api/appointments', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTransactions(transactionsResponse.data);
                setAppointments(appointmentsResponse.data);
                
                toast.success('Transactions fetched successfully');
            } catch (error) {
                toast.error('Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionsAndAppointments();
    }, []);

    const getAppointmentForPatient = (patientId) => {
        return appointments.find((appointment) => appointment.patientId === patientId) || {};
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Transaction History</h2>

                {loading ? (
                    <p className="text-center">Loading transactions...</p>
                ) : transactions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transactions.map((transaction) => {
                            const matchingAppointment = getAppointmentForPatient(transaction.patientId?._id);
                            
                            return (
                                <div key={transaction._id} className="bg-blue-50 p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-2">{transaction.doctorId?.name || 'Unknown Doctor'}</h3>
                                    <p className="text-gray-600"><strong>Patient:</strong> {transaction.patientId?.name || 'Unknown Patient'}</p>
                                    <p className="text-gray-600"><strong>Discount:</strong> {matchingAppointment.discount || '0'}%</p>
                                    <p className="text-gray-600">
                                        <strong>Discount Used:</strong> {matchingAppointment.discountUsed ? 'Yes' : 'No'}
                                    </p>
                                    <p className="text-gray-600"><strong>Fee:</strong> ${transaction.fee}</p>
                                    <p className="text-lg font-bold mt-3">
                                        <strong>Total:</strong> ${transaction.finalAmount}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center">No transactions found.</p>
                )}
            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default TransactionsPage;
