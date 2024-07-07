import React, { useState } from 'react';
import JournalComponent from './JournalComponent';
import QuoteComponent from './QuoteComponent';
import AffirmationComponent from './AffirmationComponent';
import BreathingComponent from './BreathingComponent';
import withTimer from './withTimer';

const TimedBreathingComponent = withTimer(BreathingComponent);

const DailyCheckIn = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    JournalComponent,
    QuoteComponent,
    AffirmationComponent,
    TimedBreathingComponent,
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
