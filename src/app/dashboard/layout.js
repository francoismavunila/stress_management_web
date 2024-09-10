'use client'
import Sidebar from "./components/Sidebar"
import BottomNavbar from "./components/bottomNav"
import TopNav from "./components/topNav"
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <div className="flex" >
            {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
            <div className="flex flex-col w-full">
                <nav className="z-40 text-black px-5 py-2 fixed bg-mainbg w-full flex justify-between md:px-10 md:pl-64 md:left-0 " >
                    {/* <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                        <IoIosMenu className="text-3xl text-gray-600" />
                    </button> */}
                    <TopNav/>
                    <p className="text-white text-primary font-bold md:text-2xl"></p>
                    <div className="flex items-center gap-5">
                    <div className="relative hidden md:block">

                        <input className="border-2 border-gray-300 bg-white h-10 px-2 pr-8 rounded-full text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search" />
                        <IoIosSearch className="absolute top-0 right-0 text-2xl text-gray-300 m-2" />
                    </div>
                     <IoIosNotificationsOutline className="text-2xl text-white" />
                    </div>
                </nav>
                <main className="h-screen px-0 py-0 pt-16 bg-mainbg text-black flex-grow md:px-0 overflow-auto">
                    {children}
                    <BottomNavbar/>
                </main>
            </div>
        </div>
    );
}