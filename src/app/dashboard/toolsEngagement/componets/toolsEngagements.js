'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CalendarStyles.css'; // Add a custom CSS file to override styles

const ToolsEngagement = () => {
  const [engagements, setEngagements] = useState([]);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchEngagements = async () => {
      try {
        const token = localStorage.getItem('stm_token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/user-tool-engagements/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEngagements(response.data);
        const uniqueTools = [...new Set(response.data.map(item => item["Tool name"]))];
        setTools(uniqueTools);
      } catch (error) {
        console.error('Error fetching engagements:', error);
        // toast.error("Error fetching engagements. Please try again.");
      }
    };
    fetchEngagements();
  }, []);

  const getToday = () => new Date().setHours(0, 0, 0, 0);

  const getEngagementStatus = (date, tool) => {
    const engagement = engagements.find(
      (eng) => eng["Tool name"] === tool && new Date(eng.Date).setHours(0, 0, 0, 0) === date.getTime()
    );

    if (!engagement) return null;

    const today = getToday();

    if (date < today) {
      return engagement.Engaged ? 'engaged' : 'missed';
    } else if (date.getTime() === today) {
      return 'today';
    } else {
      return 'upcoming';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300 p-6 flex justify-center items-center">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Tool Engagement Summary</h1>
        <p className="text-center mb-8">Below is a summary of your engagement with different tools on a daily basis.</p>

        {/* Engagement Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">{tool}</h2>
              <Calendar
                tileClassName={({ date, view }) => {
                  if (view === 'month') {
                    const status = getEngagementStatus(date, tool);
                    if (status === 'engaged') return 'engaged-class';  // Engaged in the past
                    if (status === 'missed') return 'missed-class';    // Missed in the past
                    if (status === 'today') return 'today-class';      // Today
                    if (status === 'upcoming') return 'upcoming-class'; // Future
                  }
                  return ''; // No marking for days without engagement
                }}
                className="no-weekend-color"
              />
                          </div>
          ))}
        </div>

        {/* Color Key / Legend */}
        {/* Color Key / Legend */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Legend</h3>
          <div className="flex flex-col sm:flex-row sm:justify-around mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 mr-2"></div>
              <span>Engaged</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 mr-2"></div>
              <span>Missed</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-500 mr-2"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-300 mr-2"></div>
              <span>Upcoming</span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ToolsEngagement;
