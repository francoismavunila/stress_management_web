'use client'
import React, { useState } from 'react';

const AffirmationComponent = ({ onComplete }) => {
  const [affirmation, setAffirmation] = useState('');

  const handleAffirmationChange = (e) => {
    setAffirmation(e.target.value);
  };

  const handleSave = () => {
    const timestamp = new Date().toISOString();
    // Save the affirmation and timestamp (e.g., send to backend)
    console.log('Affirmation:', affirmation);
    console.log('Timestamp:', timestamp);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h3 className="text-xl font-semibold mb-2">Affirmations</h3>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Write your affirmation..."
        value={affirmation}
        onChange={handleAffirmationChange}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save Affirmation
      </button>
    </div>
  );
};

export default AffirmationComponent;
