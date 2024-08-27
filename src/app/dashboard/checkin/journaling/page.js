'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Journaling = () => {
  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('stm_token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/journal/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("the journal", response.data)
      if (response.status === 200) {
        setHistory(response.data);
      } else {
        console.log("Error fetching journal history");
      }
    } catch (error) {
      console.error("Error fetching journal history:", error);
    }
  };
  useEffect(() => {
    // Fetch journaling history from backend
    fetchHistory()
  }, []);

  const handleSave = async() => {
    // Save entry to the backend
    // After saving, clear the entry and update the history
      try {
        const token = localStorage.getItem('stm_token');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/journal/`,
          { content: entry },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        if (response.status === 201) {
          toast.success("success, keep journalig everyday, it improves your mood");
          setEntry('');
          fetchHistory()
        } else {
          toast.error("error, try again");
        }
      } catch (error) {
        console.error("Error fetching tools engagement:", error);
        toast.error("error, try again");
      }

    // setHistory([...history, { date: new Date().toLocaleDateString(), content: entry }]);
    
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
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
      <ToastContainer />
        {history.map((entry, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">{formatDate(entry.created_at)}</p>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journaling;
