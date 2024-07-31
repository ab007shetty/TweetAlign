// src/components/ResultDisplay.js
import React from 'react';

const ResultDisplay = ({ inclination }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-700">Analysis Result</h2>
      <p className="text-gray-600 mt-2">Leftist: {inclination.leftist}%</p>
      <p className="text-gray-600 mt-2">Rightist: {inclination.rightist}%</p>
      <p className="text-gray-600 mt-2">Neutral: {inclination.neutral}%</p>
    </div>
  );
};

export default ResultDisplay;
