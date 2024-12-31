import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600 mt-2">Learn more about our team and mission</p>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our mission is to create innovative solutions to make a positive impact on people's lives.
          We are dedicated to helping individuals and organizations achieve their goals through high-quality products and services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Team Member" 
              className="w-32 h-32 rounded-full mx-auto mb-4" 
            />
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>

          <div className="text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Team Member" 
              className="w-32 h-32 rounded-full mx-auto mb-4" 
            />
            <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>

          <div className="text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Team Member" 
              className="w-32 h-32 rounded-full mx-auto mb-4" 
            />
            <h3 className="text-xl font-semibold text-gray-800">Mark Johnson</h3>
            <p className="text-gray-600">Product Manager</p>
          </div>
        </div>
      </section>

      <footer className="text-center mt-16">
        <p className="text-gray-600">© 2024 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
