'use Client'
import React, { useState, useEffect } from 'react';

const Journaling = () => {
  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch journaling history from backend
    // setHistory(mockHistory); // Replace with actual fetch
  }, []);

  const handleSave = () => {
    // Save entry to the backend
    // After saving, clear the entry and update the history
    setHistory([...history, { date: new Date().toLocaleDateString(), content: entry }]);
    setEntry('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Journaling</h2>
      <textarea
        className="w-full p-4 bg-white rounded-lg shadow-md"
        placeholder="Write your journal entry..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg shadow-md"
        onClick={handleSave}
      >
        Save Entry
      </button>

      <h3 className="text-xl font-semibold mt-8">Previous Entries</h3>
      <div className="mt-4">
        {history.map((entry, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">{entry.date}</p>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journaling;
