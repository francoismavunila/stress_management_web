'use client'
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoxBreathing = () => {
  const [breathState, setBreathState] = useState('Inhale');
  const [boxStyle, setBoxStyle] = useState({});
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [voices, setVoices] = useState([]);
  const audioRef = useRef(null); // Use useRef to store the audio element
  const metronomeRef = useRef(null); // Use useRef to store the metronome sound

  const saveEngagement = async () => {
    const token = localStorage.getItem('stm_token');
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/engangement/`,
      { 'tool_name': 'Breathing and Meditation' },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const speak = (text, rate = 1, pitch = 1) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // Set the speed of the speech
    utterance.pitch = pitch; // Set the tone of the speech

    // Find a female voice
    const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.gender === 'female');

    // If a female voice is found, set it
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    speechSynthesis.speak(utterance);
  };

  const cycle = [
    { state: 'Inhale', duration: 4000, boxStyle: { transform: 'scale(1.2)', backgroundColor: '#a3d8f4' }, indicatorStyle: { animation: 'moveRight 4s linear forwards' }, message: "Inhale" },
    { state: 'Hold', duration: 4000, boxStyle: { transform: 'scale(1.2)', backgroundColor: '#82c8e6' }, indicatorStyle: { animation: 'moveDown 4s linear forwards' }, message: "Hold" },
    { state: 'Exhale', duration: 4000, boxStyle: { transform: 'scale(1)', backgroundColor: '#5bb5d4' }, indicatorStyle: { animation: 'moveLeft 4s linear forwards' }, message: "Exhale" },
    { state: 'Hold', duration: 4000, boxStyle: { transform: 'scale(1)', backgroundColor: '#a3d8f4' }, indicatorStyle: { animation: 'moveUp 4s linear forwards' }, message: "Hold" },
  ];

  let currentIndex = 0;
  let timeElapsed = 0;
  let interval; // Define interval in the correct scope

  const updateBreathState = () => {
    console.log(timeElapsed);
    
    if (timeElapsed === 60) {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset the audio to the beginning
        metronomeRef.current.pause()
        metronomeRef.current.currentTime = 0;
      }
      toast.success("Well done, keep practicing. See you tomorrow.");
      speak("Well done, keep practicing. See you tomorrow.");
      saveEngagement()
      return;
    }
    speak(`${cycle[currentIndex].message}`, 1, 1);
    setBreathState(cycle[currentIndex].state);
    setBoxStyle(cycle[currentIndex].boxStyle);
    setIndicatorStyle(cycle[currentIndex].indicatorStyle);

    // Play metronome sound
    if (metronomeRef.current) {
      metronomeRef.current.play();
    }

    currentIndex = (currentIndex + 1) % cycle.length;
    timeElapsed = timeElapsed + 4;
  };

  useEffect(() => {
    // Initialize voices
    const initializeVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          setVoices(speechSynthesis.getVoices());
          setIsButtonDisabled(false);
        });
      } else {
        setVoices(voices);
        setIsButtonDisabled(false);
      }
    };

    // Call initializeVoices to ensure voices are loaded
    initializeVoices();

    // Load metronome sound
    const metronomeElement = new Audio('/mp3/metronome.mp3');
    metronomeRef.current = metronomeElement;
  }, []);

  const startExercise = () => {
    setIsExerciseStarted(true);
    const audioElement = new Audio('/mp3/meditation.mp3');
    audioRef.current = audioElement;
    audioElement.play();
    interval = setInterval(updateBreathState, cycle[currentIndex].duration);
    updateBreathState();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 p-4">
      <ToastContainer />
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Box Breathing Exercise</h2>
      <p className="mb-4 text-lg text-center text-gray-700">Follow the box and the indicator as they guide your breathing:</p>
      <div className="relative w-32 h-32 mb-6" style={{ ...boxStyle, transition: 'transform 4s ease, background-color 4s ease' }}>
        <div className="absolute w-full h-full border-4 border-gray-600 rounded-lg"></div>
        <div className="absolute w-4 h-4 bg-blue-600 rounded-full" style={indicatorStyle}></div>
      </div>
      <p className="mt-6 text-2xl font-semibold text-gray-800">{breathState}</p>
      <button
        className={`mt-6 px-6 py-3 text-white font-bold rounded-full shadow-lg transform transition-transform hover:scale-105 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        disabled={isButtonDisabled}
        onClick={startExercise}
      >
        Start
      </button>
      <style jsx>{`
        @keyframes moveRight {
          0% { top: 0; left: 0; }
          100% { top: 0; left: calc(100% - 16px); }
        }
        @keyframes moveDown {
          0% { top: 0; left: calc(100% - 16px); }
          100% { top: calc(100% - 16px); left: calc(100% - 16px); }
        }
        @keyframes moveLeft {
          0% { top: calc(100% - 16px); left: calc(100% - 16px); }
          100% { top: calc(100% - 16px); left: 0; }
        }
        @keyframes moveUp {
          0% { top: calc(100% - 16px); left: 0; }
          100% { top: 0; left: 0; }
        }
      `}</style>
    </div>
  );
};

export default BoxBreathing;