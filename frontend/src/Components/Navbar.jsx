import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
    };

    checkLogin();

    window.addEventListener("login", checkLogin);
    window.addEventListener("logout", checkLogin);

    return () => {
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("logout", checkLogin);
    };
  }, []);

  const HandleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInUser');
    window.dispatchEvent(new Event("logout"));
    navigate('/');
  };

  const goToYourWork = () => {
    const name = localStorage.getItem('LoggedInUser');
    if (name) {
      navigate(`/${name}/dashboard`);
    } else {
      toast.error("User not logged in properly!");
      navigate('/login');
    }
  };

  return (
    <div className="w-full h-16 sticky top-0 backdrop-blur-sm z-50 flex px-4 sm:px-10 shadow items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center">
        <Link to='/' className='sm:text-3xl text-xl font-bold'>name</Link>
      </div>

      {/* Navigation links */}
      <div className='hidden sm:flex items-center gap-6'>
        <Link to="/signup" className='text-gray-800 hover:text-black'>All Projects</Link>
        <Link to="/signup" className='text-gray-800 hover:text-black'>Docs</Link>
        <Link to="/signup" className='text-gray-800 hover:text-black'>Products</Link>
        <Link to="/signup" className='text-gray-800 hover:text-black'>Pricing</Link>
      </div>

      {/* Auth + CTA */}
      <div className="flex items-center gap-4">
        {isLogin ? (
          <>
            <button onClick={HandleLogout} className="text-sm text-gray-800 hover:text-black">Logout</button>
            <button
              onClick={goToYourWork}
              className='px-4 py-2 sm:px-5 sm:py-2.5 rounded bg-black text-white text-sm hover:bg-gray-900 transition-all'
            >
              Get Started
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className='hidden sm:inline text-sm text-gray-800 hover:text-black'>Signup</Link>
            <Link to="/login" className='hidden sm:inline text-sm text-gray-800 hover:text-black'>Log In</Link>
            <Link
              to="/login"
              className='px-4 py-2 sm:px-5 sm:py-2.5 rounded bg-black text-white text-sm hover:bg-gray-900 transition-all'
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Navbar;
