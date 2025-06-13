import React, { useState, useRef, useEffect } from 'react';
import { CircleUser, House, ChartPie,CircleDot , ChevronRight, LayoutPanelLeft, ClipboardList, Tornado, ChevronDown, AtSign, CalendarCheck2, ClockAlert, UserRound } from 'lucide-react';
import { MdOutlineGroups } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TaskManager from '../Components/TaskManager';
import Statistics from '../Components/Statistics';
import BuildDocs from '../Components/BuildDocs';
import { toast, ToastContainer } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import SkProjectCardThree from '../Skeleton Compo/SkProjectCardThree';
import { FaUserGroup } from "react-icons/fa6";
import { host } from '../api';

function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [active, setActive] = useState('Build Documentation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributorEmail, setContributorEmail] = useState('');
  const [ContributorLoading, setContributorLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${host}project/${projectName}`);
        setProjectData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setLoading(false);
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

  const getDaysAgo = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 'Created today' : `${diffDays} days ago`;
  };

  const items = [
    { name: 'Build Documentation', icon: ClipboardList },
    { name: 'Project Management', icon: Tornado },
    { name: 'Statistics', icon: ChartPie },
  ];

  const renderContent = () => {
    switch (active) {
      case 'Build Documentation': return <BuildDocs />;
      // case 'Project Management': return <TaskManager projectName={projectName} />;
      // case 'Statistics': return <Statistics />;
      default: return <BuildDocs />;
    }
  };

  const handleSendRequest = async () => {
    if (!contributorEmail) return alert('Please enter an email.');
    setContributorLoading(true);
  
    try {
      const res = await fetch(`${host}project/${projectData.projectname}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contributorEmail }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Request sent successfully!");
        setContributorLoading(false);
        setIsModalOpen(false);
        setContributorEmail('');
        window.location.reload();
      } else {
        toast.error(data.message || 'Something went wrong!');
        setContributorLoading(false);
      }
    } catch (error) {
      setContributorLoading(false);
      console.error('Error sending request:', error);
      toast.error('Failed the request');
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md"
        >
          ☰
        </button>

        {/* side panel - now responsive */}
        {!loading ? (
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block min-h-[91vh] w-full md:w-[17%] fixed md:top-[8vh] top-0 left-0 border-r-2 border-gray-200 bg-white z-40 overflow-y-auto`}>
            <div className="w-full h-[74vh] p-2">
              <ul className="list-none pl-2 pr-2 flex flex-col gap-2 mt-2">
                <li onClick={() => navigate('/')} className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 mt-1 pr-2 cursor-pointer transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                  <House className="h-4 w-4" /><span className="text-sm font-medium">Home</span>
                </li>

                <li onClick={() => navigate(`/${projectData?.createdby?.name}/dashboard`)} className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                  <LayoutPanelLeft className="h-4 w-4" /><span className="text-sm font-medium">Your Project</span>
                </li>

                <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer transition-all duration-200 hover:bg-[#ebebeb] text-[#333]" onClick={() => setIsOpen(true)}>
                  <CircleDot className="h-4 w-4" /><span className="text-sm font-medium">Project Info</span> <ChevronRight className="h-4 w-4" />
                </li>

                <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                  <ChartPie className="h-4 w-4" /><span className="text-sm font-medium" onClick={() => navigate(`/documentation/${projectName}`)}>Documentation</span>
                </li>

                <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                  <MdOutlineGroups className="h-4 w-4" /><span className="text-sm font-medium" onClick={() => navigate('/cluster')}>Cluster</span>
                </li>

                <hr className="mt-4" />

                <h3 className="text-md font-medium pl-3">Project CreatedBy</h3>
                <div className="h-[37px] w-[37px] bg-[#776aff] ml-3 font-bold text-white text-md rounded-full flex justify-center items-center">
                  {projectData?.createdby?.name?.slice(0, 2).toUpperCase()}
                </div>

                <hr className="mt-4" />

                <div className="flex flex-col">
                  <div className="h-[47px] w-full md:w-[170px] cursor-pointer mb-2 font-bold ml-3 text-[#656566] text-xl rounded-md flex justify-center gap-1 items-center border-2 border-[#656566] mr-[3px]" onClick={() => setIsModalOpen(true)}>
                    <h3 className='text-sm font-md text-[#656566]'>Add Contributor</h3>  
                    <FaUserGroup className="h-4 w-4 font-bold" />
                  </div>

                  {projectData?.contributor?.map((con, index) => (
                    <div key={index} onClick={() => navigate(`/profile/${con.name}`)} className="h-[48px] bg-[#776aff] hover:bg-[#40398f] w-full md:w-[170px] mt-1 cursor-pointer font-bold ml-3 text-gray-800 text-xl rounded-md flex justify-start items-center mr-[3px]">
                      <div className="h-[30px] w-[30px] bg-white font-bold text-[#e19917] text-base rounded-md flex justify-center items-center ml-2">
                        {con.name?.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col ml-4 mb-2">
                        <h1 className="text-lg font-medium mb-[-2px] text-white">{con.name}</h1>
                        <h1 className="text-xs font-medium text-white">{con.email}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        ) : <SkProjectCardThree />}

        {/* Modal for Contribution Request */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl p-6 relative space-y-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-black hover:border-2 border-black rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold text-black">Add Contributor</h2>
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
              <button 
                onClick={handleSendRequest} 
                className="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium border border-black transition"
              >
                {!ContributorLoading ? "Add Contributor" : <ClipLoader color='white' className='w-4' size='17px' aria-label="Loading Spinner" data-testid="loader"/>}
              </button>
            </div>
          </div>
        )}

        {/* main content */}
        <div className="min-h-screen w-full md:w-[83%] md:ml-[17%] overflow-y-auto">
          <div className="h-[90px] z-1000 flex flex-col justify-between pl-0 shadow-sm drop-shadow-md sticky bg-white">
            <div 
              onClick={() => setIsOpen((prev) => !prev)} 
              className="flex items-center cursor-pointer ml-5 md:ml-5 rounded-md px-6 py-2 hover:bg-[#ebebeb] mr-4 w-fit"
            >
              <h4 className="text-xl md:text-2xl font-bold mr-3">{projectName}</h4>
              <ChevronDown />
            </div>

            <div className="flex pl-4 md:pl-10 overflow-x-auto">
              <ul className='flex list-none text-sm font-medium text-[#333] cursor-pointer mb-2'>
                {items.map(({name, icon: Icon}) => (
                  <li 
                    key={name} 
                    onClick={() => setActive(name)} 
                    className={`flex gap-1 items-center px-2 py-1 rounded-sm hover:bg-[#ebebeb] transition-all duration-200 whitespace-nowrap ${active === name ? 'border-b-2 border-black' : 'border-b-2 border-white'}`}
                  >
                    <Icon className='h-4 w-4'/>{name}
                  </li>
                ))}
              </ul>
            </div>  
          </div>

          {isOpen && (
            <div className="fixed z-50 inset-0 md:inset-auto md:left-65 md:bottom-90 flex items-center justify-center md:block">
              <div ref={popupRef} className="bg-white rounded-lg shadow-2xl drop-shadow-lg w-full max-w-[550px] mx-4 md:mx-0 p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-medium text-[#323338]">{projectName}</h2>
                  <p className="text-md text-gray-800 mt-3 text-[#323338]">{projectData?.discription}</p>
                </div>
                <hr className="border-1 border-[#b8b8b8]" />
                <h2 className="text-md font-medium text-[#323338] mt-3">Board Info</h2>
                <div className="gap-3 mt-4 flex flex-col">
                  <div className="flex flex-wrap">
                    <div className="font-medium text-base w-24 md:w-32">Created By</div>
                    <div className="flex items-center ml-2">
                      <CircleUser className="h-4 w-4" /> 
                      <div className="font-medium text-base ml-3">{projectData?.createdby?.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="font-medium text-base w-24 md:w-32">Associated email</div>
                    <div className="flex items-center ml-2">
                      <AtSign /> 
                      <div className="font-medium text-base ml-3">{projectData?.createdby?.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="font-medium text-base w-24 md:w-32">Created At</div>
                    <div className="flex items-center ml-2">
                      <CalendarCheck2 className="h-4 w-4" /> 
                      <div className="font-medium text-base ml-3">
                        {new Date(projectData?.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="h-8 w-[120px] py-2 bg-[#e7e7e7] flex items-center justify-center text-xs text-gray-700 gap-1 mb-4 sm:mb-0">
                      <ClockAlert className="h-4 w-4" /> 
                      <h3>{getDaysAgo(projectData?.updatedAt)}</h3>
                    </div>
                    <div className="flex items-center space-x-[-12px]">
                      <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-30 border-2 border-white">
                        <UserRound className="h-4 w-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-20 border-2 border-white">
                        <UserRound className="h-4 w-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-10">
                        <UserRound className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr className="mb-2" />
          <div className="p-4">
            {renderContent()}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Project;