import React, { useState, useRef, useEffect } from 'react';
import { CircleUser, House, ChartPie, ChevronRight,LayoutPanelLeft  ,CalendarRange, ClipboardList, Route, UserPlus, Tornado, Tags, UserRoundPlus, CircleDot, ChevronDown, AtSign, CalendarCheck2, ClockAlert, UserRound, Icon } from 'lucide-react';
import { MdOutlineGroups } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TaskManager from '../Components/TaskManager';
import Statistics from '../Components/Statistics';
import BuildDocs from '../Components/BuildDocs';
// import ProjectFlow from '../Components/ProjectFlow';
import ProjectForm from '../Components/ProjectForm';
import { toast,ToastContainer } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import SkProjectCardThree from '../Skeleton Compo/SkProjectCardThree';

function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [active,setactive] = useState('Build Documentation')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributorEmail, setContributorEmail] = useState('');
  const [ContributorLoading, setContributorLoading] = useState(false);
    let [loading, setLoading] = useState(false);

  
  const navigate = useNavigate();
  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://project-management-web-backend.vercel.app/project/${projectName}`);
        setProjectData(res.data);
        setLoading(false)

      } catch (err) {
        console.error("Error fetching project:", err);
        setLoading(true)
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

  // Calculate days ago
  const getDaysAgo = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Created today';
    }
    return `${diffDays} days ago`;
  };

  const items=[
    {name : 'Build Documentation',icon:ClipboardList},
    {name : 'Project Mangement',icon:Tornado},
    {name : 'Statistics',icon:ChartPie},
  ]

  const renderContent=()=>{
    switch (active){
      case 'Build Documentation'  : return <BuildDocs/>;
      case 'Project Mangement' : return   <TaskManager projectName={projectName} />;
      case 'Statistics' : return   <Statistics/>;
      // case 'Project Flow' : return <ProjectFlow/>;
      default : return  <BuildDocs/>;
    }
  }

  const handleSendRequest = async () => {
    if (!contributorEmail) return alert('Please enter an email.');
    setContributorLoading(true)
  
    try {
      const res = await fetch(`https://project-management-web-backend.vercel.app/project/${projectData.projectname}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: contributorEmail }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Request sent successfully!");
        setContributorLoading(false)
        setIsModalOpen(false);
        setContributorEmail('');
        window.location.reload();
      } else {
        toast.error(data.message || 'Something went wrong!');
        setContributorLoading(false)
      }
    } catch (error) {
      setContributorLoading(false)
      console.error('Error sending request:', error);
      toast.error('Faild the request');
    }
  };
  

  return (
    <>
      <div className="flex">
        {/* side panel */}
        {!loading ? 
        <div className="min-h-[91vh] w-[17%] fixed top-[8vh] left-0 border-2 border-l-red">
          <div className="w-full h-[74vh]">
            <ul className="list-none pl-4 pr-2 flex flex-col gap-2 mt-2">
              <li onClick={() => navigate('/')} className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 mt-1 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <House className="h-4 w-4" /><span className="text-sm font-medium">Home</span>
              </li>

              <li onClick={() => navigate(`/${projectData.createdby.name}/dashboard`)} className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <LayoutPanelLeft className="h-4 w-4" /><span className="text-sm font-medium">Your Project</span>
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]" onClick={() => setIsOpen(true)}>
                <CircleDot className="h-4 w-4" /><span className="text-sm font-medium">Project Info </span> <ChevronRight  className="h-4 w-4" />
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <ChartPie className="h-4 w-4" /><span className="text-sm font-medium" onClick={()=>navigate(`/documentation/${projectName}`)}>Documentation </span>
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <MdOutlineGroups className="h-4 w-4" /><span className="text-sm font-medium" onClick={()=>navigate('/cluster')}>Cluster</span>
              </li>

              {/* <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <CalendarRange className="h-4 w-4" /><span className="text-sm font-medium">Calendar </span>
              </li> */}

              {/* <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <Tags className="h-4 w-4" /><span className="text-sm font-medium">Tip Notes </span>
              </li> */}

              <hr className="mt-4" />

              <h3 className="text-md font-medium pl-3">project CreatedBy</h3>
              <div className="h-[37px] w-[37px] bg-[#776aff] ml-3 font-bold text-white text-md rounded-full flex justify-center items-center">
                {projectData?.createdby?.name &&
                  projectData.createdby.name.slice(0, 2).toUpperCase()}
              </div>

              <h3 className="text-md font-medium pl-3 mt-3">Contributor</h3>
            

              <div className="flex flex-col">
                <div  className="h-[47px] w-[170px] mb-2 font-bold ml-3 text-[#656566] text-xl rounded-md flex justify-center items-center border-2 border-[#a5a6a7] mr-[3px]"   onClick={() => setIsModalOpen(true)}>
                  <UserPlus className="h-4 w-4" />
                </div>

      

                {/* <h1>{projectData.contributor.name}</h1> */}
                {projectData?.contributor && projectData.contributor.map((con, index) => (
                <div key={index} className="h-[48px] w-[170px] mt-1 font-bold ml-3 text-gray-800 text-xl rounded-md flex justify-start items-center border-2 border-[#b9b9b9] mr-[3px]">
                <div className="h-[35px] w-[35px] bg-[#776aff] font-medium text-white text-base rounded-lg flex justify-center items-center ml-2">{con.name?.slice(0, 2).toUpperCase()}</div>
                <div className="flex flex-col ml-4 mb-2">
                <h1 className="text-lg font-medium mb-[-2px] text-[#4a4a4b]">{con.name}</h1>
                <h1 className="text-xs font-medium text-[#656566]">{con.email}</h1>
              </div>
                 </div>
  
))}

              </div>
            </ul>
          </div>
          {/* <ul className="px-1 sticky bottom-0">
            <li className="flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer bg-black text-white transition-all duration-200 hover:bg-[#222]">
              <UserRoundPlus className="h-5 w-5" />
              <span className="text-sm font-medium">Share the Invite</span>
            </li>
          </ul> */}
        
        </div>
        :  <SkProjectCardThree/>}

          {/* Model open  Contribution Request */}
           {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative space-y-4">
    {/* Close Button */}
    <button
      onClick={() => setIsModalOpen(false)}
      className="absolute top-3 right-3 text-black hover:border-2 border-black  rounded-full w-8 h-8 flex items-center justify-center transition"
    >
      &times;
    </button>

    {/* Heading */}
    <h2 className="text-2xl font-semibold text-black">Add Contributor</h2>

    {/* Description */}
    <p className="text-sm text-black">
      Enter the contributor's email address below to add them in Project.
    </p>

    <input
  type="email"
  placeholder="email@example.com"
  value={contributorEmail}
  onChange={(e) => setContributorEmail(e.target.value)}
  className="w-full border border-black rounded-md px-4 py-2 text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
/>



    {/* Submit Button */}
    <button onClick={handleSendRequest}  className="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium border border-black transition">
    {!ContributorLoading ? "Add Contributor" :  <ClipLoader color='white' className='w-4' size='17px' aria-label="Loading Spinner" data-testid="loader"/>}
</button>

  </div>
</div>
      )}


        {/* main content */}
        <div className="min-h-[70] w-[83%] ml-[17%] overflow-y-auto">
        <div className="h-[90px]   z-1000 flex flex-col justify-between pl-0 shadow-sm drop-shadow-md sticky  bg-white">
  <div onClick={() => setIsOpen((prev) => !prev)} className="flex items-center cursor-pointer ml-5 rounded-md px-6 py-2 hover:bg-[#ebebeb] mr-4 w-fit">
    <h4 className="text-2xl font-bold mr-3">{projectName}</h4><ChevronDown />
  </div>

<div className="flex pl-10">
  <ul className='flex list-none text-sm font-medium text-[#333] cursor-pointer mb-2'>

  {items.map(({name,icon : Icon})=>(
    <li key={name} onClick={()=>setactive(name)} className={`flex gap-1 items-center px-2 py-1 rounded-sm hover:bg-[#ebebeb]  transition-all duration-200  ${active === name ? 'border-b-2 border-black' : 'border-b-2 border-white' }`} >
    <Icon className='h-4 w-4'/>{name}</li>
  ))}

  </ul>
</div>  
</div>


          {isOpen && (
            <div className="fixed z-50 flex items-center left-65 bottom-90">
              <div ref={popupRef} className="bg-white rounded-lg shadow-2xl drop-shadow-lg w-[550px] p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-medium text-[#323338]">{projectName}</h2>
                  <p className="text-md text-gray-800 mt-3 text-[#323338]">{projectData.discription}</p>
                </div>
                <hr className="border-1 border-[#b8b8b8]" />
                <h2 className="text-md font-medium text-[#323338] mt-3">Board Info</h2>
                <div className="gap-3 mt-4 flex flex-col">
                  <div className="flex "><div className="font-medium text-base mr-24">Created By</div><CircleUser className="ml-7" /> <div className="font-medium text-base ml-3">{projectData.createdby?.name}</div></div>
                  <div className="flex "><div className="font-medium text-base mr-20">Associated email</div><AtSign /> <div className="font-medium text-base ml-3">{projectData.createdby?.email}</div></div>
                  <div className="flex "><div className="font-medium text-base mr-20">Created At</div><CalendarCheck2 className="ml-11" /> <div className="font-medium text-base ml-3">{new Date(projectData.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div></div>

                  <div className=" mt-10 flex justify-between">
                    <div className="h-8 w-[120px] py-2 bg-[#e7e7e7] flex items-center justify-center text-xs text-gray-700 gap-1"><ClockAlert className="h-4 w-4" /> <h3 className="flex"> {getDaysAgo(projectData.updatedAt)}</h3></div>
                    <div className="flex items-center space-x-[-12px]">
                      <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-30 border-2 border-white"><UserRound className="h-4 w-4" /></div>
                      <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-20 border-2 border-white"><UserRound className="h-4 w-4" /></div>
                      <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-10"><UserRound className="h-4 w-4" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr className="mb-2" />
          {renderContent()}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Project;
