import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";


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
    <div className="bg-[#e9f2fe] min-h-screen sm:px-15 px-4 py-10 flex">
      {/* Hero Section */}
        <div className="border-2  border-black h-[100vh] w-[50%]">
        <div className="flex flex-col justify-center h-[91vh] w-full mx-auto border-2 border-black">
      <div className="flex flex-col justify-center border-2 border-black ">
        <h1 className='sm:text-5xl text-3xl font-bold tracking-tighter sm:ml-40 mb-2'>
          Project management tool
        </h1>
        <h1 className='sm:text-3xl text-2xl font-bold tracking-tighter sm:ml-40 mb-2'>
          tailored for
        </h1>
        <h1 className={`sm:text-4xl text-2xl font-bold tracking-tighter text-[#1868db] transition-opacity duration-500 ease-in-out sm:ml-40 mb-6 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {names[index]}
        </h1>
        {/* Call to action */}
        <div className="relative sm:ml-40">
          {/* Shadow Layer */}
          <div className="absolute top-2 left-2 h-16 w-full max-w-md bg-[#fca700] rounded z-0"></div>

          {/* Main CTA */}
          <div className="relative h-16 w-full max-w-md border border-black rounded bg-white flex items-center justify-between pr-4 z-10 px-4">
            <h1 className="font-medium">Name</h1>

            {isLogin ? (
              <div
                onClick={goToYourWork}
                className="cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500"
              >
                <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500">
                  Try name for Free
                </span>
                <span className="flex items-center gap-1 opacity-0 translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-sm">
                  Try it <FaArrowRightLong />
                </span>
              </div>
            ) : ( <Link  to="/login" className="cursor-pointer group relative border w-28 h-8 sm:w-40 sm:h-10 rounded-3xl bg-black text-white flex items-center justify-center z-10 overflow-hidden transition-all duration-500"
              >
                <span className="group-hover:translate-y-[-150%] absolute transition-all duration-500">
                  Try name for Free
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


        <div className="flex justify-center items-center border-2 border-black h-[100vh] w-[50%]">
        {/* ////// all content here ???? */}
        <div>
  
</div>

</div>

    </div>
  );
}

export default Home;
