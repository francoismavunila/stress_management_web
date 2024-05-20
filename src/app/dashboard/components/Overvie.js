import React from 'react';
import { IoIosWallet } from 'react-icons/io';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { RiStockLine } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";

function Card({ icon, name, amount, green }) {
  return (
    <div className={`w-2/5 my-4 md:w-44 p-2 md:p-4 m-1 md:m-2 bg-white border-2 rounded-xl ${green? 'border-green-500' : 'border-red-500'}`}>
        <div className="flex items-center">
            {icon}
            <h2 className="ml-2 text-sm md:text-xl">{name}</h2>
        </div>
        <p className="text-sm md:text-lg">{amount}</p>
    </div>
  );
}

function Overview() {
  return (
    <div className='bg-white rounded-lg py-3'>
        <p className='text-primary text-xl px-3'>Overview</p>
        <div className="flex flex-wrap justify-around px-3 py-2">
        <Card icon={<MdOutlineProductionQuantityLimits className="text-2xl text-green-500" />} name="All Products" amount="$1000" green={true} />
        <Card icon={<BiCategory className="text-2xl text-blue-500" />} name="Categories" amount="$2000" green={true} />
        <Card icon={<RiStockLine className="text-2xl text-yellow-500" />} name="In stock" amount="$3000" green={true} />
        <Card icon={<AiOutlineStock className="text-2xl text-red-500" />} name="Out of Stock" amount="$4000" green={false} />
        </div>
    </div>
  );
}

export default Overview;