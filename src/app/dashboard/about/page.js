import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300 p-6 flex justify-center items-center">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">About My App</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calm Mind</h2>
          <p className="text-gray-600">
            Calm mind is an app that offers a single space where users can work on and or improve certain areas of their lives including; stress management, productivity, and anxiety. In this fast-paced world, it gets impossible to keep up at times but with the help of my app, it can make an impossible situation more bearable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why I Built This App</h2>
          <p className="text-gray-600">
            After getting first-hand experience of how busy and stressful managing day-to-day activities can be, I took it upon myself to create an app that would not only help people manage their stress but also stay organized and keep a positive outlook on life.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Mission</h2>
          <p className="text-gray-600">
            My goal is to simply: make your journey toward a happier, healthier life a little easier and more enjoyable. Whether you’re setting goals, tracking your mood, or just need a moment to breathe, this app is here to support you every step of the way.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">About Me</h2>
          <p className="text-gray-600">
            I am a final year Computer Engineering and Mechatronics student at the University of Economy in Bydgoszcz.
          </p>
          <p className="text-gray-600">
            This project is a great part of my final grade and contribution towards the completion of my studies. I had the opportunity to seek advice and collaborate with my supervisor Mr. Marek Szczutkowski.
          </p>
        </section>

        <footer className="text-center mt-8">
          <p className="text-gray-600">Established October 2024</p>
        </footer>
      </div>
    </div>
  );
};

export default About;