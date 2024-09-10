'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';

const GoalSettingTool = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Low',
  });
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem('stm_token');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/goal-setting/get-goals/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(response.data.goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const markGoalAsAchieved = async (goalId) => {
    const token = localStorage.getItem('stm_token');
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/goal-setting/update-goal/${goalId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedGoals = goals.map((goal) =>
        goal.id === goalId ? { ...goal, achieved: true, achieved_at: new Date() } : goal
      );
      setGoals(updatedGoals);
      toast.success("Goal achieved! Great job!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Show confetti for 5 seconds
    } catch (error) {
      console.error('Error marking goal as achieved:', error);
      toast.error("Error marking goal as achieved. Please try again.");
    }
  };

  const addGoal = async () => {
    const token = localStorage.getItem('stm_token');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/goal-setting/add-goal/`, newGoal, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals([...goals, response.data.goal]);
      setShowModal(false);
      setNewGoal({
        title: '',
        description: '',
        deadline: '',
        priority: 'Low',
      });
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/engangement/`,
        { 'tool_name': 'Goal Setting' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Goal added successfully!");
    } catch (error) {
      console.error('Error adding goal:', error);
      toast.error("Error adding goal. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300 p-6 flex justify-center items-center">
      <div className="max-w-6xl mx-auto bg-transparent rounded-lg shadow-lg p-8 md:w-full">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Goal Setting Tool</h1>

        {/* Add Goal Button */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add New Goal
          </button>
        </div>

        {/* Goals Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Uncompleted Goals</h2>
          {goals.filter(goal => !goal.completed).map((goal) => (
            <div key={goal.id} className="p-6 bg-gray-100 rounded-lg shadow-md lg:max-w-lg">
              <h3 className="text-2xl font-semibold text-gray-800">{goal.title}</h3>
              <p className="text-gray-600">{goal.description}</p>
              <p className="text-gray-600">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
              <button
                onClick={() => markGoalAsAchieved(goal.id)}
                className="mt-4 bg-green-500 text-white p-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Achieved
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Completed Goals</h2>
          {goals.filter(goal => goal.completed).map((goal) => (
            <div key={goal.id} className="p-6 bg-gray-100 rounded-lg shadow-md lg:max-w-lg">
              <h3 className="text-2xl font-semibold text-gray-800">{goal.title}</h3>
              <p className="text-gray-600">{goal.description}</p>
              <p className="text-gray-600">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
              <p className="text-green-600 font-bold mt-4">Goal Achieved on {new Date(goal.achieved_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Add Goal Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Goal</h2>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Goal Title"
                className="w-full p-3 mb-4 border rounded-lg"
              />
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Goal Description"
                className="w-full p-3 mb-4 border rounded-lg"
              ></textarea>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="w-full p-3 mb-4 border rounded-lg"
              />
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                className="w-full p-3 mb-4 border rounded-lg"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white p-3 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={addGoal}
                  className="bg-blue-600 text-white p-3 rounded-lg"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showConfetti && <Confetti />}
      <ToastContainer />
    </div>
  );
};

export default GoalSettingTool;