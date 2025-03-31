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
        const response = await fetch(`http://localhost:8081/${username}/dashboard`);
        const data = await response.json();
        if (data.projects) {
          setProjects(data.projects);
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
      console.log(projects);
    }
  }, [projects]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter((project) =>
    (project?.projectname || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  

  return (
    <div className='min-h-[100vh] w-350 pl-10 pt-10'>
      <h1 className='text-3xl font-bold mb-9'>Your project</h1>

      <div className='h-13 w-300'>
        <div className="relative w-[70%]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search Project" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border-2 border-[#c4c4c4] rounded-md focus:outline-none focus:ring-1 focus:ring-black"/>
        </div>
      </div>

      <h1 className='text-lg font-bold text-[#292a2e] mt-6'>Latest Projects</h1>

      <div className="mt-5 h-82 flex gap-7 flex-row flex-wrap">
      <div className="mt-5 h-82 flex gap-7 flex-row flex-wrap">

      {/* //duptlicate card */}
      <div className="h-[305px] w-[300px] flex items-center justify-center flex-col rounded-md shadow-md border-2 border-[#dddedd] cursor-pointer" onClick={() => setIsModalOpen(true)} >
        <Plus className='h-[45px] w-[45px] text-[#6b6b6b]'/>
        <h1 className='text-[#6b6b6b] font-medium'>Create New Project</h1>
      </div>

      {loading ? (
  Array.from({ length: 4 }).map((_, index) => (
    <SkeletonCard key={index} />
  ))
) : filteredProjects.length > 0 ? (
  [...filteredProjects].reverse().map((project) => (
    <ProjectCardOne key={project._id} project={project} className='cursor-pointer' />
  ))
) : (

  <div className="h-[305px] w-[770px] flex items-center justify-center flex-col "  >
  <img src={NoProjects} alt="No projects" className="w-12 h-12 object-contain" />
  <h1 className='text-2xl font-bold'>No Projects Found</h1>
      </div>
)}



</div>

      </div>

      <hr className="w-[95%] mt-10 mb-4 border border-[#cacaca]" />

      <div className="h-[130px] w-[100%] flex justify-center">
        <div className="h-[120px] w-[48%] flex justify-center items-center">
          <li
            onClick={() => setIsModalOpen(true)}
            className='flex justify-center items-center gap-2 w-[70%] h-[60px] rounded-lg cursor-pointer hover:bg-black hover:text-white border-2 border-[#c4c4c4] text-xl text-[#444444]'
          >
            <Plus className='h-5 w-5' /> Start New Project
          </li>
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
