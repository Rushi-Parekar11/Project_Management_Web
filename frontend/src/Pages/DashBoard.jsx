import React, { useState } from 'react';
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
} from 'lucide-react';
import YourProject from './YourProject';
import Saved from './Saved';
import Workmates from './Workmates';
import GlobalPortfolio from './GlobalPortfolio';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function DashBoard() {
  const [active, setActive] = useState('Your Project');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
    { name: 'Your Project', icon: LayoutPanelLeft },
    { name: 'Saved', icon: Star },
    { name: 'Workmates', icon: Users },
    { name: 'Global Portfolio', icon: LayoutGrid },
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
      case 'Global Portfolio':
        return <GlobalPortfolio />;
      case 'Calendar':
        return <Saved />;
      case 'Filters':
        return <Saved />;
      default:
        return <YourProject />;
    }
  };

  return (
    <div className='flex'>

      {/* Sidebar */}
      <div className='h-[94vh] w-full md:w-[15%] border-r border-[#dddedd] flex flex-col justify-between fixed top-[6vh] left-0 bg-white z-50'>

      

        {/* Sidebar Items */}
        <ul className='list-none pl-4 pr-2 flex flex-col gap-2 mt-0'>
                {/* Back Button */}

        <div  className="flex items-center gap-2 p-4 cursor-pointer text-[#333] hover:bg-[#ebebeb] transition-all mt-2 duration-200" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back</span>
        </div>


          {items.map(({ name, icon: Icon }) => (
            <li
              key={name}
              onClick={() => setActive(name)}
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
            onClick={() => setIsModalOpen(true)}
            className='flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer border border-[#e2e2e2] text-black hover:bg-[#e2e2e2] transition-all duration-200'
          >
            <Plus className='h-5 w-5' />
            <span className="text-sm font-medium">Start New Project</span>
          </li>
        </ul>

        {/* Share Invite Button */}
        <ul className='mb-2 px-1'>
          <li
            onClick={() => console.log("Share the Invite clicked")}
            className='flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer bg-black text-white transition-all duration-200 hover:bg-[#222]'
          >
            <UserRoundPlus className='h-5 w-5' />
            <span className="text-sm font-medium">Share the Invite</span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className='w-[85%] min-h-[100vh] ml-[15%] p-6'>
        {renderContent()}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg p-6 relative shadow-lg">
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
