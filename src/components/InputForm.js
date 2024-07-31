import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ onAnalysisComplete }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/analyze', { username });
      onAnalysisComplete(response.data.inclination);
    } catch (error) {
      console.error(error);
      alert('Error analyzing tweets.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <label className="block text-gray-700 text-lg font-bold mb-2">Enter Twitter Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        placeholder="username"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};

export default InputForm;
