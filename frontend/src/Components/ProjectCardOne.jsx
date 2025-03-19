import React from 'react';
import { Ellipsis } from 'lucide-react';
import { Calendar1, ExternalLink, LockOpen, ClockAlert, UserRound } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';


function ProjectCardOne({ project }) {
  const { projectname, discription, createdAt, users, progress } = project;
  const navigate = useNavigate();

  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate - createdDate;
  const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
  const timeAgo = daysAgo === 0 ? 'Today' : `${daysAgo} days ago`;



  return (
    <div className="h-[305px] w-[300px] rounded-md shadow-md border-2 border-[#dddedd] cursor-pointer" onClick={() => navigate(`/project/${projectname}`)}  >
      <div className="pt-4 pl-4 flex items-center justify-between pr-3">
        <div className="h-11 w-11 bg-[#776aff] font-bold text-white rounded-lg flex justify-center items-center">
          {projectname ? projectname.substring(0, 2).toUpperCase() : 'NA'}
        </div>
        <Ellipsis className="text-gray-500" />
      </div>
      <div className="pl-4">
        <h1 className="text-lg font-bold text-[#2f3035] mt-2">{projectname}</h1>
      </div>

      <div className="pl-4">
        <h1 className="text-sm font-medium text-gray-700 mb-2">{project.type}</h1>
      </div>

      <div className="px-4">
        <h1 className="text-sm text-gray-600">{discription.slice(0, 65)}...</h1>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <ProgressBar percentage={progress || 85} />
      </div>

      {/* Time and Users Info */}
      <div className="px-4 mt-10 flex justify-between">
        <div className="h-8 w-[90px] bg-[#e7e7e7] flex items-center justify-center text-xs text-gray-700 gap-1">
          <ClockAlert className="h-4 w-4" />
          <h3 className="flex">{timeAgo}</h3>
        </div>

        {/* Users Avatars */}
        <div className="flex items-center space-x-[-12px]">
  <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-30 border-2 border-white"><UserRound className='h-4 w-4'/></div>
  <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-20 border-2 border-white"><UserRound className='h-4 w-4'/></div>
  <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-10"><UserRound className='h-4 w-4'/></div>
</div>
      </div>
    </div>
  );
}

export default ProjectCardOne;
