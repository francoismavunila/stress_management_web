import React from 'react';
import Overview from './components/Overvie';
import TopSales from './components/TopSales';
import DemandForecasting from './components/DemandForecasting';

function Dashboard() {
    const salesData = [
        { name: 'Pepsi', sales: 400 },
        { name: 'Bread', sales: 300 },
        { name: 'Lemon creams', sales: 210 },
        { name: 'Hellos', sales: 100 },
        { name: 'Go slo', sales: 90 },
        { name: 'Coca cola', sales: 10 },
      ];
  return (
    <div >
        <Overview/>
        <div className="flex w-full flex-col space-y-5 my-10 md:space-y-0 md:flex-row md:space-x-5 md:justify-between">
            <div className='w-full p-2 bg-white rounded-xl md:w-3/5'>
            <DemandForecasting className="w-full max-w-xl"/>
            </div>
            <div className='w-full bg-white rounded-xl md:w-3/5'>
            <TopSales salesData={salesData} className="w-full"/>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;