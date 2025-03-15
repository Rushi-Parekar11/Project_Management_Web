import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

function Home() {
  const names = ["Project Documentation","Seamless Collaboration","Increased Productivity","Dynamic Teams"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

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

  const goToYourWork = () => {
    const name = localStorage.getItem('LoggedInUser');
    if (name) {
      navigate(`/${name}/dashboard`);
    } else {
      toast.error("User not logged in properly!");
      navigate('/login');
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % names.length);
        setFade(true); 
      }, 200); 
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
    <div className='bg-[#e9f2fe]  h-400 sm:px-15 '>
    {/* ///Hero area/// */}
    <div className="w-full h-[91vh] border border-2-red flex">
    <div className="h-[91vh] w-full border border-1-blue flex items-start justify-center flex-col">
    <h1 className='sm:text-5xl text-2xl font-bold tracking-tighter ml-40'>Project management tool</h1>
    <h1 className='sm:text-3xl text-2xl font-bold tracking-tighter mt-3 mb-2 ml-40'>tailored for</h1>
    <h1 className={`sm:text-4xl text-[#1868db] ml-40 text-2xl font-bold tracking-tighter transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {names[index]}
    </h1>

    <div className="relative ml-40 mt-10">
  {/* Shadow div */}
  <div className="absolute top-3 left-5 h-19 w-119 bg-[#fca700] rounded z-0"></div>
  {/* Main div */}
  <div className="relative h-18 w-120 border border-black rounded bg-white flex items-center justify-between pr-4 z-10">
    <h1>Name</h1>

{isLogin ?
    <div onClick={goToYourWork} className=" cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500">
  <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500">Try name for Free</span>
  <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm">Try it <FaArrowRightLong /></span>
   </div>
   :
   <Link to='/login' className=" cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500">
  <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500">Try name for Free</span>
  <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm">Try it <FaArrowRightLong /></span>
   </Link>
  }

  </div>
</div>



    </div>
    </div>




    </div>

    </>
  )
}

export default Home
