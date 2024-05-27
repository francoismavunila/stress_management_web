import React, { useState } from 'react'
import axios from 'axios';

function Sales({name, productId, reload}) {
  const [soldItems, setSoldItems] = useState(0)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      // Fetch the current product
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${productId}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
  // Fetch all categories
  const categoriesResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });

  // Find the category that matches response.data.category
  const category = categoriesResponse.data.find(cat => cat.name === response.data.category);

  // Add the number of new items to items_remaining
  const updatedProduct = {
    ...response.data,
    items_remaining: response.data.items_remaining > soldItems ? response.data.items_remaining - soldItems : 0,
    category: category ? category.id : null ,
    items_sold : response.data.items_sold+soldItems
  };
      console.log("updated product",updatedProduct)

      // Send the updated product data to the API
      await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${productId}/`, updatedProduct, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      reload()
      alert("done")
    } catch (error) {
      console.error('Error restocking product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-5">{name} Sales</h1>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Number of Items Sold</label>
          <input type="number" value={soldItems} onChange={(e) => setSoldItems(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mt-4">
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-mainbg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Sales