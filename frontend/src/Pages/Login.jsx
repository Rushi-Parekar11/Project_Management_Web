import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const Handlechange = (e) => {
    const { name, value } = e.target;
    setloginInfo(prev => ({ ...prev, [name]: value }));
  }

  const HandelLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        toast.success("Login successful!", {
          autoClose: 1500, // closes after 1.5 seconds
        });
        
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('LoggedInUser', name);
      
        // Notify other components that login status changed
        window.dispatchEvent(new Event("login"));
      
        setTimeout(() => {
          navigate(`/${name}/dashboard`);
        }, 1000);
      }
       else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details || "Something went wrong!");
      } else {
        toast.error(message || "Login failed");
      }

    } catch (err) {
      toast.error("Network error. Try again.");
    }
  }

  return (
    <>
      <form className="login-form" onSubmit={HandelLogin}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Login to your account</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={Handlechange} name='email' value={loginInfo.email}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={Handlechange} name='password' value={loginInfo.password}
                />
              </div>

              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300">
                Login
              </button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-500">
              <a href="#" className="hover:underline">Forgot your password?</a>
            </div>

            <div className="text-center mt-2 text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>


          </div>

        </div>
      </form>

      {/* Toasts display here */}
    </>
  )
}

export default Login;
