import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutPanelLeft,
  Star,
  Users,
  LayoutGrid,
  CalendarRange,
  UserRoundPlus, 
  ListFilterPlus, 
  Plus, 
  ArrowLeft, 
  House
} from 'lucide-react';
import YourProject from './YourProject';
import Saved from './Saved';
import Workmates from './Workmates';
import GlobalPortfolio from './GlobalPortfolio';
import Calendar from './Calender';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function DashBoard() {
  const [active, setActive] = useState('Your Project');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Close mobile sidebar when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { name: 'Your Project', icon: LayoutPanelLeft },
    { name: 'Saved', icon: Star },
    { name: 'Workmates', icon: Users },
    { name: 'Calendar', icon: CalendarRange },
    { name: 'Filters', icon: ListFilterPlus }
  ];

  const renderContent = () => {
    switch (active) {
      case 'Your Project':
        return <YourProject />;
      case 'Saved':
        return <Saved />;
      case 'Workmates':
        return <Workmates />;
      case 'Calendar':
        return <Calendar />;
      case 'Filters':
        return <Saved />;
      default:
        return <YourProject />;
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Mobile Sidebar Toggle Button */}
      <button 
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="md:hidden fixed top-20 left-0 z-40 bg-white p-2 border-r border-b border-gray-200 rounded-br-sm"
      >
        <LayoutPanelLeft className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <div className={`${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transform transition-transform duration-200 ease-in-out
          h-[91vh] w-[80%] sm:w-[60%] md:w-[17%] border-r border-[#dddedd] 
          flex flex-col justify-between fixed top-[10vh] left-0 bg-white z-30 md:z-auto`}>

        {/* Sidebar Items */}
        <ul className='list-none pl-4 pr-2 flex flex-col gap-2 pt-2 md:pt-0'>
          {/* Back Button */}
          <li 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 mt-1 pr-2 cursor-pointer transition-all duration-200 hover:bg-[#ebebeb] text-[#333]"
          >
            <House className="h-4 w-4" />
            <span className="text-sm font-medium">Home</span>
          </li>

          {items.map(({ name, icon: Icon }) => (
            <li
              key={name}
              onClick={() => {
                setActive(name);
                setMobileSidebarOpen(false);
              }}
              className={`flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer border-l-4 transition-all duration-200
                ${active === name
                  ? 'bg-[#e2e2e2] border-black text-black'
                  : 'border-transparent hover:bg-[#ebebeb] text-[#333]'
                }`}
            >
              <Icon className='h-4 w-4' />
              <span className="text-sm font-medium">{name}</span>
            </li>
          ))}

          <hr className='mr-4 my-5 border-[#cacaca]' />

          {/* Start New Project Button */}
          <li
            onClick={() => {
              setIsModalOpen(true);
              setMobileSidebarOpen(false);
            }}
            className='flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer border border-[#e2e2e2] text-black hover:bg-[#e2e2e2] transition-all duration-200 mx-2'
          >
            <Plus className='h-5 w-5' />
            <span className="text-sm font-medium">Start New Project</span>
          </li>
        </ul>

        {/* Share Invite Button */}
        <ul className='mb-2 px-3'>
          <li
            onClick={() => {
              console.log("Share the Invite clicked");
              setMobileSidebarOpen(false);
            }}
            className='flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer bg-black text-white transition-all duration-200 hover:bg-[#222]'
          >
            <UserRoundPlus className='h-5 w-5' />
            <span className="text-sm font-medium">Share the Invite</span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className={`w-full md:ml-[17%] min-h-[100vh] p-4 md:p-6 transition-all duration-200`}>
        {/* Overlay for mobile sidebar */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
        {renderContent()}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full md:w-1/2 rounded-lg p-6 relative shadow-lg mx-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 text-2xl hover:text-black"
            >
              &times;
            </button>
            <p className="text-gray-800">This is a modal!</p>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default DashBoard;