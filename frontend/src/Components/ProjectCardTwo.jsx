import React from 'react'
import { Ellipsis, Calendar1, ExternalLink, LockOpen, ClockAlert, UserPen, UserRound, Copy, Star } from 'lucide-react';
import ProgressBar from './ProgressBar';

function ProjectCardTwo({ project }) {

  const getTimeAgo = (dateString) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
      const isToday =
      updatedDate.getDate() === now.getDate() &&
      updatedDate.getMonth() === now.getMonth() &&
      updatedDate.getFullYear() === now.getFullYear();
    if (isToday) return "Today";
    const diffInMs = now - updatedDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };
  

  return (
    <>
      <div className='h-[410px] w-[380px] rounded-md shadow-md border-2 border-gray-200'>
        <div className="pt-4 pl-4 flex items-center justify-between pr-3">
          <div className="h-11 w-11 bg-[#776aff] font-bold text-white rounded-lg flex justify-center items-center">
            {project.projectname.slice(0, 2).toUpperCase()}
          </div>
          <Ellipsis className="text-gray-500" />
        </div>

        <div className="pl-4">
          <h1 className='text-lg font-bold text-[#2f3035] mt-2'>{project.projectname}</h1>
        </div>
        <div className="pl-4">
          <h1 className='text-sm font-medium text-gray-700 mb-2'>{project.type}</h1>
        </div>

        <div className="px-4 text-[#2f3035] flex gap-2 my-3">
          <UserPen className='h-4 w-4' />
          <h1 className='text-sm font-medium'>{project.createdby.email}</h1>
        </div>

        <div className="px-4">
          <h1 className='text-sm text-gray-600'>{project.discription.slice(0, 75)}...</h1>
        </div>

        <hr className='w-[94%] my-3 ml-2 text-gray-300 mt-8' />

        <div className="px-4 mt-2 text-gray-600 flex gap-5">
          <div className="flex gap-4">
            {/* Copy Icon with tooltip */}
            <div className="relative group">
              <Copy className="h-5 w-5 cursor-pointer" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                Copy
              </span>
            </div>

            {/* External Link Icon with tooltip */}
            <div className="relative group">
              <ExternalLink className="h-5 w-5 cursor-pointer" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                External Link
              </span>
            </div>

            {/* Lock Open Icon with tooltip */}
            <div className="relative group">
              <LockOpen className="h-5 w-5 cursor-pointer" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                Unlock
              </span>
            </div>
          </div>

          <div className="relative group">
            <Star className="h-5 w-5 cursor-pointer" />
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
              Save
            </span>
          </div>

          <div className='flex gap-1 justify-center items-center ml-19'>
            <Calendar1 className='h-5 w-5' />
            <h5 className='text-sm font-medium'>{new Date(project.updatedAt).toLocaleDateString('en-GB')}</h5>
          </div>
        </div>


        <div className='px-4 mt-10 flex justify-between'>
          <div className='h-8 w-[120px] bg-[#e7e7e7] flex items-center justify-center text-sm text-gray-700'>
            <ClockAlert className='h-4 w-4' />
            <h3 className='flex ml-1'>{getTimeAgo(project.updatedAt)}</h3>
          </div>

          <div className="flex items-center space-x-[-12px]">
            <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-30 border-2 border-white">
              <UserRound className='h-4 w-4' />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-20 border-2 border-white">
              <UserRound className='h-4 w-4' />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-10">
              <UserRound className='h-4 w-4' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectCardTwo;
