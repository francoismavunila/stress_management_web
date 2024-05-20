import React from 'react'
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

function Inventory() {
  const inventory = [
    { name: 'Pepsi', category: 'Soft drinks', price: 0.50, itemsSold: 23, itemsRemaining: 4 },
    { name: 'Coca cola', category: 'Soft drinks', price: 1, itemsSold: 5, itemsRemaining: 20 },
    { name: 'Bread', category: 'Bread', price: 1, itemsSold: 20, itemsRemaining: 3 },
    { name: 'lemon creams', category: 'snacks', price: 0.60, itemsSold: 12, itemsRemaining: 7 },
    { name: 'hellos', category: 'snacks', price: 0.60, itemsSold: 21, itemsRemaining: 8 },
    { name: 'go Slow', category: 'snacks', price: 0.60, itemsSold: 25, itemsRemaining: 5 },
  ];

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <h1 className="text-2xl font-bold mb-5">Inventory</h1>
        <button className="flex items-center text-white bg-primary p-1 my-3 rounded-lg"><IoMdAdd className="text-2xl"/></button>
      </div>
      <div className="overflow-auto mx--5 max-h-screen">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Sold</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Remaining</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.itemsSold}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.itemsRemaining}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900"><CiEdit/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inventory