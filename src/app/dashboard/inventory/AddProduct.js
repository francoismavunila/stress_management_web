import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct({reload}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('1');
  const [items_remaining, setNumberOfItems] = useState(0);
  const [items_sold,setSoldItems] = useState(0);
  const [price,setPrice] = useState(0);
  const [description,setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
   
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`,{
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(response.data)
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const product = { name, category, items_remaining, items_sold, price, description };
    console.log("product", product)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/`, product, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log(response)
      console.log(response)
      if (response.status === 201) {
        console.log(response.data);
        toast.success(response.data.message);
        setName('');
        setCategory('');
        setNumberOfItems(0);
        setSoldItems(0);
        setPrice(0)
        setDescription("")
        reload()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response)
      console.log(error.response.data.message)
      toast.error(error.response.data.message?error.response.data.message:'faied to add an item. Please try again.')
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-5">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-5">add new product</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Number of Items</label>
          <input type="number" value={items_remaining} onChange={(e) => setNumberOfItems(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Sold Items</label>
          <input type="number" value={items_sold} onChange={(e) => setSoldItems(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mt-4">
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-mainbg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct