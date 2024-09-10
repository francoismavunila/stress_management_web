'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';


const TimeManagementTool = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', start_time: '', end_time: '' });
  const [engagement, setEngagement] = useState(null);
  const [openAddTask, setOpenAddTask] = useState(false); // Collapsible state for "Add a Task"
  const [openTasksList, setOpenTasksList] = useState(true); // Collapsible state for task list
  const [openCompletedTasks, setOpenCompletedTasks] = useState(false); // Collapsible state for completed tasks
  const [showConfetti, setShowConfetti] = useState(false);
  
  const fetchTasks = async () => {
    const token = localStorage.getItem('stm_token');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/time-management/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskCompletion = async (id) => {
    const token = localStorage.getItem('stm_token');
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/time-management/tasks/${id}/complete/`,
        {}, // Empty data object
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("success, You are doing well, Look at how productive you become");
      
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/engangement/`,
        { 'tool_name': 'Time Management' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error("Error completing task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('stm_token');
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/time-management/tasks/`,
        newTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("successfully added a task")
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', start_time: '', end_time: '' });
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error("error adding a task")
    }
  };

  const toggleAddTask = () => setOpenAddTask(!openAddTask);
  const toggleTasksList = () => setOpenTasksList(!openTasksList);
  const toggleCompletedTasks = () => setOpenCompletedTasks(!openCompletedTasks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Time Management Tool</h1>
        <ToastContainer />
        {showConfetti && <Confetti />}
        {/* Add a Task Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center cursor-pointer" onClick={toggleAddTask}>
            <h2 className="text-2xl font-semibold text-gray-700">Add a Task</h2>
            {openAddTask ? <AiOutlineMinus className="text-xl" /> : <AiOutlinePlus className="text-xl" />}
          </div>
          {openAddTask && (
            <div className="mt-4">
              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
                />
                <textarea
                  placeholder="Task Description (Optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="datetime-local"
                  value={newTask.start_time}
                  onChange={(e) => setNewTask({ ...newTask, start_time: e.target.value })}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="datetime-local"
                  value={newTask.end_time}
                  onChange={(e) => setNewTask({ ...newTask, end_time: e.target.value })}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
                >
                  Add Task
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Task List Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center cursor-pointer" onClick={toggleTasksList}>
            <h2 className="text-2xl font-semibold text-gray-700">Tasks List</h2>
            {openTasksList ? <AiOutlineMinus className="text-xl" /> : <AiOutlinePlus className="text-xl" />}
          </div>
          {openTasksList && (
            <ul className="mt-4 space-y-4">
              {tasks.filter(task => !task.completed).map((task) => (
                <li key={task.id} className="p-4 bg-blue-100 rounded-lg shadow-sm hover:bg-blue-200 transition duration-300">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{task.title}</span>
                    <span className="text-sm text-gray-600">
                      {new Date(task.start_time).toLocaleTimeString()} - {new Date(task.end_time).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <button
                    onClick={() => handleTaskCompletion(task.id)}
                    className="bg-blue-500 text-white p-1.5 mt-2 rounded hover:bg-blue-600"
                  >
                    Mark as Done
                  </button>
                </li>
              ))}
              {tasks.filter(task => !task.completed).length === 0 && <p className="text-gray-500">No tasks yet. Start adding some tasks!</p>}
            </ul>
          )}
        </div>

        {/* Completed Tasks Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center cursor-pointer" onClick={toggleCompletedTasks}>
            <h2 className="text-2xl font-semibold text-gray-700">Completed Tasks</h2>
            {openCompletedTasks ? <AiOutlineMinus className="text-xl" /> : <AiOutlinePlus className="text-xl" />}
          </div>
          {openCompletedTasks && (
            <ul className="mt-4 space-y-4">
              {tasks.filter(task => task.completed).map((task) => (
                <li key={task.id} className="p-4 bg-green-100 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{task.title}</span>
                    <span className="text-sm text-gray-600">
                      {new Date(task.start_time).toLocaleTimeString()} - {new Date(task.end_time).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <span className="text-green-600 font-bold">Completed</span>
                </li>
              ))}
              {tasks.filter(task => task.completed).length === 0 && <p className="text-gray-500">No completed tasks yet.</p>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeManagementTool;
