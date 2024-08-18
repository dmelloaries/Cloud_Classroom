import React from 'react';

const Cards = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-blue-100 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-blue-200 hover:border-blue-300 border border-blue-100 font-bold font-sans">
        <h1 className="text-xl text-blue-800">Classroom Management Principal Dashboard</h1>
        <p className="text-gray-700 mt-2">• Create new classrooms with specific details.</p>
        <p className="text-gray-700">• Assign teachers to each classroom.</p>
        <p className="text-gray-700">• Set classroom schedules including name, start time, end time, and active days.</p>
      </div>
      <div className="bg-green-100 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-green-200 hover:border-green-300 border border-green-100 font-bold font-sans">
        <h3 className="text-xl text-green-800">Teacher Assignments</h3>
        <p className="text-gray-700 mt-2">• Assign students to teachers for better management.</p>
      </div>
    </div>
  );
};

export default Cards;
