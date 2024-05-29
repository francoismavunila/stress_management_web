'use client'
import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Insight from "./Insight";
import axios from 'axios';

export default function ProductInsights() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [insights, setInsights] = useState();
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('');
  const [error, setError] = useState(null);
  const loaderMessages = ['Gathering data...', 'Demand forecasting...', 'Waiting for the API...', 'Bringing everything together...'];

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  const fetchInsights = async (productId) => {
    setLoading(true);
    setLoaderMessage(loaderMessages[Math.floor(Math.random() * loaderMessages.length)]);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/predict/${productId}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      setInsights({
        product: response.data["product name"],
        priceSuggestion: response.data["Price Suggestion"],
        stockLevel: response.data["Stock Level"],
        stockSuggestion: response.data["Stock Suggestion"],
        moreInsights : response.data["More Insights"]
      });
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message,"reload page");
    }
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    fetchInsights(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="">
        <label htmlFor="product-select">Select a product:</label>
        <select id="product-select" value={selectedProduct} onChange={handleProductChange}>
          <option value="">--Please choose an option--</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>
      <div className="General grid grid-cols-1 md:grid-cols-1 gap-4">
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-lg font-semibold">{loaderMessage}</p>
        </div>
      ) : (
        insights && (
          <div className={`rounded-lg mt-10 md:w-3/4 overflow-hidden shadow-lg border-2 p-6 bg-white ${insights.stockLevel !== 'low' ? 'border-green-500' : 'border-red-500'}`}>
            <h3 className="font-bold text-xl mb-4">{insights.product}</h3>
            <div className="mb-4">
              <h6 className="font-bold">Price Suggestion:</h6>
              <p>{insights.priceSuggestion}</p>
            </div>
            <div className="mb-4">
              <h6 className="font-bold">Stock Level:</h6>
              <p>{insights.stockLevel}</p>
            </div>
            <div className="mb-4">
              <h6 className="font-bold">Stock Suggestion:</h6>
              <p>{insights.stockSuggestion}</p>
            </div>
            <div className="mb-4">
              <h6 className="font-bold">More Insights :</h6>
              <p>{insights.moreInsights}</p>
            </div>
          </div>
        )
      )}
    </div>
    </>

  );
}