'use client'
import Sidebar from "./components/Sidebar"
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <div className="flex">
            {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
            <div className="flex flex-col w-full">
                <nav className="bg-white text-black px-10 py-2 flex flex-col md:flex-row justify-between md:flex-row-reverse">
                    <div className="flex items-center gap-5">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                        <IoIosMenu className="text-3xl text-gray-600" />
                    </button>
                    <div className="relative">
                        <input className="border-2 border-gray-300 bg-white h-10 px-2 pr-8 rounded-full text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search" />
                        <IoIosSearch className="absolute top-0 right-0 text-2xl text-gray-300 m-2" />
                    </div>
                     <IoIosNotificationsOutline className="text-2xl text-headercolor" />
                    </div>
                    <p className="text-3xl text-gray-600 font-bold text-xl md:text-2xl">Welcome Mamoyo !!</p>
                </nav>
                <main className="px-10 py-2 bg-mainbg text-black flex-grow">
                    hsjghjgjhag
                    {children}
                </main>
            </div>
        </div>
    );
}