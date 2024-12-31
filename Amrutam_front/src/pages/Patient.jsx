import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch patients from backend
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/patient");
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load patients data");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Copy patient ID to clipboard
  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Patient ID copied to clipboard!");
  };

  if (loading) {
    return <div className="text-center py-10">Loading patients...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Patients List
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        {patients.map((patient) => (
          <div key={patient._id} className="flex justify-between items-center py-4 border-b last:border-b-0">
            <div>
              <h3 className="text-lg font-semibold">{patient.name}</h3>
            </div>
            <button
              onClick={() => handleCopy(patient._id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
            >
              Copy ID
            </button>
          </div>
        ))}
      </div>
      
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default PatientPage;
