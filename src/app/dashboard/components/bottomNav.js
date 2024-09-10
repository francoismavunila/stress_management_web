'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AiFillDatabase, AiOutlineBulb, AiOutlineLogout } from 'react-icons/ai';
import { FaHome } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function BottomNavbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        router.push('/signin');
    };

    return (
        <div className="w-full fixed bottom-0 left-0 z-50 bg-secondarybg text-black font-bold flex justify-between shadow-lg border-t border-slate-300 text-xs py-6 px-4  md:hidden">
            <Link href="/dashboard">
                <div className="flex flex-col items-center">
                    <FaHome className='text-primary mb-1 text-lg' />
                    <span>Home</span>
                </div>
            </Link>

            <Link href="/dashboard/checkin">
                <div className="flex flex-col items-center">
                    <AiFillDatabase className='text-primary mb-1 text-lg' />
                    <span>CheckIn</span>
                </div>
            </Link>

            <Link href="/dashboard/toolsEngagement">
                <div className="flex flex-col items-center">
                    <AiOutlineBulb className='text-primary mb-1 text-lg' />
                    <span>Engagement</span>
                </div>
            </Link>

            <Link href="/dashboard/selfEvaluation">
                <div className="flex flex-col items-center">
                    <AiOutlineBulb className='text-primary mb-1 text-lg' />
                    <span>Test</span>
                </div>
            </Link>

            <div className="flex flex-col items-center cursor-pointer" onClick={handleLogout}>
                <AiOutlineLogout className='text-primary mb-1 text-lg' />
                <span>Logout</span>
            </div>
        </div>
    );
}
