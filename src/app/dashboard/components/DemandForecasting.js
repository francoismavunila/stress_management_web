'use client'
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DemandForecasting = () => {
  const options = {
    animationEnabled: true,	
    title:{
      text: "demand forecasting"
    },
    axisY : {
      title: "demand"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "soft drinks",
      showInLegend: true,
      dataPoints: [
        { y: 155, label: "Monday" },
        { y: 150, label: "Tuesday" },
        { y: 152, label: "Wednesday" },
        { y: 148, label: "Thursday" },
        { y: 142, label: "Friday" },
        { y: 150, label: "Saturday" },
      ]
    },
    {
      type: "spline",
      name: "Bread",
      showInLegend: true,
      dataPoints: [
        { y: 120, label: "Monday" },
        { y: 125, label: "Tuesday" },
        { y: 130, label: "Wednesday" },
        { y: 135, label: "Thursday" },
        { y: 140, label: "Friday" },
        { y: 145, label: "Saturday" },
      ]
    },
    {
      type: "spline",
      name: "Snacks",
      showInLegend: true,
      dataPoints: [
        { y: 160, label: "Monday" },
        { y: 155, label: "Tuesday" },
        { y: 157, label: "Wednesday" },
        { y: 153, label: "Thursday" },
        { y: 147, label: "Friday" },
        { y: 155, label: "Saturday" },
      ]
    }
  ]
}
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default DemandForecasting;