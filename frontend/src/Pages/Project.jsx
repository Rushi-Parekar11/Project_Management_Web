import React, { useState, useRef, useEffect } from 'react';
import { CircleUser,House,ChartPie ,CalendarRange,UserPlus,Tags,UserRoundPlus,CircleDot,ChevronDown,AtSign,CalendarCheck2,ClockAlert,UserRound   } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TaskManager from '../Components/TaskManager';

function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);


  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/project/${projectName}`);
        setProjectData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectName]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };


  }, [isOpen]);

  
  const calculateDaysAgo = (dateString) => {
    const currentDate = new Date();
    const pastDate = new Date(dateString);
    const diffTime = Math.abs(currentDate - pastDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? ' Created At Today' : `${diffDays} days ago`;
  };

  
  return (
    <>
    <div className="flex">
   {/* side panel */}
   <div className=" min-h-[91vh] w-[17%] fixed top-[8vh] left-0 border-2 border-l-red">

   {projectData?.createdby && (
  <div className="h-[10vh] flex items-center pl-5 border-b-2 ">
    <div className="h-[37px] w-[37px] bg-[#776aff] font-bold text-white text-md rounded-lg flex justify-center items-center">
    {projectData?.createdby?.name &&
  projectData.createdby.name
    .slice(0, 2)
    .toUpperCase()
}
    </div>
    <div className="flex flex-col ml-4 mb-2">
      <h1 className='text-lg font-medium mb-[-2px]'>{projectData.createdby.name}</h1>
      <h1 className='text-xs font-medium'>{projectData.createdby.email}</h1>
    </div>
  </div>
)}


<div className="w-full h-[74vh]">
<ul className='list-none pl-4 pr-2 flex flex-col gap-2 mt-4'>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<House className='h-4 w-4' /><span className="text-sm font-medium">Home</span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]' onClick={() => setIsOpen(true)}>
<CircleDot  className='h-4 w-4' /><span className="text-sm font-medium">Project Info </span> <ChevronDown className='h-4 w-4'/>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<ChartPie  className='h-4 w-4' /><span className="text-sm font-medium">Statistics </span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<CalendarRange  className='h-4 w-4' /><span className="text-sm font-medium">Calendar </span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<ChartPie  className='h-4 w-4' /><span className="text-sm font-medium">Statistics </span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<Tags  className='h-4 w-4' /><span className="text-sm font-medium">Tip Notes </span>
</li>

<hr className='mt-10'/>

<h3 className='text-md font-medium pl-3'>project CreatedBy</h3>
<div className="h-[37px] w-[37px] bg-[#776aff] ml-3 font-bold text-white text-md rounded-full flex justify-center items-center">
{projectData?.createdby?.name &&
  projectData.createdby.name
    .slice(0, 2)
    .toUpperCase()
}

</div>

<h3 className='text-md font-medium pl-3 mt-5'>Contributor</h3>
<div className="flex">
<div className="h-[33px] w-[33px] font-bold    ml-3 text-gray-500 text-xl rounded-full flex justify-center items-center outline outline-[4px] outline-dotted outline-gray-500 mr-[3px]"><UserPlus className='h-4 w-4'/></div>
<div className="h-[37px] w-[37px] bg-[#f9aaef] ml-1 font-bold text-white text-md rounded-full flex justify-center items-center">CR</div>
<div className="h-[37px] w-[37px] bg-[#0db3c1] ml-1 font-bold text-white text-md rounded-full flex justify-center items-center">AT</div>
<div className="h-[37px] w-[37px] bg-[#ff642e] ml-1 font-bold text-white text-md rounded-full flex justify-center items-center">PR</div>
</div>
</ul>
</div>

<ul className='px-1'>
    <li className='flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer bg-black text-white transition-all duration-200 hover:bg-[#222]'>
      <UserRoundPlus className='h-5 w-5' />
      <span className="text-sm font-medium">Share the Invite</span>
    </li>
  </ul>



</div>



   {/* main content */}
<div className=" min-h-[106vh] w-[83%]  ml-[17%]">

<div className="h-[110px] z-1000 flex  items-center pl-5 shadow-sm drop-shadow-md sticky shadow-b-2 top-[64px] bg-white">
  <div onClick={() => setIsOpen(prev => !prev)} className="flex items-center cursor-pointer rounded-md px-6 py-2 hover:bg-[#ebebeb] mr-4"><h4 className='text-2xl font-bold mr-3'>{projectName}</h4><ChevronDown/></div>
 <h1>Software</h1>
</div>



{isOpen && (
  <div className="fixed z-50 flex items-center left-65 bottom-90">
    <div ref={popupRef} className="bg-white rounded-lg shadow-2xl drop-shadow-lg w-[550px] p-6"> 
     <div className="mb-4">
        <h2 className="text-xl font-medium text-[#323338]">{projectName}</h2>
        <p className="text-md text-gray-800 mt-3 text-[#323338]">{projectData.discription}</p>
      </div>
      <hr className='border-1 border-[#b8b8b8]'/>
      <h2 className="text-md font-medium text-[#323338] mt-3">Board Info</h2>
      <div className='gap-3  mt-4 flex flex-col'>
      <div className="flex "><div className="font-medium text-base mr-24">Created By</div><CircleUser className='ml-7'/> <div className="font-medium text-base ml-3">{projectData.createdby?.name}</div></div>
      <div className="flex "><div className="font-medium text-base mr-20">Associated email</div><AtSign /> <div className="font-medium text-base ml-3">{projectData.createdby?.email}</div></div>
      <div className="flex "><div className="font-medium text-base mr-20">Created At</div><CalendarCheck2 className='ml-11'/> <div className="font-medium text-base ml-3">{new Date(projectData.updatedAt).toLocaleDateString('en-IN', {day: '2-digit',month: 'short',year: 'numeric'})}</div></div>

      <div className=' mt-10 flex justify-between'>
    <div className='h-8 w-[120px] py-2 bg-[#e7e7e7] flex items-center justify-center text-xs text-gray-700 gap-1'><ClockAlert className='h-4 w-4'/> <h3 className='flex'>{calculateDaysAgo(projectData?.createdAt)}</h3></div>
    <div className="flex items-center space-x-[-12px]">
  <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-30 border-2 border-white"><UserRound className='h-4 w-4'/></div>
  <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-20 border-2 border-white"><UserRound className='h-4 w-4'/></div>
  <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-10"><UserRound className='h-4 w-4'/></div>
</div>
</div>
      </div>
    </div>
  </div>
)}

<hr />
<TaskManager projectName={projectName} />





</div>






</div>
    </>
  )
}

export default Project
