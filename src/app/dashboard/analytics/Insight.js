// ProductCard.js
import React from 'react';

export default function Insight({ insight }) {
  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
      <h3 className="font-bold text-xl mb-4 text-primary">{insight.product}</h3>
      <div className="mb-4">
        <h4 className="font-bold text-gray-800">Price Suggestion:</h4>
        <p>{insight.priceSuggestion}</p>
      </div>
      <div>
        <h4 className="font-bold text-gray-800">Stock Suggestion:</h4>
        <p>{insight.stockSuggestion}</p>
      </div>
      <div>
        <h4 className="font-bold text-gray-800">More Insights:</h4>
        <p>{insight.details}</p>
      </div>
    </div>
  );
}