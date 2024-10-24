import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ComingSoon() {
  const navigate = useNavigate(); // Initialize useNavigate for back navigation

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1); // This will take the user to the previous page
  };

  return (
   <>
    <Navbar />
    <div className="flex items-center justify-center h-screen  bg-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-gray-300 mb-8">This feature is under development and will be available soon.</p>
        
        {/* Pink Back Button */}
        <button
          onClick={goBack}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ComingSoon;
