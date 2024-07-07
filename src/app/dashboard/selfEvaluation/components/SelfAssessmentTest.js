'use client'
import React, { useState } from 'react';

const SelfAssessmentTest = () => {
  const [section, setSection] = useState(1);
  const [responses, setResponses] = useState({
    mood: {},
    stress: {},
    productivity: {},
    selfImprovement: {},
  });

  const handleInputChange = (section, question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [section]: {
        ...prevResponses[section],
        [question]: value,
      },
    }));
  };

  const handleNext = () => {
    if (section < 4) {
      setSection(section + 1);
    } else {
      console.log('Submit responses:', responses);
      // Handle form submission (e.g., send responses to backend)
    }
  };

  const handlePrev = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  const renderSection = () => {
    switch (section) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mood Assessment</h2>
            <div className="mb-4">
              <label className="block mb-2">How often do you feel happy and content?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('mood', 'happy', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you feel sad or down?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('mood', 'sad', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you feel irritable or angry?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('mood', 'irritable', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Do you find joy in activities you used to enjoy?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('mood', 'joy', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Stress and Anxiety Assessment</h2>
            <div className="mb-4">
              <label className="block mb-2">How often do you feel overwhelmed by your responsibilities?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('stress', 'overwhelmed', e.target.value)}
              >
                <option value="">Select</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely</option>
                <option value="sometimes">Sometimes</option>
                <option value="often">Often</option>
                <option value="always">Always</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you experience physical symptoms of stress (e.g., headaches, muscle tension)?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('stress', 'physical_symptoms', e.target.value)}
              >
                <option value="">Select</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely</option>
                <option value="sometimes">Sometimes</option>
                <option value="often">Often</option>
                <option value="always">Always</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you feel anxious or worried about the future?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('stress', 'anxious', e.target.value)}
              >
                <option value="">Select</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely</option>
                <option value="sometimes">Sometimes</option>
                <option value="often">Often</option>
                <option value="always">Always</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you find it difficult to relax?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('stress', 'relax', e.target.value)}
              >
                <option value="">Select</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely</option>
                <option value="sometimes">Sometimes</option>
                <option value="often">Often</option>
                <option value="always">Always</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Productivity Assessment</h2>
            <div className="mb-4">
              <label className="block mb-2">How often do you feel productive and efficient in your tasks?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('productivity', 'productive', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you struggle with procrastination?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('productivity', 'procrastination', e.target.value)}
              >
                <option value="">Select</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely</option>
                <option value="sometimes">Sometimes</option>
                <option value="often">Often</option>
                <option value="always">Always</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you feel satisfied with your accomplishments at the end of the day?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('productivity', 'satisfaction', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you manage your time effectively?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('productivity', 'time_management', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Self-Improvement Assessment</h2>
            <div className="mb-4">
              <label className="block mb-2">How often do you set and work towards personal goals?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('selfImprovement', 'goals', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you seek opportunities for learning and growth?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('selfImprovement', 'learning', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you reflect on your personal growth?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('selfImprovement', 'reflection', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">How often do you engage in activities that challenge and inspire you?</label>
              <select
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange('selfImprovement', 'challenge', e.target.value)}
              >
                <option value="">Select</option>
                <option value="always">Always</option>
                <option value="often">Often</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      {renderSection()}
      <div className="flex justify-between mt-6">
        {section > 1 && (
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={handlePrev}
          >
            Previous
          </button>
        )}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNext}
        >
          {section < 4 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default SelfAssessmentTest;
