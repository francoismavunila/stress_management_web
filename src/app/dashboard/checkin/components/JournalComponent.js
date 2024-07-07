'use client'
import React, { useState } from 'react';

const JournalComponent = ({ onComplete }) => {
  const [journalEntry, setJournalEntry] = useState('');

  const handleJournalChange = (e) => {
    setJournalEntry(e.target.value);
  };

  const handleSave = () => {
    const timestamp = new Date().toISOString();
    // Save the journal entry and timestamp (e.g., send to backend)
    console.log('Journal Entry:', journalEntry);
    console.log('Timestamp:', timestamp);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h3 className="text-xl font-semibold mb-2">Journaling</h3>

      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows="4"
        placeholder="Write about your day..."
        value={journalEntry}
        onChange={handleJournalChange}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save Journal Entry
      </button>
    </div>
  );
};

export default JournalComponent;
