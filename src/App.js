// src/App.js
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [inclination, setInclination] = useState(null);

  const handleAnalysisComplete = (data) => {
    setInclination(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-center text-3xl font-bold text-blue-500">Twitter Political Inclination Analyzer</h1>
      <InputForm onAnalysisComplete={handleAnalysisComplete} />
      {inclination && <ResultDisplay inclination={inclination} />}
    </div>
  );
}

export default App;
