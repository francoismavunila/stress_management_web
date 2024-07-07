'use client'
import React,{ useState } from 'react';

const SelfAssessmentResults = () => {
  const [classification, setClassification] = useState('Improving Mood');
  const [suggestedTools, setSuggestedTools] = useState(['Journaling', 'Affirmations', 'Quotes']);
  const renderTools = () => {
    return suggestedTools.map((tool, index) => (
      <div key={index} className="mb-2">
        <h4 className="text-lg">{tool}</h4>
        {/* <ul className="list-disc list-inside">
          {tool.tools.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul> */}
      </div>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Your Self-Assessment Results</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Classification</h3>
        <p className="text-gray-700">{classification}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Suggested Tools for You</h3>
        {renderTools()}
      </div>
      <div className="mt-6">
        <a href="/dashboard/checkin">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Start Using These Tools
          </button>
        </a>
      </div>
    </div>
  );
};

export default SelfAssessmentResults;
