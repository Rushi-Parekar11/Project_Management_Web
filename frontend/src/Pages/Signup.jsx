import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
  
  const[SignupInfo,setSignupInfo]=useState({
    name:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();

  const handleSignup= async(e)=>{
    e.preventDefault();
    const {name,email,password} =SignupInfo;
    if(!name || !email || !password){
      toast.error("Please fill in all the fields");
    }
    try {
      const url = "http://localhost:8080/signup";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(SignupInfo)
      })
      const result = await response.json();
      const{success,message,error} = result;
      if(success){
        toast.success(message || "Something went wrong!");
        setTimeout(()=>{
          navigate('/login')
        },1000)

      }else if(error){
        const details = error?.details[0].message
        toast.error(details || "Something went wrong!")
      }else{
        toast.error(message || "signup failed")
      }
      console.log(result)
    } catch (error) {
      toast.error(error || "Something went wrong!")
    }
  }

  const handleChange=(e)=>{
    const {name,value}=e.target
    console.log(name,value)
    const copySignupInfo ={...SignupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an account</h2>

<form onSubmit={handleSignup}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
                name="name" 
                type="text"
                placeholder="Your Name"
                onChange={handleChange}
                 value={SignupInfo.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
                name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange} value={SignupInfo.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
                name="password"
              placeholder="••••••••"
              onChange={handleChange} value={SignupInfo.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300">
            Sign up
          </button>
        </div>
</form>
        <div className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup
