import React from 'react'

function Restock({name}) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-5">
      <form>
        <h1 className="text-2xl font-bold mb-5">{name} Restocking</h1>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Number of new items</label>
          <input type="number" className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
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

export default Restock