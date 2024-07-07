'use client'
import React,{useState, useEffect} from 'react';


function Dashboard() {

  return (
    <div >
        <a href="/dashboard/selfEvaluation?res=false" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Take a self evaluation test</a>
    </div>
  );
}

export default Dashboard;