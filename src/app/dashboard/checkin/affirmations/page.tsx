'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Affirmations = () => {
    const [affirmations, setAffirmations] = useState([]);
    const [newAffirmation, setNewAffirmation] = useState('');
    const [voices, setVoices] = useState([]);
    const [isReading, setIsReading] = useState(false);

    const fetchAffirmations = async () => {
        const token = localStorage.getItem('stm_token');
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/affirmations/`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setAffirmations(response.data);
        } catch (error) {
            console.error('Error fetching affirmations:', error);
        }
    };

    const addAffirmation = async () => {
        const token = localStorage.getItem('stm_token');
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/affirmations/new/`,
                { affirmation_text: newAffirmation },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            toast.success("Added successfully");
            const resp = await axios.post(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/engangement/`,
              { 'tool_name': 'Affirmations' },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setAffirmations([response.data, ...affirmations]);
            setNewAffirmation('');
        } catch (error) {
            console.error('Error adding affirmation:', error);
        }
    };

    const readAffirmations = () => {
        setIsReading(true);
        affirmations.forEach((affirmation, index) => {
            const utterance = new SpeechSynthesisUtterance(affirmation.affirmation_text);
            utterance.voice = voices.find(voice => voice.name.includes('Female') || voice.gender === 'female');
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.onend = () => {
                if (index === affirmations.length - 1) {
                    setIsReading(false);
                }
            };
            speechSynthesis.speak(utterance);
        });
    };

    useEffect(() => {
        fetchAffirmations();

        // Initialize voices
        const initializeVoices = () => {
            const voices = speechSynthesis.getVoices();
            if (voices.length === 0) {
                speechSynthesis.addEventListener('voiceschanged', () => {
                    setVoices(speechSynthesis.getVoices());
                });
            } else {
                setVoices(voices);
            }
        };

        initializeVoices();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 flex items-center justify-center">
            <ToastContainer />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800">Daily Affirmations</h2>
                <p className="mb-6 text-lg text-center text-gray-700">Read through your affirmations, all of them, then add another one. Or press this button to have your affirmations read to you.</p>
                <div className="flex justify-center mb-6">
                    <button
                        onClick={readAffirmations}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105 ${isReading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isReading}
                    >
                        {isReading ? 'Reading...' : 'Read Affirmations Aloud'}
                    </button>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        value={newAffirmation}
                        onChange={(e) => setNewAffirmation(e.target.value)}
                        placeholder="Enter your affirmation"
                        className="p-3 border rounded w-full mb-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={addAffirmation}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105"
                    >
                        Add Affirmation
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {affirmations.map((affirmation) => (
                        <div key={affirmation.id} className="p-4 border rounded-lg bg-yellow-100 shadow-md transform transition-transform hover:scale-105">
                            <p className="text-lg font-semibold text-gray-800">{affirmation.affirmation_text}</p>
                            <small className="text-gray-600">{new Date(affirmation.completed_at).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Affirmations;