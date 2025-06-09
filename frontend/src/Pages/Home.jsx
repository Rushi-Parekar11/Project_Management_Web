import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import dashboard from '../assets/dashboard.png';
import logo from "../assets/logo.svg"
import hero from "../assets/hero.png"
import { useInView } from "react-intersection-observer";
import { FolderGit2, ClipboardMinus, Globe, UserRoundPen, Facebook, Twitter, Linkedin } from 'lucide-react';
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
      <div className="bg-[#e6f1fd] pb-10 flex flex-col md:flex-row">
        {/* Hero Section */}
        <div className="md:h-[80vh] md:w-[50%] w-full order-2 md:order-1">
          <div className="flex flex-col justify-center h-full w-full px-4 md:px-0">
            <div className="flex flex-col justify-center">
              <h1 className='text-3xl md:text-5xl font-bold tracking-tighter md:ml-40 mb-2 text-center md:text-left'>
                Project management tool
              </h1>
              <h1 className='text-2xl md:text-3xl font-bold tracking-tighter md:ml-40 mb-2 text-center md:text-left'>
                tailored for
              </h1>
              <h1 className={`text-2xl md:text-4xl font-bold tracking-tighter text-[#776aff] transition-opacity duration-500 ease-in-out md:ml-40 mb-6 text-center md:text-left ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {names[index]}
              </h1>

              {/* Call to action */}
              <div className="relative md:ml-40 flex justify-center md:justify-start">
                {/* Shadow Layer */}
                <div className="absolute top-2 left-2 h-16 w-full max-w-md bg-[#ffa900] rounded z-0 hidden md:block"></div>

                {/* Main CTA */}
                <div className="relative h-16 w-full max-w-md border border-black rounded bg-white flex items-center justify-between pr-4 z-10 px-4">
                  <img src={logo} alt="" className='h-8 w-20' />

                  {isLogin ? (
                    <div
                      onClick={goToYourWork}
                      className="cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500"
                    >
                      <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500 text-[9px] sm:text-base">
                        Try DokJan for Free
                      </span>
                      <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm">
                        Try it <FaArrowRightLong />
                      </span>
                    </div>
                  ) : (
                    <Link to="/signup" className="cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500">
                      <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500 text-[9px] sm:text-base">
                        Try DokJan for Free
                      </span>
                      <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm">
                        Try it <FaArrowRightLong />
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {isLogin ? <p></p> :
                <div className="relative md:ml-40 mt-4 flex justify-center md:justify-start">
                  <div className="relative h-16 w-full max-w-md rounded flex items-center justify-between pr-4 z-10 px-4">
                    <div
                      onClick={() => navigate('/login', { state: { email: 'test@gmail.com', password: '12345678' } })}
                      className="cursor-pointer group relative w-full sm:w-[280px] h-8 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500"
                    >
                      <span className="group-hover:translate-y-[-150%] absolute gap-2 transition-all duration-500 w-full flex justify-center items-center text-xs sm:text-sm">
                        <p>Log in with test user account</p> <FaArrowRightLong className='mt-[3px] sm:mt-[5px]' />
                      </span>
                      <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-xs sm:text-sm">
                        Just Click Login <FaArrowRightLong />
                      </span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="flex px-4 md:px-[90px] justify-center items-center h-auto md:h-[80vh] w-full md:w-[50%] order-1 md:order-2 mt-8 md:mt-0">
          <img src={hero} alt="" className="w-full max-w-md md:max-w-none" />
        </div>
      </div>

      {/* vector image */}
      <div className="flex justify-center items-center h-[30vh] md:h-[40vh] bg-[#e6f1fd]">
        <motion.div
          animate={{ y: [0, -13, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-90 h-48 md:w-70 md:h-60 flex justify-center items-center"
        >
          <img src={dashboard} alt="Floating" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="h-auto py-8 md:h-40 w-full bg-[#e6f1fd] justify-center flex flex-col md:text-3xl text-xl font-medium text-center px-4">
        <h1>Everything you need to keep project Documentation</h1>
        <h1>and projects on track</h1>
        <h4 className='text-sm mt-4 font-base text-[#776aff]'>More than just Project Management</h4>
      </div>

      {/* spread cards */}
  <div className="min-h-[50%] flex flex-col items-center justify-center bg-[#e6f1fd] py-10 ">
  <div
    ref={ref}
    className="relative w-full max-w-7xl flex flex-wrap items-center justify-center gap-6"
  >
    {/* Card 1 */}
    <motion.div
      className="relative w-60 h-60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2 hidden md:block" />
      <div className="w-full h-full flex flex-col justify-start text-[#505258] p-5 bg-white rounded-lg shadow-lg border border-black">
        <FolderGit2 className="h-8 w-8 mb-2" />
        <h1 className="font-bold mb-3">Project Management</h1>
        <p className="text-sm font-normal">
          Build project plans and break down projects by task to better understand the work that needs to be done.
        </p>
      </div>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      className="relative w-60 h-60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2 hidden md:block" />
      <div className="w-full h-full flex flex-col justify-start text-[#505258] p-5 bg-white rounded-lg shadow-lg border border-black">
        <ClipboardMinus className="h-8 w-8 mb-2" />
        <h1 className="font-bold mb-3">Project Documentation</h1>
        <p className="text-sm font-normal">
          Project documentation is essential for ensuring clarity, consistency, and efficiency throughout the project lifecycle.
        </p>
      </div>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      className="relative w-60 h-60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2 hidden md:block" />
      <div className="w-full h-full flex flex-col justify-start text-[#505258] p-5 bg-white rounded-lg shadow-lg border border-black">
        <Globe className="h-8 w-8 mb-2" />
        <h1 className="font-bold mb-3">Global Showcases</h1>
        <p className="text-sm font-normal">
          Global Showcases displays all project documentation in one place, providing a centralized view of various projects.
        </p>
      </div>
    </motion.div>

    {/* Card 4 */}
    <motion.div
      className="relative w-60 h-60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="absolute w-60 h-60 bg-[#ffa900] rounded-lg -z-10 translate-x-2 translate-y-2 hidden md:block" />
      <div className="w-full h-full flex flex-col justify-start text-[#505258] p-5 bg-white rounded-lg shadow-lg border border-black">
        <UserRoundPen className="h-8 w-8 mb-2" />
        <h1 className="font-bold mb-3">Personal Cluster</h1>
        <p className="text-sm font-normal">
          Personal Cluster allows you to group multiple projects together, making it easier to organize and track them.
        </p>
      </div>
    </motion.div>
  </div>
</div>


      <div className="h-[6vh] md:h-[12vh] bg-[#e6f1fd]"></div>

      <div className="relative flex items-center justify-center bg-black text-white h-auto md:h-[32vh] py-10 md:py-0 shadow-lg p-6 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-10 backdrop-blur-lg" />

        <div className="relative z-10 text-center max-w-xl px-4">
          <h1 className="text-2xl md:text-4xl font-bold animate-fade-in-up">
            Streamline Your Projects Efficiently
          </h1>

          <p className="mt-2 text-base md:text-lg animate-fade-in-up delay-200">
            Collaborate, organize, and execute tasks seamlessly with our powerful management tools.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
            {isLogin ? (
              <button className="bg-white text-black hover:bg-[#ffa900]  hover:text-white   font-semibold flex items-center justify-center gap-2 px-6 py-2 rounded-lg" onClick={goToYourWork}>
               Get Started
              </button>
            ) : (
              <button className="bg-white text-black hover:bg-[#ffa900] hover:text-white font-semibold flex items-center justify-center gap-2 px-6 py-2 rounded-lg" onClick={() => navigate('/login')}>
               Get Started
              </button>
            )}
            <button className="bg-white text-black hover:bg-[#ffa900] hover:text-white flex items-center justify-center gap-2 px-6 py-2 rounded-lg" onClick={() => navigate('./guide')}>
             Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="h-[4vh] md:h-[7vh] bg-[#e6f1fd]"></div>

      {/* footer */}
      <footer className="bg-[#e6f1fd] text-gray-900 py-8 px-6 text-center shadow-lg rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-30" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-indigo-600">Dokjan</h2>
          <p className="text-gray-600 mt-1">The Ultimate Project Management Solution</p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-gray-600 text-sm md:text-base">
            <Link to="/guide" className="hover:text-indigo-600 transition-all">About Us</Link>
            <Link to="/guide" className="hover:text-indigo-600 transition-all">Docs</Link>
            <Link to="/legal" className="hover:text-indigo-600 transition-all">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-indigo-600 transition-all">Terms</Link>
            <Link to="/legal" className="hover:text-indigo-600 transition-all">licence</Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">&copy; 2025 Dokjan. All Rights Reserved.</p>
          <a href='https://rushikesh16.vercel.app/' className="text-sm text-gray-500 mt-4">Made By Rushi❤️</a>
        </div>
      </footer>
    </>
  );
}

export default Home;