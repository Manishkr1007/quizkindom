import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: false, success: false });

    try {
      // Replace with your backend URL for handling contact form submission
      await axios.post('https://quizkindomserver.vercel.app/api/contact', formData);
      setFormStatus({ loading: false, success: true });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus({ loading: false, error: true });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center dark:bg-slate-900 text-white p-4">
        <div className="w-full max-w-lg bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-pink-500">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border dark:bg-slate-900 border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border dark:bg-slate-900 border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border dark:bg-slate-900 border-gray-300 rounded-md"
                rows="4"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2  bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 transition"
                disabled={formStatus.loading}
              >
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          {formStatus.success && (
            <p className="mt-4 text-green-500 text-center">Your message has been sent successfully!</p>
          )}
          {formStatus.error && (
            <p className="mt-4 text-red-500 text-center">There was an error sending your message. Please try again.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
