// components/LineChart.js
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Demand Forecast</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}

export default LineChart;
