'use client'
import React,{useState} from 'react';

const QuoteComponent = ({ onComplete }) => {
  const [quote] = useState('You are capable of amazing things.');

  const handleRead = () => {
    const timestamp = new Date().toISOString();
    // Save the read timestamp (e.g., send to backend)
    console.log('Quote Read:', quote);
    console.log('Timestamp:', timestamp);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h3 className="text-xl font-semibold mb-2">Quote of the Day</h3>
      <p className="text-gray-700 mb-4">{quote}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleRead}
      >
        I have read today's quote
      </button>
    </div>
  );
};

export default QuoteComponent;
