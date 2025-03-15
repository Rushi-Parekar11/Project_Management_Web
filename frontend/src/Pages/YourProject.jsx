import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import ProjectCardOne from '../Components/ProjectCardOne';
import ProjectForm from '../Components/ProjectForm';

function YourProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Optional: get username from localStorage if needed
  const username = localStorage.getItem("username") || "test";

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='min-h-[100vh] w-350 pl-10 pt-10'>
      <h1 className='text-3xl font-bold'>Your project</h1>
      <hr className="w-[95%] mt-10 mb-4 border border-[#c4c4c4]" />

      <div className='h-13 w-300'>
        <div className="relative w-[70%]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search Project"
            className="w-full pl-10 pr-4 py-2 border-2 border-[#c4c4c4] rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <h1 className='text-lg font-bold text-[#292a2e] mt-6'>Latest Projects</h1>

      <div className="mt-5 h-82 flex gap-7">
        <ProjectCardOne />
        <ProjectCardOne />
        <ProjectCardOne />
      </div>

      <hr className="w-[95%] mt-10 mb-4 border border-[#cacaca]" />

      <div className="h-[130px] w-[100%] flex justify-center">
        <div className="h-[120px] w-[48%] flex justify-center items-center">
          <li
            onClick={() => setIsModalOpen(true)}
            className='flex justify-center items-center gap-2 w-full h-[80px] rounded-sm cursor-pointer hover:bg-black hover:text-white border-2 border-[#c4c4c4] text-xl text-[#444444]'
          >
            <Plus className='h-5 w-5' /> Start New Project
          </li>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProjectForm onClose={handleClose} username={username} />
      )}
    </div>
  );
}

export default YourProject;
