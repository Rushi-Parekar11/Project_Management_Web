import React from 'react';
import { Facebook, Twitter, Linkedin,ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Guide() {
  const navigate = useNavigate();

  // Function to scroll to the section and center it
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
      <div className="flex h-screen overflow-x-hidden">
        {/* Static Sidebar */}
        <div className="w-[25%] bg-white h-[94vh] fixed left-0 top-[64px] border-3 border-x border-[#e5e7eb] p-6">
      <div className=' w-[170px] ml-[180px]  flex flex-col align-end'>


      <div className="flex items-center gap-2 p-4 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-[90px] transition-all  duration-200"
     onClick={()=>navigate('/')}
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
        <div className="w-[75%] ml-[17%] overflow-y-auto  pl-[160px] pr-[130px] overflow-hidden">
          <div className="w-full flex flex-col mt-9 gap-10">
            
            {/* Section: What is DokJan */}
            <div id="what-is-dokjan">
              <div className='flex gap-3 px-4'>
                <h1 className='text-3xl font-bold'>What is </h1>
                <h1 className='text-3xl font-bold text-[#776aff]'>DokJan</h1>
                <h1 className='text-3xl font-bold'>?</h1>
              </div>
              <p className='ml-4 pr-5 font-semibold mt-3 text-[17px]'>DOKJAN is a centralized project documentation and management platform built for students.
                It allows users to create, store, and manage their project documents across their academic journey.
                Each project generates a shareable link, enabling others to view the complete documentation and download all related assets like images, PDFs, and internal files.
              </p>
              <p className='ml-4 pr-5 font-semibold mt-2 text-[17px]'>DOKJAN also features a Global Showcase, where students can explore and learn from other real project documentations.</p>
              <p className='ml-4 pr-5 font-semibold mt-1 text-[17px]'>This promotes knowledge sharing, inspiration, and better understanding of how successful projects are structured.
                With built-in collaboration tools and mentor tracking, DOKJAN makes academic project management organized, efficient, and future-ready.
                It helps organize and store project files, reports, and progress in one place.
                Students can collaborate, track tasks, and get mentor feedback easily.
                With DOKJAN, managing academic projects becomes efficient, structured, and hassle-free.
              </p>
            </div>

            <hr />

            {/* Section: Getting Started */}
            <div id="getting-started">
              <h1 className='text-3xl font-bold'># Getting Started</h1>
              <p className='ml-4 pr-5 font-semibold mt-3 text-[15px]'>DOKJAN makes it easy to start managing your academic projects within minutes. Here’s how you can get started:</p>
              <h1 className='text-1xl font-bold ml-4 mt-2'>Sign Up / Access</h1>
              <p className='ml-4 pr-5 font-semibold text-[15px]'>
                You can sign up using your Name, Email, and Password to create a personal account.
                Or, try out the platform instantly using the
                <span className="text-[#e19917] font-bold"> "Test User" </span>
                option — no login required!
                This lets you explore the full functionality of DOKJAN without creating an account.
              </p>

              <h1 className='text-1xl font-bold ml-4 mt-3 mb-2'>Dashboard Overview</h1>
              <div className="relative ml-4 w-fit">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[500px] h-auto bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744360482/Screenshot_67_wstmjh.png"
                    className="rounded-sm"
                    alt="dashboard image"
                  />
                </div>
              </div>

              <p className='ml-4 mt-2 pr-5 font-semibold mt-3 text-[15px]'>Once logged in (or as a Test User), you’ll land on the Main Dashboard where you can:
                Create a new project using the "New Project" button.
                View your existing projects and open any of them to continue working.
                If you create or open a project, you’ll be taken to the Project Dashboard.
              </p>

              <h1 className='text-1xl font-bold ml-4 mt-8'>Dashboard Overview</h1>
              <div className="relative ml-4 w-fit">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[500px] h-auto bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744361564/Screenshot_68_bedmpp.png"
                    className="rounded-sm"
                    alt="dashboard image"
                  />
                </div>
              </div>
              <p className='ml-4 mt-4 pr-5 font-semibold mt-3 text-[17px]'>The Project Dashboard is where all the action happens — it's dedicated to a single project.
                Here, you can:
                Build your project documentation with structured sections and file uploads.
                Manage your tasks related to the project and assign them if needed.
                Track task statistics to monitor progress and productivity for your team or yourself.</p>
            </div>

            <hr className='my-4' />

            {/* Section: Documentation Page */}
            <div id="documentation-page">
              <h1 className='text-3xl font-bold'># Documentation Page</h1>
              <p className='ml-4 mt-4 pr-5 font-semibold mt-3 text-[15px]'>The Documentation Page in DOKJAN provides a structured and professional view of your entire project. It generates a unique shareable link that you can send to anyone—mentors, teammates, faculty, or external reviewers. Anyone with the link can easily view all your project details, including descriptions, images, PDFs, and other files in a clean, organized format. This page presents your work systematically and allows users to download all associated assets, making it perfect for project reviews, knowledge sharing, and showcasing your work without requiring login access.</p>
              <div className="relative ml-4 w-fit mt-6">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[300px] h-auto bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744362414/zepto_2_pbr8fu.png"
                    className="rounded-sm"
                    alt="dashboard image"
                  />
                </div>
              </div>
            </div>

            <hr className='my-4' />

            {/* Section: Global Showcase */}
            <div id="global-showcase">
              <h1 className='text-3xl font-bold'># Global Showcase</h1>
              <p className='ml-4 mt-4 pr-5 font-semibold mt-3 text-[15px]'>The Global Showcase in DOKJAN is a curated space where users can explore real project documentations submitted by other students. It allows you to browse through a variety of projects across different domains, helping you gain inspiration, understand different documentation styles, and learn how others structured their work. Each showcased project is publicly available for viewing, and you can read their complete documentation, view images, download files, and refer to their approach. This feature encourages knowledge sharing and helps you build better projects by learning from your peers’ real-world work.</p>
              <div className="relative ml-4 w-fit mt-6">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#e19917] rounded-sm z-0"></div>
                <div className="relative z-10 border-2 border-gray-400 rounded-sm max-w-[410px] h-auto bg-white">
                  <img
                    src="https://res.cloudinary.com/dqw9hj5x6/image/upload/v1744362892/Screenshot_69_r8a56t.png"
                    className="rounded-sm"
                    alt="dashboard image"
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* Footer */}
            <footer className="ml-11 text-gray-900 py-8 px-6 text-center shadow-lg rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-30" />
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-indigo-600">Dokjan</h2>
                <p className="text-gray-600 mt-1">The Ultimate Project Management Solution</p>
                <div className="mt-4 flex gap-6">
                  <a href="#" className="text-gray-700 hover:text-indigo-600 transition-all"><Facebook size={24} /></a>
                  <a href="#" className="text-gray-700 hover:text-blue-500 transition-all"><Twitter size={24} /></a>
                  <a href="#" className="text-gray-700 hover:text-blue-700 transition-all"><Linkedin size={24} /></a>
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
