import React from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaBone, FaBaby } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <section className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Your Health, Our Priority
          </h2>
          <p className="mt-4 text-gray-600 text-lg sm:text-xl">
            Book appointments with top doctors near you.
          </p>
          <div className="mt-8">
            <Link
              to="/book-appointment"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Book Appointment
            </Link>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cardiology Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
            <FaHeartbeat className="text-red-600 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Cardiology</h3>
            <p className="mt-2 text-gray-600">
              Expert heart care specialists to keep your heart healthy.
            </p>
          </div>

          {/* Orthopedics Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
            <FaBone className="text-blue-600 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Orthopedics</h3>
            <p className="mt-2 text-gray-600">
              Advanced bone and joint care from experienced doctors.
            </p>
          </div>

          {/* Pediatrics Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
            <FaBaby className="text-green-600 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Pediatrics</h3>
            <p className="mt-2 text-gray-600">
              Compassionate child care for healthy growth and development.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto py-6 text-center px-4">
          <p className="text-gray-500 text-sm sm:text-base">
            &copy; 2024 MediCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
