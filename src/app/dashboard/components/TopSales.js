import React from 'react';

function TopSales({ salesData }) {
  return (
    <div className="p-4 m-2 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Sales Rankings</h2>
      {salesData.sort((a, b) => b.sales - a.sales).map((product, index) => (
        <div key={index} className="mb-2">
          <h6 className="text-lg">{product.name}   {product.sales}</h6>
          <progress className="w-full h-1.5" max={salesData[0].sales} value={product.sales}>{product.sales}</progress>
        </div>
      ))}
    </div>
  );
}

export default TopSales;