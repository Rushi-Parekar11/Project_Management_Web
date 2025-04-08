import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { UserRound ,LogOut  } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg"

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

  const goToProfile = () => {
    const name = localStorage.getItem('LoggedInUser');
    if (name) {
      navigate(`profile/${name}`);
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <>
    <div className="w-full h-16 sticky top-0 backdrop-blur-sm z-50 flex px-4 sm:px-10 shadow items-center justify-between ">
      
      {/* Logo */}
      <div className="flex items-center">
        <Link to='/' className='sm:text-3xl text-xl font-bold'>
        <img src={logo} alt="" className='h-14 w-30' />
        </Link>
      </div>

      {/* Navigation links */}
      <div className='hidden sm:flex items-center gap-6 '>
        <Link to="/GlobalPortfolio/projects" className='text-gray-800 hover:text-black hover:border-b-2 border-black'>Global Showcases</Link>
        <Link to="/cluster" className='text-gray-800 hover:text-black hover:border-b-2 border-black'>Cluster</Link>
        <Link to="/signup" className='text-gray-800 hover:text-black hover:border-b-2 border-black'>Products</Link>
        <Link to="/signup" className='text-gray-800 hover:text-black hover:border-b-2 border-black'>Pricing</Link>
      </div>

      {/* Auth + CTA */}
      <div className="flex items-center gap-4 ">
        {isLogin ? (
          <>
            <button onClick={HandleLogout} className="text-sm text-gray-800 hover:text-black flex items-center gap-2">Logout <LogOut className='w-4 h-4'/></button>
            <button onClick={goToProfile} className=' h-8 w-8 text-[12px] font-bold rounded-full bg-[#776aff] text-white items-center flex justify-center hover:bg-gray-900'><h1>RU</h1></button>
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

    </div>
    <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default Navbar;
