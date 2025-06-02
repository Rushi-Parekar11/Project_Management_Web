import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Ellipsis, Calendar1, ExternalLink, LockOpen, ClockAlert, UserPen, Mail, ArrowUpRight, UserRound, Copy, Star } from 'lucide-react';
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { host } from '../api';

function ProjectCardFour({project}) {
      const navigate = useNavigate();
        const [save, setSave] = useState(false);
          const [sendSaveData, setSendSaveData] = useState({
            email: '',
            ProjectId: ''
          });
          
        
        const handleSave =async () => {
          const newSaveState = !save;
          setSave(newSaveState);
        
          const updatedData = {
            email: project.createdby?.email,
            ProjectId: project._id
          };
      
          try {
            const res = await axios.post(`${host}GlobalPortfolio/projects/save`, updatedData);
            toast.success(res.data.message);
            window.location.reload();
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong while saving the project.");
          }
      console.log(updatedData)
        };

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


      
      useEffect(() => {
        const isSaved = project?.createdby?.saved?.includes(project._id);
        setSave(isSaved);
      }, [project._id, project.createdby?.saved]);
      
    
    
  return (
    <>
            <div className='h-[140px] w-[400px] rounded-md shadow-md border-2 border-gray-200'>
          <div className="pt-4 pl-4 flex items-center justify-between pr-3 cursor-pointer" onClick={() => navigate(`/documentation/${project.projectname}`)}>
            <div className='flex items-center'>
              <div className="h-11 w-11 bg-[#776aff] font-bold text-white rounded-lg flex justify-center items-center cursor-pointer">
                {project.projectname.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="pl-4">
                  <h1 className='text-lg font-bold text-[#2f3035] mt-2 cursor-pointer'>{project.projectname}</h1>
                </div>
                <div className="pl-4">
                  <h1 className='text-sm font-medium text-gray-700 mb-2 cursor-pointer'>{project.type}</h1>
                </div>
              </div>
            </div>
            <ArrowUpRight className="text-gray-500 cursor-pointer hover:text-[#776aff]" />
          </div>

          <hr className='w-[94%] my-1 ml-2 text-gray-300 mt-' />

          <div className="px-4 mt-2 text-gray-600 flex gap-5 items-center">
            <div className="relative group" onClick={()=>handleSave()}>
          {save ? <TiStarFullOutline className="h-6 w-6 cursor-pointer text-[yellow-400]" /> : <TiStarOutline className="h-6 w-6 cursor-pointer" /> }  
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
              Save
            </span>
          </div>

            <div className="relative group" >
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


            <div className='flex gap-1 justify-center items-center ml-19'>
              <Calendar1 className='h-4 w-4' />
              <h5 className='text-[12px] font-medium'>{new Date(project.updatedAt).toLocaleDateString('en-GB')}</h5>
            </div>

            <div className='flex gap-1 justify-center items-center ml-19'>
              <ClockAlert className='h-4 w-4' />
              <h5 className='text-[12px] font-medium'>{getTimeAgo(project.updatedAt)}</h5>

            </div>

          </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

        </div>
    </>
  )
}

export default ProjectCardFour
