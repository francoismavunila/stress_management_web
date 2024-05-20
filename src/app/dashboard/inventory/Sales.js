import React from 'react'

function AddProduct() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-5">
      <form>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Items Sold</label>
          <input type="number" className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
      </form>
    </div>
  )
}

export default AddProduct