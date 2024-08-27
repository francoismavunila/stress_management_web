'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SelfAssessmentTest = () => {

  const [section, setSection] = useState(1);
  const [responses, setResponses] = useState({
    mood: {},
    stress: {},
    productivity: {},
    self_improvement: {},
  });
  
  const handleInputChange = (sectionName, question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [sectionName]: {
        ...prevResponses[sectionName],
        [question]: value,
      },
    }));
  };

  const transformResponses = async (responses) => {
    const transformed = {};
    for (const category in responses) {
      for (const key in responses[category]) {
        transformed[`${category}_${key}`] = responses[category][key];
      }
    }
    return transformed;
  };

  const handleNext = async () => {
    if (section < 4) {
      setSection(section + 1);
    } else {
      console.log('Submit responses:', responses);
      const transformedResponses = await transformResponses(responses);
      console.log('Transformed responses:', transformedResponses);

      const token = localStorage.getItem('stm_token');
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/assessment/self-assessment-responses/`,
          transformedResponses,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        console.log('Response from server:', response.data);
        if (response.status === 201) {
          toast.success("success");
          console.log("am about to refresh")
          window.location.reload();
        } else {
          toast.error("error submitting the exam, try again");
        }
      } catch (error) {
        console.error('Error submitting responses:', error);
      }
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
            {renderQuestion('mood', 'happy', 'How often do you feel happy and content?')}
            {renderQuestion('mood', 'sad', 'How often do you feel sad or down?')}
            {renderQuestion('mood', 'irritable', 'How often do you feel irritable or angry?')}
            {renderQuestion('mood', 'joy', 'Do you find joy in activities you used to enjoy?')}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Stress and Anxiety Assessment</h2>
            {renderQuestion('stress', 'overwhelmed', 'How often do you feel overwhelmed by your responsibilities?')}
            {renderQuestion('stress', 'physical_symptoms', 'How often do you experience physical symptoms of stress (e.g., headaches, muscle tension)?')}
            {renderQuestion('stress', 'anxious', 'How often do you feel anxious or worried about the future?')}
            {renderQuestion('stress', 'relax', 'How often do you find it difficult to relax?')}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Productivity Assessment</h2>
            {renderQuestion('productivity', 'productive', 'How often do you feel productive and efficient in your tasks?')}
            {renderQuestion('productivity', 'procrastination', 'How often do you struggle with procrastination?')}
            {renderQuestion('productivity', 'satisfaction', 'How often do you feel satisfied with your accomplishments at the end of the day?')}
            {renderQuestion('productivity', 'time_management', 'How often do you manage your time effectively?')}
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Self-Improvement Assessment</h2>
            {renderQuestion('self_improvement', 'goals', 'How often do you set and work towards personal goals?')}
            {renderQuestion('self_improvement', 'learning', 'How often do you seek opportunities for learning and growth?')}
            {renderQuestion('self_improvement', 'reflection', 'How often do you reflect on your personal growth?')}
            {renderQuestion('self_improvement', 'challenge', 'How often do you engage in activities that challenge and inspire you?')}
          </div>
        );
      default:
        return null;
    }
  };

  const renderQuestion = (sectionName, question, label) => (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <select
        className="block w-full p-2 border border-gray-300 rounded"
        value={responses[sectionName][question] || ''}
        onChange={(e) => handleInputChange(sectionName, question, e.target.value)}
      >
        <option value="">Select</option>
        <option value="always">Always</option>
        <option value="often">Often</option>
        <option value="sometimes">Sometimes</option>
        <option value="rarely">Rarely</option>
        <option value="never">Never</option>
      </select>
    </div>
  );

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
        <ToastContainer />
      </div>
    </div>
  );
};

export default SelfAssessmentTest;
