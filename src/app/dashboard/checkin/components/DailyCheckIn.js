'use client'
import React, { useState } from 'react';
import JournalComponent from './JournalComponent';
import QuoteComponent from './QuoteComponent';
import AffirmationComponent from './AffirmationComponent';
import BreathingComponent from './BreathingComponent';

const DailyCheckIn = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    JournalComponent,
    QuoteComponent,
    AffirmationComponent,
    BreathingComponent,
  ];

  const handleCompleteStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Daily check-in complete!');
      // Optionally handle end of check-in process
    }
  };

  const CurrentComponent = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CurrentComponent onComplete={handleCompleteStep} />
    </div>
  );
};

export default DailyCheckIn;
