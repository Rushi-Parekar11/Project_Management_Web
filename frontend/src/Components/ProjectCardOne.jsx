import React from 'react';
import { Ellipsis } from 'lucide-react';
import { ClockAlert, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SkProjectCardOne({ project }) {
  const { projectname, discription, createdAt, users, progress } = project;
  const navigate = useNavigate();

  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate - createdDate;
  const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
  const timeAgo = daysAgo === 0 ? 'Today' : `${daysAgo} days ago`;

  const totaltask = project.tasks?.length || 0;

  const statusCount = project.tasks?.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {}) || {};
  
  const complettask = statusCount.Complete || 0;
  let percentage = Math.round((complettask / totaltask) * 100);  
  percentage = isNaN(percentage) ? 0 : percentage;

  return (
    <div 
      className="h-[240px] sm:h-[260px] md:h-[280px] w-full sm:w-[calc(50%-0.5rem)] md:w-[300px] rounded-md shadow-md border-2 border-[#dddedd] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/project/${projectname}`)}
    >
      <div className="pt-3 sm:pt-4 pl-3 sm:pl-4 flex items-center justify-between pr-2 sm:pr-3">
        <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 bg-[#776aff] font-bold text-white rounded-lg flex justify-center items-center text-sm sm:text-base">
          {projectname ? projectname.substring(0, 2).toUpperCase() : 'NA'}
        </div>
        <Ellipsis className="text-gray-500 h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      
      <div className="pl-3 sm:pl-4 mt-1 sm:mt-2">
        <h1 className="text-base sm:text-lg font-bold text-[#2f3035] line-clamp-1">{projectname}</h1>
      </div>

      <div className="pl-3 sm:pl-4">
        <h1 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">{project.type}</h1>
      </div>

      <div className="px-3 sm:px-4">
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{discription?.slice(0, 70) || 'No description'}...</p>
      </div>

      <hr className='my-3 sm:my-4 md:my-[20px] mx-3 sm:mx-4' />

      <div className="px-3 sm:px-4 mt-4 sm:mt-6 md:mt-10 flex justify-between items-center">
        <div className="h-7 sm:h-8 w-[80px] sm:w-[90px] bg-[#e7e7e7] flex items-center justify-center text-xs text-gray-700 gap-1 rounded">
          <ClockAlert className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{timeAgo}</span>
        </div>

        <div className="flex items-center space-x-[-10px] sm:space-x-[-12px]">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold ${index < 2 ? 'border-2 border-white' : ''} z-${30 - (index * 10)}`}
            >
              <UserRound className='h-3 w-3 sm:h-4 sm:w-4'/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkProjectCardOne;