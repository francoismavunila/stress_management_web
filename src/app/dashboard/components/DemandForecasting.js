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
        { y: 155, label: "20 May" },
        { y: 150, label: "21 May" },
        { y: 152, label: "22 May" },
        { y: 148, label: "23 May" },
        { y: 142, label: "24 May" },
        { y: 150, label: "25 May" },
        { y: 155, label: "26 May" },
        { y: 150, label: "27 May" },
        { y: 152, label: "28 May" },
        { y: 148, label: "29 May" },
        { y: 142, label: "30 May" },
        { y: 150, label: "31 May" },
        { y: 155, label: "1 June" },
        { y: 150, label: "2 June" },
      ]
    },
    {
      type: "spline",
      name: "Bread",
      showInLegend: true,
      dataPoints: [
        { y: 155, label: "20 May" },
        { y: 150, label: "21 May" },
        { y: 152, label: "22 May" },
        { y: 148, label: "23 May" },
        { y: 142, label: "24 May" },
        { y: 150, label: "25 May" },
        { y: 155, label: "26 May" },
        { y: 150, label: "27 May" },
        { y: 152, label: "28 May" },
        { y: 148, label: "29 May" },
        { y: 142, label: "30 May" },
        { y: 150, label: "31 May" },
        { y: 155, label: "1 June" },
        { y: 150, label: "2 June" },
      ]
    },
    {
      type: "spline",
      name: "Snacks",
      showInLegend: true,
      dataPoints: [
        { y: 160, label: "20 May" },
        { y: 155, label: "21 May" },
        { y: 157, label: "22 May" },
        { y: 153, label: "23 May" },
        { y: 147, label: "24 May" },
        { y: 155, label: "25 May" },
        { y: 160, label: "26 May" },
        { y: 155, label: "27 May" },
        { y: 157, label: "28 May" },
        { y: 153, label: "29 May" },
        { y: 147, label: "30 May" },
        { y: 155, label: "31 May" },
        { y: 160, label: "1 June" },
        { y: 155, label: "2 June" },
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