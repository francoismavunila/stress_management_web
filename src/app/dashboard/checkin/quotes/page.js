'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [category, setCategory] = useState('');
  const [quote, setQuote] = useState(null);
  const [hasCategory, setHasCategory] = useState(false); // To check if the user already selected a category

  // Load category from the server if the user has already selected it
  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('stm_token');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/quotes/get-category/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.category) {
          setCategory(response.data.category);
          setHasCategory(true);
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, []);

  // Fetch a quote based on the selected category
  const fetchQuote = async (selectedCategory) => {
    console.log("th selceted category is", selectedCategory)
    const token = localStorage.getItem('stm_token');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/quotes/get-quote/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { category: selectedCategory || category },
      });
      console.log("res", response.data.quote)
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/engangement/`,
        { 'tool_name': 'Quotes' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuote(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Save category to the backend and fetch the quote
  const handleCategorySubmit = async () => {

    const token = localStorage.getItem('stm_token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/quotes/set-category/`, { category }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHasCategory(true);
      fetchQuote(category);
    } catch (error) {
      console.error('Error setting category:', error);
    }
  };

  // Function to read out the quote
  const readQuoteAloud = () => {
    if (quote) {
      const speech = new SpeechSynthesisUtterance(quote.quote);
      speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-6 flex justify-center items-center">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Positive Quote Generator</h1>
        
        {!hasCategory ? (
          <div>
            <p className="text-lg text-gray-700 text-center mb-4">Let’s begin by selecting a category that resonates with where you want improvement today:</p>
            <div className="space-y-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
              >
                <option value="">-- Select a Category --</option>
                <option value="happiness">Happiness</option>
                <option value="love">Love</option>
                <option value="success">Success</option>
                <option value="courage">Courage</option>
                <option value="friendship">Friendship</option>
                {/* Add more categories as needed */}
              </select>
              <button
                onClick={handleCategorySubmit}
                className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                Submit Category
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Here’s a positive quote for you:</h2>
            {quote ? (
              <div className="p-6 bg-purple-100 rounded-lg shadow-lg text-center mb-4">
                <p className="text-xl font-medium text-gray-800 mb-2">"{quote.quote}"</p>
                <p className="text-md text-gray-600">- {quote.author}</p>
                <button
                  onClick={readQuoteAloud}
                  className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                  Read Aloud
                </button>
              </div>
            ) : (
              <p className="text-lg text-center text-gray-500">Generating your quote...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteGenerator;
