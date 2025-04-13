import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { UserRound, LogOut, Menu, X } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setusername] = useState("RU");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setusername(localStorage.getItem('LoggedInUser'));
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
      <div className="w-full h-16 sticky top-0 backdrop-blur-sm z-50 px-4 sm:px-10 shadow flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to='/' className='text-xl font-bold'>
            <img src={logo} alt="Logo" className='h-14 w-auto' />
          </Link>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav Links */}
        <div className={`flex flex-col  sm:flex-row gap-4 sm:gap-6 items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent px-6 sm:px-0 py-4 sm:py-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden sm:flex'} shadow sm:shadow-none z-40`}>
          <Link to="/GlobalPortfolio/projects" className='text-gray-800 hover:text-black hover:border-b-2 border-black'>Global Showcases</Link>
          <Link to="/guide" className='text-gray-800 hover:text-black hover:border-b-2 border-black'>Guide</Link>
          <Link to="/cluster" className='text-gray-800 hover:text-black hover:border-b-2 border-black'>Cluster</Link>
          <Link to="/legal" className='text-gray-800 hover:text-black hover:border-b-2 border-black sm:mr-[300px]'>Legal</Link>

          {isLogin ? (
            <>
              <button onClick={HandleLogout} className="text-sm text-gray-800 hover:text-black flex items-center gap-2">Logout <LogOut className='w-4 h-4' /></button>
              <button onClick={goToProfile} className='h-8 w-8 text-[12px] font-bold rounded-full bg-[#776aff] text-white flex justify-center items-center hover:bg-gray-900'>
                {username?.substring(0, 2).toUpperCase() || "NA"}
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className='text-sm text-gray-800 hover:text-black'>Signup</Link>
              <Link to="/login" className='text-sm text-gray-800 hover:text-black'>Log In</Link>
              <Link to="/login" className='px-4 py-2 rounded bg-black text-white text-sm hover:bg-gray-900 transition-all'>
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
