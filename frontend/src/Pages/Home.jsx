import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import dashboard from '../assets/dashboard.png';
import logo from "../assets/logo.svg"
import hero from "../assets/hero.png"



import { useInView } from "react-intersection-observer";
import { FolderGit2,ClipboardMinus ,Globe  ,UserRoundPen,Facebook, Twitter, Linkedin  } from 'lucide-react';
import { Rocket, CheckCircle } from "lucide-react";

function Home() {
  const names = ["Project Documentation", "Seamless Collaboration", "Increased Productivity", "Dynamic Teams"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);


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

  const goToYourWork = () => {
    const name = localStorage.getItem('LoggedInUser');
    if (name) {
      navigate(`/${name}/dashboard`);
    } else {
      toast.error("User not logged in properly!");
      navigate('/login');
    }
  };

  const { ref, inView } = useInView({ threshold: 0.3 });
  const [spread, setSpread] = useState(false);

  useEffect(() => {
    setSpread(inView);
  }, [inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % names.length);
        setFade(true);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="bg-[#e6f1fd]  pb-10 flex">
      {/* Hero Section */}
        <div className="h-[80vh] w-[50%]">
        <div className="flex flex-col justify-center h-[80vh] w-full">
      <div className="flex flex-col justify-center">
        <h1 className='sm:text-5xl text-3xl font-bold tracking-tighter sm:ml-40 mb-2'>
          Project management tool
        </h1>
        <h1 className='sm:text-3xl text-2xl font-bold tracking-tighter sm:ml-40 mb-2'>
          tailored for
        </h1>
        <h1 className={`sm:text-4xl text-2xl font-bold tracking-tighter text-[#776aff] transition-opacity duration-500 ease-in-out sm:ml-40 mb-6 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {names[index]}
        </h1>
        {/* Call to action */}
        <div className="relative sm:ml-40">
          {/* Shadow Layer */}
          <div className="absolute top-2 left-2 h-16 w-full max-w-md bg-[#ffa900] rounded z-0"></div>

          {/* Main CTA */}
          <div className="relative h-16 w-full max-w-md border border-black rounded bg-white flex items-center justify-between pr-4 z-10 px-4">
          <img src={logo} alt="" className='h-8 w-20' />

            {isLogin ? (
              <div
                onClick={goToYourWork}
                className="cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500"
              >
                <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500">
                  Try DokJan for Free
                </span>
                <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm">
                  Try it <FaArrowRightLong />
                </span>
              </div>
            ) : ( <Link  to="/login" className="cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500"
              >
                <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500">
                  Try DokJan for Free
                </span>
                <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm">
                  Try it <FaArrowRightLong />
                </span>
              </Link>
            )}
          </div>
        </div>
        </div>

      </div>
        </div>


        <div className="flex px-[90px] justify-center items-center h-[80vh] w-[50%]">
    <img src={hero} alt=""  />
        <div>
  
</div>
</div>
    </div>

  
<div></div>

{/* //// vector image  */}
  <div className="flex justify-center items-center h-[40vh] bg-[#e6f1fd] ">
      <motion.div
        animate={{y: [0, -13, 0],  }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut",}} className="w-70 h-60 flex justify-center items-center" >
        <img src={dashboard}  alt="Floating"    className="w-full h-full object-cover"/>
      </motion.div>
    </div>

<div className="h-40 w-full bg-[#e6f1fd]  justify-center flex text-3xl font-medium flex-col text-center">
  <h1>Everything you need to keep project Documentation </h1>
  <h1>and projects on track</h1>
  <h4 className='text-sm mt-4 font-base text-[#776aff]'>More than just Project Management</h4>
</div>

 {/* ///// spread cards */}
 <div className="h-[40vh] flex flex-col items-center justify-center bg-[#e6f1fd]  pt-10  ">
  <div ref={ref} className="relative w-full h-[600px] flex justify-center">
    {/* Card 1 */}
    <motion.div
      className="absolute w-60 h-60 flex items-center justify-center text-white text-lg font-bold rounded-lg shadow-lg"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={spread ? { x: -510, opacity: 1 } : { x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2"></div>
      <div className="w-90 h-60 flex justify-start flex-col text-[#505258] pl-3 pr-3 pt-5 bg-white rounded-lg shadow-lg border-[1px] border-black ">
      <FolderGit2 className='h-8 w-8'/>
      <h1 className='font-bolder mb-3'>Project Management</h1>
      <h2 className='text-sm font-normal'>Build project plans and break down projects by task to better understand the work that needs to be done.</h2>
      </div>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      className="absolute w-60 h-60 flex items-center justify-center text-white text-lg font-bold rounded-lg shadow-lg"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={spread ? { x: -180, opacity: 1 } : { x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2"></div>
      <div className="w-90 h-60 flex justify-start flex-col text-[#505258] pl-3 pr-3 pt-5 bg-white rounded-lg shadow-lg border-[1px] border-black ">
      <ClipboardMinus  className='h-8 w-8'/>
      <h1 className='font-bolder mb-3'>Project Documentation</h1>
      <h2 className='text-sm font-normal'>Project documentation is essential for ensuring clarity, consistency, and efficiency throughout the project lifecycle. by task to better understand the work that needs to be done.</h2>
      </div>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      className="absolute w-60 h-60 flex items-center justify-center text-white text-lg font-bold rounded-lg shadow-lg"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={spread ? { x: 147, opacity: 1 } : { x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
    <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2"></div>
      <div className="w-90 h-60 flex justify-start flex-col text-[#505258] pl-3 pr-3 pt-5 bg-white rounded-lg shadow-lg border-[1px] border-black ">
      <Globe   className='h-8 w-8'/>
      <h1 className='font-bolder mb-3'>Global Showcases</h1>
      <h2 className='text-sm font-normal'>Global Showcases displays all project documentation in one place, providing a centralized view of various projects. It helps teams access, review, and manage projec knowledge sharing.</h2>
      </div>
    </motion.div>

    {/* Card 4 */}
    <motion.div
      className="absolute w-60 h-60 flex items-center justify-center text-white text-lg font-bold rounded-lg shadow-lg"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={spread ? { x: 470, opacity: 1 } : { x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2"></div>
      <div className="w-90 h-60 flex justify-start flex-col text-[#505258] pl-3 pr-3 pt-5 bg-white rounded-lg shadow-lg border-[1px] border-black ">
      <UserRoundPen  className='h-8 w-8'/>
      <h1 className='font-bolder mb-3'>Personal Cluster</h1>
      <h2 className='text-sm font-normal'> Personal Cluster allows you to group multiple projects together, making it easier to organize and track them simultaneously.</h2>
      </div>
    </motion.div>
  </div>
</div>


<div className="h-[12vh] bg-[#e6f1fd]"></div>

<div className="relative flex items-center justify-center  bg-gradient-to-r from-indigo-500  to-purple-600 text-white h-[30vh]  shadow-lg p-6 overflow-hidden">
      <div className="absolute inset-0 bg-opacity-10 backdrop-blur-lg" />
      
      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-4xl font-bold animate-fade-in-up">
          Streamline Your Projects Efficiently
        </h1>
        
        <p className="mt-2 text-lg animate-fade-in-up delay-200">
          Collaborate, organize, and execute tasks seamlessly with our powerful management tools.
        </p>
        
        <div className="mt-4 flex justify-center gap-4 animate-fade-in-up delay-400">
          <button className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold flex items-center gap-2 px-6 py-2 rounded-lg">
            <Rocket size={18} /> Get Started
          </button>
          <button className="bg-indigo-700 hover:bg-indigo-800 font-semibold flex items-center gap-2 px-6 py-2 rounded-lg">
            <CheckCircle size={18} /> Learn More
          </button>
        </div>
      </div>
    </div>

    <div className="h-[7vh] bg-[#e6f1fd]"></div>


    {/* ///// footer */}
    <footer className=" bg-[#e6f1fd] text-gray-900 py-8 px-6 text-center shadow-lg rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-30" />
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-indigo-600">Dokjan</h2>
          <p className="text-gray-600 mt-1">The Ultimate Project Management Solution</p>
          
          <div className="mt-4 flex gap-6">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-all"><Facebook size={24} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-500 transition-all"><Twitter size={24} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-700 transition-all"><Linkedin size={24} /></a>
          </div>
          
          <div className="mt-6 flex gap-6 text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-all">About Us</a>
            <a href="#" className="hover:text-indigo-600 transition-all">Features</a>
            <a href="#" className="hover:text-indigo-600 transition-all">Pricing</a>
            <a href="#" className="hover:text-indigo-600 transition-all">Blog</a>
            <a href="#" className="hover:text-indigo-600 transition-all">Support</a>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">&copy; 2025 Dokjan. All Rights Reserved.</p>
        </div>
      </footer>



  </>

  );
}

export default Home;
