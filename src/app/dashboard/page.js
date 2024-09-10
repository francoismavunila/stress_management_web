'use client'
import React,{useState, useEffect} from 'react';
import SelfAssessmentTest from './selfEvaluation/components/SelfAssessmentTest';
import DashboardPage from './dashboard'
import axios from 'axios';

function Dashboard() {
  const [showResults, setShowResults] = useState('maybe')
  const [results, setResults] = useState({});
  const getResults = async()=>{
    const token = localStorage.getItem('stm_token');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/assessment/self-assessment-responses/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      console.log('Response from server:', response.data);
      console.log('Status Response from server:', response.status);
      if (response.status === 200) {
        const currentTime = new Date();
  
        if (new Date(response.data.next_suggested_time) > currentTime) {
          setResults(response.data); 
          setShowResults('yes')
        } else {
          setShowResults('no');
        }
        
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setShowResults('no');
      } else {
        console.error('Error:', error);
      }
    }
  }
  
  useEffect(()=>{
    getResults()
  },[])

  return (
    <div >
        
        {
        showResults === 'yes' ? (
          <DashboardPage/>
        ) : showResults === 'no' ? (
          <SelfAssessmentTest />
        ) : <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      }
    </div>
  );
}

export default Dashboard;