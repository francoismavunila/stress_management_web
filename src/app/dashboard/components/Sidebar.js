'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {  AiFillDatabase,  AiOutlineBulb, AiOutlineLogout } from 'react-icons/ai';
import { FaHome } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';


export default function Sidebar({onClose}) {
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        console.log("user", storedUsername)
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        router.push('/signin');
      };
    
    return (
        <div className="h-screen w-3/5 z-50 bg-secondarybg text-white flex flex-col md:justify-between text-sm fixed md:w-64 md:static ">          
            <button onClick={onClose} className="self-end p-4 md:hidden">
                <AiOutlineClose className="text-2xl" />
            </button> 
            <div className="p-4 ">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-20 rounded-full mb-4" src="/images/png/logo-color.png" alt="Profile" />
                    <h2 className="text-sm font-semibold">{username}</h2>
                </div>
                <ul className='flex flex-col pl-8'>
                    <li className="mb-4 py-2">
                        <Link href="/dashboard">
                            <div className="flex items-center"><FaHome className='mr-2 text-primary'/> HomaPage</div>
                        </Link>
                    </li>
                    <li className="mb-4 py-2">
                        <Link href="/dashboard/checkin">
                            <div className="flex items-center"><AiFillDatabase className='mr-2 text-primary' /> Daily CheckIn</div>
                        </Link>
                    </li>
                    <li className="mb-4 py-2">
                        <Link href="/dashboard/toolsEngagement">
                            <div className="flex items-center"><AiOutlineBulb className='mr-2 text-primary' /> Tools Engagement</div>
                        </Link>
                    </li>
                    <li className="mb-4 py-2">
                        <Link href="/dashboard/selfEvaluation">
                            <div className="flex items-center"><AiOutlineBulb className='mr-2 text-primary' /> self Assessment</div>
                        </Link>
                    </li>

                </ul>
            </div>
            <div className="pl-14 pb-5">
                <div className="flex items-center text-slate-400 cursor-pointer" onClick={handleLogout}><AiOutlineLogout className='mr-2' /> Logout</div>
            </div>
        </div>
    );
}