import React, { useEffect, useState } from 'react';
import {
  Ellipsis, Calendar1, ExternalLink, LockOpen,
  ClockAlert, UserPen, Mail, ArrowUpRight,
  Copy
} from 'lucide-react';
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { host } from '../api';

function ProjectCardTwo({ project }) {
  const navigate = useNavigate();
  const [save, setSave] = useState(false);

  const getTimeAgo = (dateString) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
    const isToday = updatedDate.toDateString() === now.toDateString();
    if (isToday) return "Today";
    const diffInMs = now - updatedDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    return `${diffInDays} days ago`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  const handleSave = async () => {
    const newSaveState = !save;
    setSave(newSaveState);
    const updatedData = {
      email: project.createdby?.email,
      ProjectId: project._id
    };
    try {
      const res = await axios.post(`${host}GlobalPortfolio/projects/save`, updatedData);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save project.");
    }
  };

  useEffect(() => {
    const isSaved = project?.createdby?.saved?.includes(project._id);
    setSave(isSaved);
  }, [project._id, project.createdby?.saved]);

  return (
    <div className="w-full sm:w-[340px] md:w-[400px] bg-white rounded-md shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="pt-4 px-4 flex justify-between items-center cursor-pointer" onClick={() => navigate(`/documentation/${project.projectname}`)}>
        <div className="h-11 w-11 bg-[#776aff] text-white font-bold rounded-lg flex items-center justify-center">
          {project.projectname.slice(0, 2).toUpperCase()}
        </div>
        <ArrowUpRight className="text-gray-500 hover:text-[#776aff]" />
      </div>

      {/* Project Name & Type */}
      <div className="px-4 mt-2">
        <h1 className="text-lg font-bold text-[#2f3035]">{project.projectname}</h1>
        <p className="text-sm text-gray-700">{project.type}</p>
      </div>

      {/* Author Info */}
      <div className="flex flex-wrap gap-4 items-center px-4 py-3 text-[#2f3035] text-sm">
        <div className="flex items-center gap-1">
          <UserPen className="h-4 w-4" />
          <span>{project.createdby?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-1 break-all">
          <Mail className="h-4 w-4" />
          <span>{project.createdby?.email || 'N/A'}</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-4">
        <p className="text-sm text-gray-600">{project.discription.slice(0, 75)}...</p>
      </div>

      <hr className="my-4 mx-2 border-gray-300" />

      {/* Actions & Meta */}
      <div className="px-4 pb-4 flex flex-wrap gap-4 items-center text-gray-600 text-sm">
        {/* Icons */}
        <div className="flex gap-3">
          <div className="relative group cursor-pointer" onClick={handleCopy}>
            <Copy className="h-5 w-5" />
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">Copy</span>
          </div>
          <div className="relative group cursor-pointer">
            <ExternalLink className="h-5 w-5" />
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded">External</span>
          </div>
          <div className="relative group cursor-pointer">
            <LockOpen className="h-5 w-5" />
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded">Unlock</span>
          </div>
        </div>

        {/* Save icon */}
        <div className="relative group cursor-pointer" onClick={handleSave}>
          {save ? (
            <TiStarFullOutline className="h-6 w-6 text-yellow-400" />
          ) : (
            <TiStarOutline className="h-6 w-6" />
          )}
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded">Save</span>
        </div>

        {/* Date Info */}
        <div className="flex items-center gap-1 ml-auto">
          <Calendar1 className="h-4 w-4" />
          <span className="text-xs">{new Date(project.updatedAt).toLocaleDateString('en-GB')}</span>
        </div>
        <div className="flex items-center gap-1">
          <ClockAlert className="h-4 w-4" />
          <span className="text-xs">{getTimeAgo(project.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCardTwo;
