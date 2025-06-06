import React from 'react';
import { Users, Paperclip } from 'lucide-react';
import { RiImageAddFill } from "react-icons/ri";
import { FaClockRotateLeft } from "react-icons/fa6";
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ProjectCardThree({ data }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full sm:w-[48%] md:w-[320px] p-2 flex flex-col justify-between rounded-md shadow-sm border border-gray-300 cursor-pointer hover:shadow-md hover:border-gray-400"
      onClick={() => navigate(`/documentation/${data.projectname}`)}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-9 w-9 bg-[#776aff] text-white rounded-lg flex items-center justify-center font-bold text-lg">
          {data.projectname ? data.projectname.substring(0, 2).toUpperCase() : 'NA'}
        </div>
        <div className="flex-1">
          <h2 className="text-base font-semibold truncate">{data.projectname}</h2>
          <p className="text-xs text-gray-600 truncate">{data.type}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-gray-500" />
      </div>

      {/* Creator info */}
      <div
        className="flex items-center gap-2 mt-2 text-xs text-gray-700 cursor-pointer"
        onClick={e => {
          e.stopPropagation();
          navigate(`/profile/${data.createdby.name}`);
        }}
      >
        <div className="h-5 w-5 bg-[#776aff] rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
          RU
        </div>
        <span className="truncate">{data.createdby.name}</span>
      </div>

      {/* Image preview */}
      <div className="relative mt-2 rounded overflow-hidden h-24 bg-gray-200">
        <img
          src="https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png"
          alt="Project Preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <RiImageAddFill className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Footer stats */}
      <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>0 Contributors</span>
        </div>
        <div className="flex items-center gap-1">
          <Paperclip className="h-4 w-4" />
          <span>0 Attachments</span>
        </div>
        <div className="flex items-center gap-1">
          <FaClockRotateLeft className="h-4 w-4" />
          <span>10d ago</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCardThree;
