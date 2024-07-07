'use client'
import React, { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'
import SelfAssessmentTest from './components/SelfAssessmentTest';
import SelfAssessmentResults from './components/SelfAssessmentResults';

const App = () => {
    const searchParams = useSearchParams()
    let res = searchParams.get('res') || "true"
    let resBoolean = res === 'true'
  const [showResults, setShowResults] = useState(resBoolean);
  const [responses, setResponses] = useState(null);
  const [classification, setClassification] = useState('');
  const [suggestedTools, setSuggestedTools] = useState([]);

  const handleSubmitTest = (responses) => {
    setResponses(responses);
    const classification = classifyUser(responses); 
    setClassification(classification);
    const tools = getSuggestedTools(classification); 
    setSuggestedTools(tools);
    setShowResults(true);
  };

  const classifyUser = (responses) => {
    // Implement your classification logic here
    return 'You have a balanced mood';
  };

  const getSuggestedTools = (classification) => {
    // Implement your tool suggestion logic here
    return [
      {
        category: 'Improving Mood',
        tools: ['Journaling', 'Affirmations', 'Quotes'],
      },
      {
        category: 'Increasing Productivity',
        tools: ['Breathing and Meditation'],
      },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!showResults ? (
        <SelfAssessmentTest onSubmit={handleSubmitTest} />
      ) : (
        <SelfAssessmentResults
        />
      )}
    </div>
  );
};

export default App;
