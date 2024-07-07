import React, { useState, useEffect } from 'react';

const BreathingComponent = ({ onComplete }) => {
  const [phase, setPhase] = useState('Inhale');
  const [count, setCount] = useState(4);

  useEffect(() => {
    const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 4));
      setPhase((prevPhase) => phases[(phases.indexOf(prevPhase) + 1) % 4]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h3 className="text-xl font-semibold mb-2">Breathing and Meditation</h3>
      <div className="text-center mt-4">
        <p className="text-2xl">{phase}</p>
        <p className="text-4xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default BreathingComponent;
