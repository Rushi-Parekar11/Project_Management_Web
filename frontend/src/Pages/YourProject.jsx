import React, { useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import ProjectCardOne from '../Components/ProjectCardOne';
import ProjectForm from '../Components/ProjectForm';
import SkeletonCard from '../Skeleton Compo/SkProjectCardOne';
import { useNavigate } from 'react-router-dom';
import NoProjects from '../assets/NoProjects.png'

function YourProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = localStorage.getItem("LoggedInUser");
  const navigate = useNavigate();
  console.log(username);

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`https://project-management-web-backend.vercel.app/${username}/dashboard`);
        const data = await response.json();
        if (data.projects) {
          setProjects(data.projects);
          console.log(data)
        } else {
          setError('Failed to fetch projects');
        }
      } catch (error) {
        setError('An error occurred while fetching projects');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, [username]);
  
  useEffect(() => {
    if (projects.length > 0) {
    }
  }, [projects]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter((project) =>
    (project?.projectname || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-[100vh] w-full px-4 md:pl-10 pt-6 md:pt-10'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6 md:mb-9'>Your project</h1>

      <div className='w-full md:w-[70%] mb-6'>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search Project" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-10 pr-4 py-2 border-2 border-[#c4c4c4] rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <h1 className='text-lg font-bold text-[#292a2e] mt-4 md:mt-6'>Latest Projects</h1>

      <div className="mt-4 md:mt-5 flex gap-4 md:gap-7 flex-row flex-wrap">
        {/* Create New Project Card */}
        <div 
          className="h-[200px] md:h-[280px] w-full sm:w-[calc(50%-1rem)] md:w-[300px] flex items-center justify-center flex-col rounded-md shadow-md border-2 border-[#dddedd] cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className='h-[35px] w-[35px] md:h-[45px] md:w-[45px] text-[#6b6b6b]'/>
          <h1 className='text-[#6b6b6b] font-medium mt-2'>Create New Project</h1>
        </div>

        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-1rem)] md:w-[300px]">
              <SkeletonCard />
            </div>
          ))
        ) : filteredProjects.length > 0 ? (
          [...filteredProjects].reverse().map((project) => (
            <div key={project._id} className="w-full sm:w-[calc(50%-1rem)] md:w-[300px]">
              <ProjectCardOne project={project} className='cursor-pointer' />
            </div>
          ))
        ) : (
          <div className="h-[305px] w-full md:w-[770px] flex items-center justify-center flex-col">
            <img src={NoProjects} alt="No projects" className="w-12 h-12 object-contain" />
            <h1 className='text-xl md:text-2xl font-bold mt-2'>No Projects Found</h1>
          </div>
        )}
      </div>

      <hr className="w-full md:w-[95%] mt-8 md:mt-10 mb-4 border border-[#cacaca]" />

      <div className="h-[100px] md:h-[130px] w-full flex justify-center">
        <div className="h-full w-full md:w-[48%] flex justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex justify-center items-center gap-2 w-full md:w-[70%] h-[50px] md:h-[60px] rounded-lg cursor-pointer hover:bg-black hover:text-white border-2 border-[#c4c4c4] text-base md:text-xl text-[#444444] transition-colors'
          >
            <Plus className='h-5 w-5' /> Start New Project
          </button>
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