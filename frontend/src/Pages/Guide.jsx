import React from 'react';
import { Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Guide() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
        {/* Static Sidebar */}
        <div className="hidden md:block w-[25%] bg-white h-[94vh] fixed left-0 top-[64px] border-x border-[#e5e7eb] p-6">
          <div className="w-[170px] ml-[180px] flex flex-col align-end">
            <div
              className="flex items-center gap-2 p-4 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-[90px] transition-all duration-200"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </div>

            <h2 className="text-xl font-bold mb-6">Quick Navigation</h2>
            <ul className="flex flex-col gap-6 justify-end text-[16px] font-medium text-gray-800">
              <li><button onClick={() => scrollToSection('what-is-dokjan')} className="text-left hover:text-[#776aff]">What is DokJan?</button></li>
              <li><button onClick={() => scrollToSection('getting-started')} className="text-left hover:text-[#776aff]">Getting Started</button></li>
              <li><button onClick={() => scrollToSection('documentation-page')} className="text-left hover:text-[#776aff]">Documentation Page</button></li>
              <li><button onClick={() => scrollToSection('global-showcase')} className="text-left hover:text-[#776aff]">Global Showcase</button></li>
            </ul>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="w-full md:w-[75%] ml-0 md:ml-[25%] overflow-y-auto pl-5 pr-5 md:pl-[160px] md:pr-[130px] pt-6">
          <div className="flex flex-col gap-10">

            {/* Section: What is DokJan */}
            <div id="what-is-dokjan">
              <div className='flex gap-3 px-4 flex-wrap'>
                <h1 className='text-3xl font-bold'>What is</h1>
                <h1 className='text-3xl font-bold text-[#776aff]'>DokJan</h1>
                <h1 className='text-3xl font-bold'>?</h1>
              </div>
              <p className='ml-4 pr-5 font-semibold mt-3 text-[17px]'>
                DOKJAN is a centralized project documentation and management platform built for students.
                It allows users to create, store, and manage their project documents across their academic journey.
                Each project generates a shareable link, enabling others to view the complete documentation and download all related assets like images, PDFs, and internal files.
              </p>
              <p className='ml-4 pr-5 font-semibold mt-2 text-[17px]'>
                DOKJAN also features a Global Showcase, where students can explore and learn from other real project documentations.
              </p>
              <p className='ml-4 pr-5 font-semibold mt-1 text-[17px]'>
                This promotes knowledge sharing, inspiration, and better understanding of how successful projects are structured.
                With built-in collaboration tools and mentor tracking, DOKJAN makes academic project management organized, efficient, and future-ready.
              </p>
            </div>

            <hr />

            {/* Section: Getting Started */}
            <div id="getting-started">
              <h1 className='text-3xl font-bold'># Getting Started</h1>
              <p className='ml-4 pr-5 font-semibold mt-3 text-[15px]'>
                DOKJAN makes it easy to start managing your academic projects within minutes. Here’s how you can get started:
              </p>

              <h2 className='text-xl font-bold ml-4 mt-2'>Sign Up / Access</h2>
              <p className='ml-4 pr-5 font-semibold text-[15px]'>
                You can sign up using your Name, Email, and Password to create a personal account.
                Or, try out the platform instantly using the
                <span className="text-[#e19917] font-bold"> "Test User" </span>
                option — no login required!
              </p>

              <h2 className='text-xl font-bold ml-4 mt-3 mb-2'>Dashboard Overview</h2>
              <div className="relative ml-4 w-fit">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[100%] md:max-w-[500px] bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744638479/Screenshot_67_xc3gwk.png"
                    className="rounded-sm w-full"
                    alt="dashboard"
                  />
                </div>
              </div>

              <p className='ml-4 mt-2 pr-5 font-semibold text-[15px]'>
                Once logged in (or as a Test User), you’ll land on the Main Dashboard where you can:
                Create a new project, view existing projects, and open any of them to continue working.
              </p>

              <h2 className='text-xl font-bold ml-4 mt-8'>Project Dashboard</h2>
              <div className="relative ml-4 w-fit">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[100%] md:max-w-[500px] bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744638814/Screenshot_68_k4ed8k.png"
                    className="rounded-sm w-full"
                    alt="project dashboard"
                  />
                </div>
              </div>
              <p className='ml-4 mt-4 pr-5 font-semibold text-[17px]'>
                The Project Dashboard is where all the action happens — build docs, manage tasks, and track progress here.
              </p>
            </div>

            <hr className='my-4' />

            {/* Section: Documentation Page */}
            <div id="documentation-page">
              <h1 className='text-3xl font-bold'># Documentation Page</h1>
              <p className='ml-4 mt-4 pr-5 font-semibold text-[15px]'>
                The Documentation Page generates a unique shareable link where mentors, faculty, and others can view all your project details in a structured format.
              </p>
              <div className="relative ml-4 w-fit mt-6">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[100%] md:max-w-[300px] bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744638938/zepto_3_xxctct.png"
                    className="rounded-sm w-full"
                    alt="documentation"
                  />
                </div>
              </div>
            </div>

            <hr className='my-4' />

            {/* Section: Global Showcase */}
            <div id="global-showcase">
              <h1 className='text-3xl font-bold'># Global Showcase</h1>
              <p className='ml-4 mt-4 pr-5 font-semibold text-[15px]'>
                The Global Showcase allows you to browse real-world student projects for ideas and reference. View docs, download assets, and learn from others.
              </p>
              <div className="relative ml-4 w-fit mt-6">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[100%] md:max-w-[410px] bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744638479/Screenshot_67_xc3gwk.png"
                    className="rounded-sm w-full"
                    alt="global showcase"
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* Footer */}
            <footer className="text-gray-900 py-8 px-6 text-center shadow-lg rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-30" />
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-indigo-600">Dokjan</h2>
                <p className="text-gray-600 mt-1">The Ultimate Project Management Solution</p>
                <div className="mt-4 flex gap-6">
                  <a href="#" className="text-gray-700 hover:text-indigo-600"><Facebook size={24} /></a>
                  <a href="#" className="text-gray-700 hover:text-blue-500"><Twitter size={24} /></a>
                  <a href="#" className="text-gray-700 hover:text-blue-700"><Linkedin size={24} /></a>
                </div>
                <p className="text-sm text-gray-500 mt-4">&copy; 2025 Dokjan. All Rights Reserved.</p>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}

export default Guide;
