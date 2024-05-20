import React from 'react';

function TopSales({ salesData }) {
  return (
    <div className="p-4 m-2 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Sales Rankings</h2>
      {salesData.sort((a, b) => b.sales - a.sales).map((product, index) => (
        <div key={index} className="mb-2">
          <h3 className="text-lg">{product.name}</h3>
          <progress className="w-full" max={salesData[0].sales} value={product.sales}></progress>
        </div>
      ))}
    </div>
  );
}

export default TopSales;