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

    checkLogin(); // initial check

    // Listen for login/logout updates
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
    window.dispatchEvent(new Event("logout")); // notify components
    navigate('/');
  };

  const goToYourWork = () => {
    const name = localStorage.getItem('LoggedInUser');
    if (name) {
      navigate(`/${name}/yourwork`);
    } else {
      toast.error("User not logged in properly!");
      navigate('/login');
    }
  };

  return (
    <div className="w-full h-15 sticky top-0 backdrop-blur-xs z-50 flex sm:px-15 px-2 shadow">
      <div className="w-[50%] h-15 flex items-center">
        <Link to='/' className='sm:text-4xl text-2xl font-bold'>name</Link>
      </div>

      <div className="w-[50%] h-15 flex items-center justify-end space-x-4">
        {isLogin ? (
          <button onClick={HandleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/signup" className='hidden sm:flex w-20 h-10 text-gray-800 items-center justify-center pb-1'>Signup</Link>
            <Link to="/login" className='hidden sm:flex w-20 h-10 text-gray-800 items-center justify-center pb-1'>Log In</Link>
          </>
        )}

        {isLogin ? (
          <button
            onClick={goToYourWork}
            className='border w-25 h-8 sm:w-34 sm:h-10 rounded-sm bg-black text-white flex items-center justify-center pb-1'
          >
            Get Started 
          </button>
        ) : (
          <Link
            to="/login"
            className='border w-25 h-8 sm:w-34 sm:h-10 rounded-sm bg-black text-white flex items-center justify-center pb-1'
          >
            Get Started 
          </Link>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Navbar;
