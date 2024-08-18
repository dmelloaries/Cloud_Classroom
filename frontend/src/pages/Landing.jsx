import React from 'react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex flex-col justify-center items-center text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to the Cloud Classroom
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          A complete solution to manage classrooms, teachers, and students efficiently.
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="flex justify-center items-center mt-8"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12TZUg_oKroUkgcwNP7I8n1heSl6UYkK6vw&s"
          alt="Classroom Illustration"
          className="rounded-lg shadow-lg w-80 h-auto"
        />
      </motion.div>
    </div>
  );
};

export default Landing;
