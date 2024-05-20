'use client'
import React,{useState} from 'react';
import Overview from './components/Overvie';
import TopSales from './components/TopSales';
import DemandForecasting from './components/DemandForecasting';
import LineChart from './components/LineChart';

function Dashboard() {
    function getRandomColor() {
        var r = Math.floor(Math.random() * 256);          // Random between 0-255
        var g = Math.floor(Math.random() * 256);          // Random between 0-255
        var b = Math.floor(Math.random() * 256);          // Random between 0-255
        return 'rgba(' + r + ', ' + g + ', ' + b + ', 1)'; // Collect all to a string
    }
    const [chartData, setChartData] = useState({
        labels: ["mon", "tue", "wed", "thur", "friday","sat","sun"],
        datasets: [
          {
            label: "Soft Drinks",
            data: [45, 67, 88, 90, 43, 75, 60,70],
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
          {
            label: "Bread",
            data: [80, 79, 84, 80, 60, 75, 67,90],
            backgroundColor: "#00FF00",
            borderColor: "#00FF00",
            borderWidth: 1,
          },
          {
            label: 'Snacks',
            data: [70, 68, 76, 75, 65, 70, 60, 80],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          }
        ]
      });
    
      const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
        plugins: {
          legend: {
            display: true, // Ensures the legend is shown
            position: 'top', // Positions the legend at the top of the chart
            labels: {
              color: 'black', // Sets the color of the labels
              font: {
                size: 16, // Sets the font size of the labels
              },
            },
          },
        },
      };

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
            <div className='w-full h-max bg-white p-2 rounded-xl md:w-3/5'>
            <LineChart chartData={chartData} options={options} />
            </div>
            <div className='w-full bg-white rounded-xl md:w-3/5'>
            <TopSales salesData={salesData} className="w-full"/>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;