'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const mockEngagementData = {
  journaling: [
    { date: '2024-07-01', used: true },
    { date: '2024-07-02', used: false },
    { date: '2024-07-03', used: true },
  ],
  quotes: [
    { date: '2024-07-01', used: true },
    { date: '2024-07-02', used: true },
    { date: '2024-07-03', used: false },
  ],
  affirmations: [
    { date: '2024-07-01', used: false },
    { date: '2024-07-02', used: true },
    { date: '2024-07-03', used: true },
  ],
  breathing: [
    { date: '2024-07-01', used: true },
    { date: '2024-07-02', used: true },
    { date: '2024-07-03', used: true },
  ],
};

const ToolsEngagement = () => {
  const [engagementData, setEngagementData] = useState({});

  useEffect(() => {
    // Simulate fetching data from an API
    setEngagementData(mockEngagementData);
  }, []);

  const getChartData = (data) => {
    const labels = data.map((entry) => entry.date);
    const usedData = data.map((entry) => (entry.used ? 1 : 0));

    return {
      labels,
      datasets: [
        {
          label: 'Usage',
          data: usedData,
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Tools Engagement</h2>
        <div>
          {Object.keys(engagementData).map((tool) => (
            <div key={tool} className="mb-6">
              <h3 className="text-xl font-semibold mb-2 capitalize">{tool}</h3>
              <table className="w-full text-left mb-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Used</th>
                  </tr>
                </thead>
                <tbody>
                  {engagementData[tool].map((entry, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{entry.date}</td>
                      <td className="px-4 py-2">
                        {entry.used ? (
                          <span className="text-green-500">✔️</span>
                        ) : (
                          <span className="text-red-500">❌</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full mb-4">
                <Line data={getChartData(engagementData[tool])} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsEngagement;
