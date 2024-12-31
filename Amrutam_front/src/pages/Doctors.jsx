import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for when data is being fetched
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    // Function to fetch the doctors data from the backend
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/doctors");
        setDoctors(response.data); // Store the data in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to load doctors data");
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle copying doctor ID to clipboard
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id).then(
      () => {
        toast.success("ID copied to clipboard!"); // Show success toast
      },
      () => {
        toast.error("Failed to copy ID"); // Show error toast if copy fails
      }
    );
  };

  // Conditional rendering based on loading, error, or data
  if (loading) {
    return <div>Loading doctors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Doctors List</h2>

      {/* Doctor List */}
      <div className="space-y-4"> {/* Add space between each doctor */}
        {doctors.map((doctor) => (
          <div
            key={doctor._id} // Ensure each element has a unique key
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
            </div>
            <button
              onClick={() => copyToClipboard(doctor._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Copy ID
            </button>
          </div>
        ))}
      </div>

      {/* ToastContainer to display toasts */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Doctor;
