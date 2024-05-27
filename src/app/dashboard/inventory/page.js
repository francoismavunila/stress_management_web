'use client'
import React,{useState, useEffect} from 'react'
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import AddProduct from "./AddProduct"
import Sales from './Sales';
import Restock from './Restock';
import Modal from '../components/Modal';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import { MdDeleteOutline } from "react-icons/md";

function Inventory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);
    const [productName, setProductName] = useState("product")
    const [inventory, setInventory] = useState([]);
    const [productId, setproductId] = useState([]);

    const fetchInventory = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.data) {
          console.log(response.data)
          setInventory(response.data);
        } else {
          console.log('No data received from API');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    useEffect(() => {  
      fetchInventory();
    }, []);
    const deleteProduct = async (productId) => {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${productId}`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        fetchInventory();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
    

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProduct reload={fetchInventory} />
      </Modal>
      <Modal isOpen={isSalesModalOpen} onClose={() => setIsSalesModalOpen(false)}>
        <Sales reload={fetchInventory} name={productName} productId={productId}/>
      </Modal>
      <Modal isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)}>
        <Restock reload={fetchInventory} productId={productId} name={productName} />
      </Modal>
      <div className='flex flex-row justify-between items-center'>
        <h1 className="text-2xl font-bold mb-5">Inventory</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center text-white bg-primary p-1 my-3 rounded-lg"
        >
          <IoMdAdd className="text-2xl"/>
        </button>
      </div>
      <div className="overflow-auto max-h-screen">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Sold</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Remaining</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">restock / sales</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.items_sold}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.items_remaining}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex flex-row space-x-10">
                  <button onClick={() => {setProductName(product.name);setproductId(product.id); setIsStockModalOpen(true)}} className=" text-center text-indigo-600 hover:text-indigo-900"><IoIosAddCircleOutline/></button>
                  <button onClick={() => {setProductName(product.name); setproductId(product.id); setIsSalesModalOpen(true)}} className="text-center text-indigo-600 hover:text-indigo-900"><CiEdit/></button>
                  <button onClick={() => deleteProduct(product.id)} className="text-center text-red-600 hover:text-red-900"><MdDeleteOutline/></button>
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