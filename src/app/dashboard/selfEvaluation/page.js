'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SelfAssessmentTest from './components/SelfAssessmentTest';
import SelfAssessmentResults from './components/SelfAssessmentResults';

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [responses, setResponses] = useState(null);
  const [classification, setClassification] = useState('');
  const [suggestedTools, setSuggestedTools] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const searchParams = useSearchParams();
  const res = searchParams.get('res') || 'true';
  const resBoolean = res === 'true';

  useEffect(() => {
    setShowResults(resBoolean);
  }, [resBoolean]);

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
          classification={classification}
          suggestedTools={suggestedTools}
        />
      )}
    </div>
  );
};

export default Page;
