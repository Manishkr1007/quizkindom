import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 text-gray-900 dark:text-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl text-pink-500 mt-12 font-extrabold mb-6">
            Welcome to Our QuizKindom by Siddi Learning Hub
          </h1>
          <p className="text-lg leading-relaxed">
            Our app is designed to provide a seamless and interactive experience
            for users looking to take various quizzes and tests. Whether you
            want to challenge yourself or improve your knowledge, we offer a
            wide variety of quizzes in multiple categories.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <p className="text-lg">
              We provide a smooth and responsive platform where users can access
              quizzes in multiple domains. Our goal is to make learning fun and
              interactive for everyone.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside">
              <li className="text-lg mb-2">Wide variety of quizzes</li>
              <li className="text-lg mb-2">Real-time score tracking</li>
              <li className="text-lg mb-2">Interactive and engaging UI</li>
              <li className="text-lg mb-2">Detailed results and analysis</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <h2 className="text-2xl text-pink-500 font-extrabold text-center mb-8">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <motion.img
                className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-500"
                src="https://via.placeholder.com/100"
                alt="Team Member"
                whileHover={{ scale: 1.05 }}
              />
              <h3 className="text-xl font-semibold">Manish Kumar</h3>
              <p className="text-lg">Full Stack Developer</p>
            </div>
            <div className="text-center">
              <motion.img
                className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-500"
                src="https://via.placeholder.com/100"
                alt="Team Member"
                whileHover={{ scale: 1.05 }}
              />
              <h3 className="text-xl font-semibold">Siddi Learning Hub</h3>
              <p className="text-lg">Test Provider</p>
            </div>
          
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default About;
