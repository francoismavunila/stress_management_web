'use client'
import React, { useState } from "react";
import Modal from "../components/Modal";
import Insight from "./Insight";

export default function ProductInsights() {
  const insights = [
    {
      product: 'bread',
      priceSuggestion: 'fine',
      stockLevel: 'good',
      stockSuggestion: 'stocking more, your price is good',
      details: 'Your sales data shows that bread is a popular item in your location. Consider stocking more to meet demand.'
    },
    {
      product: 'soft drink',
      priceSuggestion: 'increase',
      stockLevel: 'low',
      stockSuggestion: 'stock less, less demand',
      details: 'You sold more of Pepsi than Coca Cola. I suggest you stock more of Pepsi and Coca Cola because your location shows that people will buy more of these. To sell more Coke, consider decreasing the price to 0.80 dollars as most people in the location are at that price. \n Also weather data shows that it might be verry hot in the next 2 weeks, you can increase your soft drinks y 20 more pepsi and 5 coke so as to meet the demand  driven by hot weather'
    },
    {
      product: 'snacks',
      priceSuggestion: 'decrease',
      stockLevel: 'high',
      stockSuggestion: 'stock less',
      details: 'Your sales data in your area shows that snacks are less popular in your location. Consider decreasing the price to increase sales. \n You might also have to look at selling snacks at a location closer to a school, as children are the most consumers'
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(null);

  const handleOpenModal = (insight) => {
    setCurrentInsight(insight);
    setIsModalOpen(true);
  };

  return (
    <div className="General grid grid-cols-1 md:grid-cols-3 gap-4">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Insight insight={currentInsight}/>
        </Modal>
      {insights.map((insight, index) => (
        <div key={index} className={`rounded-lg overflow-hidden shadow-lg border-2 p-6 bg-white ${insight.stockLevel!='low'? 'border-green-500' : 'border-red-500'}`}>
          <h3 className="font-bold text-xl mb-4">{insight.product}</h3>
          <div className="mb-4">
            <h6 className="font-bold">Price Suggestion:</h6>
            <p>{insight.priceSuggestion}</p>
          </div>
          <div>
            <h6 className="font-bold">Stock Level:</h6>
            <p>{insight.stockLevel}</p>
          </div>
          <div>
            <h6 className="font-bold">Stock Suggestion:</h6>
            <p>{insight.stockSuggestion}</p>
          </div>
          <button onClick={() => handleOpenModal(insight)} className="bg-primary mt-4 hover:bg-mainbg hover:text-black text-white font-bold py-2 px-4 rounded">
            More Insights
          </button>
        </div>
      ))}
    </div>
  );
}