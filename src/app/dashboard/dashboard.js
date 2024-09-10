import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [allEngaged, setAllEngaged] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('stm_token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/dashboard/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("resp",response)
        setData(response.data);
        setAllEngaged(response.data.engagement_status.every(e => e.engaged));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const { group, tools, engagement_status, quote_of_the_day } = data;

  return (
    <div className="dashboard p-6 bg-gradient-to-br from-blue-100 to-purple-300 min-h-screen">
      {allEngaged && <Confetti />}
      <h1 className="text-4xl font-bold text-purple-700 text-center mb-4">Welcome to your Dashboard</h1>
      <p className="text-xl text-gray-700 text-center mb-6">
        You are classified as <strong>{group}</strong>. Here are your recommended tools:
      </p>

      <div className="tools grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className={`tool-card bg-white p-4 rounded shadow ${engagement_status[index].engaged ? 'border-green-500' : 'border-red-500'}`}>
            <h2 className="text-2xl font-semibold">{tool}</h2>
            <p>{engagement_status[index].engaged ? 'You’ve engaged with this tool today!' : 'Engagement pending'}</p>
            {!engagement_status[index].engaged ? (
                <a
                    href={`/dashboard/checkin/${tool.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Use Tool
                </a>
                ) : ""}
          </div> 
        ))}
      </div>

      <div className="quote-of-the-day mt-8 p-4 bg-yellow-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">Quote of the Day</h2>
        <p className="italic">"{quote_of_the_day}"</p>
      </div>

      <div className="next-reminder mt-6 text-center">
            {
                (() => {
                const today = new Date();
                const nextSuggestedDate = new Date(data.next_suggested_time);
                const timeDifference = nextSuggestedDate - today;
                const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
                return (
                    <p className="text-md">
                    Keep going, keep pushing! You have <span className="font-bold text-blue-600">{daysLeft} days</span> left to change your <span className="font-bold text-green-600">{data.group}</span>. As long as you keep going.
                    </p>
                );
                })()
            }
        </div>
    </div>
  );
};

export default Dashboard;
