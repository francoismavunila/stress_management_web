'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';



const DailyCheckIn = () => {
  const [engagements, setEngagements] = useState({});
  const [showTools, setShowTools] = useState('maybe')
  const [results, setResults] = useState({});

  const toolsIcons = {
    'Journaling': '📝',
    'Breathing and Meditation': '🧘‍♂️',
    'Affirmations': '💬',
    'Quotes': '📜',
    'Time Management': '⏰',
    'Goal Setting': '🎯',
    'Positive Quotes': '🌟',
    'Task Prioritization': '✅',
  };
  

  useEffect(() => {
    const token = localStorage.getItem('stm_token');
    const fetchEngagements = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/daily/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       console.log("the engagement", response.data)
        if (response.status === 200) {
          setEngagements(response.data);
        } else {
          console.log("Error fetching tools engagement");
        }
      } catch (error) {
        console.error("Error fetching tools engagement:", error);
      }
    };

    const getResults = async()=>{
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/assessment/self-assessment-responses/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        console.log('Response from server:', response.data);
        if (response.status === 200) {
          const currentTime = new Date();
    
          if (new Date(response.data.next_suggested_time) > currentTime) {
            setResults(response.data); 
            setShowTools('yes')
          } else {
            setShowTools('no');
          }
          
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setShowTools('no');
        } else {
          console.error('Error:', error);
        }
      }
    }

    fetchEngagements();
    getResults()
  }, []);

  return  showTools === 'yes' ? (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Daily Check-In</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results?.tools.map((tool) => (
            <Link href={`/dashboard/checkin/${tool.toLowerCase().replace(/\s+/g, '-')}`} key={tool}>
            <div className={`p-4 border rounded ${engagements[tool] ? 'bg-green-100' : 'bg-red-100'} cursor-pointer`}>
              <div className="flex items-center">
                <span className="text-2xl mr-4">{toolsIcons[tool]}</span>
                <div>
                  <h3 className="text-xl font-semibold">{tool}</h3>
                  <p>{engagements[tool] ? 'Engaged' : 'Not Engaged'}</p>
                </div>
              </div>
            </div>
          </Link>
            ))}
          </div>
        </div>
      </div>
  ) : showTools === 'no' ? (
    <p>You are done using your tools, navigate to the self assessments to assess again,</p>
  ) : <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>

};

export default DailyCheckIn;
