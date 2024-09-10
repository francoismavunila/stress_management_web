'use client'
import { useState, useEffect } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import Image from 'next/image';

export default function TopNav() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('stm_user');
      
        try {
          if (storedUser) {
            const userObject = JSON.parse(storedUser);
            setUsername(userObject.first_name + ' ' + userObject.last_name);
            setEmail(userObject.email);
          }
        } catch (error) {
          console.error('Error parsing JSON from localStorage:', error);
        }
      }, []);

    return (
        <div className="w-full h-16 bg-secondarybg text-black font-bold flex justify-between items-center px-4 shadow-md fixed top-0 left-0 z-50">
            {/* Logo on the left */}
            <div className="flex items-center">
                <Image
                    className='rounded-full border-2 border-slate-500'
                    src="/images/png/logo-color.png" // Replace with your logo path
                    alt="Logo"
                    width={40}
                    height={40}
                />
            </div>
            
            {/* Username in the center */}
            <div className="text-sm md:text-base text-center">
                {username ? username : 'Guest'}
            </div>

            {/* Notifications icon on the right */}
            <div className="flex items-center">
                <AiOutlineBell className="text-xl text-primary cursor-pointer" />
            </div>
        </div>
    );
}
