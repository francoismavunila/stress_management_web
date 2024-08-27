'use client'
import React, { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log("the api end point is", process.env.NEXT_PUBLIC_API_ENDPOINT)
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      "first_name": firstName,
      "last_name":lastName,
      "email": email,
      "password":password,
      "is_active" : true,
      "is_staff" : false,
  }
  try {

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/signup/`, user);
    console.log(response)
    console.log(response.status)
    if (response.status === 201) {
      toast.success("success, redirecting to dashboard ....");
      localStorage.setItem('stm_user', JSON.stringify(response.data.user));
      localStorage.setItem('stm_token', response.data.access);
      localStorage.setItem('stm_refresh', response.data.refresh);
      console.log("am about to nav")
      router.push('/dashboard');
      console.log("I have navigated")

    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error.response)
    console.log(error.response.data.message)
    toast.error(error.response.data.message?error.response.data.message:'Signup failed. Please try again.')
  }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="images/png/logo-no-background.png" alt="Workflow"/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="first-name" className="sr-only">First Name</label>
              <input id="first-name" name="first-name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">Last Name</label>
              <input id="last-name" name="last-name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">Email</label>
              <input id="email" name="email" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </button>
          </div>
        </form>
        <p className='text-black italic'>Already have an account? <a className='text-lime-500 font-bold' href='/signin'>LogIn</a></p>
      </div>
    </div>
  )
}

export default Signup