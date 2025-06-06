import React, { useEffect, useState } from 'react'
import { Search, ListFilter, Plus ,ArrowLeft} from 'lucide-react';
import ProjectCardTwo from '../Components/ProjectCardTwo';
import axios from 'axios';
import SkProjectCardTwo from '../Skeleton Compo/SkProjectCardTwo ';
import { useNavigate } from 'react-router-dom';
import { host } from '../api';


function GlobalPortfolio() {
  const [allproject, setallproject] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [islogin,setIsLogin] = useState(false);
  const [username,setusername] = useState("Test Mode");

  

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const alldata = await axios.get(`${host}GlobalPortfolio/projects`);
  //      const alldata = await axios.get('https://project-management-web-backend.vercel.app/GlobalPortfolio/projects');
        setallproject(alldata.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        
      }
    };
    fetchdata();
  }, []);

  useEffect(()=>{
    const checkLogin=()=>{
      const token = localStorage.getItem('token');
      setIsLogin(!!token);

      setusername(localStorage.getItem('LoggedInUser'));
      console.log(username)
    }

    checkLogin();
  },[])

// Inside the component
const navigate = useNavigate();

const handleBack = () => {
  navigate(-1);
};

  const filteredProjects = allproject.filter((project) =>
    (project?.projectname || '').toLowerCase().includes(searchTerm.toLowerCase())
  );







  return (
    <div className='min-h-[100vh] w-350 px-[100px] pt-10'>

<div className='sticky top-12 z-[10] bg-white border-b border-gray-300 pb-4'>
  <div
    className="flex items-center gap-2 p-4 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-[90px] transition-all mt-2 duration-200"
    onClick={handleBack}
  >
    <ArrowLeft className="h-5 w-5" />
    <span className="text-sm font-medium">Back</span>
  </div>

  <div className='flex gap-3 px-4'>
    <h1 className='text-3xl font-bold'>Global</h1>
    <h1 className='text-3xl font-bold text-[#776aff]'>Project</h1>
    <h1 className='text-3xl font-bold'>Portfolio</h1>
  </div>

  <div className='h-18 w-full flex items-center gap-3 px-4 mt-6'>
    <ListFilter className='text-[#c4c4c4]' />
    <div className="relative w-[70%]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search Project"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-[#c4c4c4] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-black"
      />
    </div>
    <button className='px-2 py-[10px] w-[160px] flex ml-6 rounded bg-black text-white text-sm hover:bg-gray-900 transition-all' onClick={islogin ? () => navigate(`/${username}/dashboard`) :  () => navigate('/login') }>
      <Plus className='mr-1'/> Add Your Project
    </button>
  </div>
</div>


      <h1 className='text-lg font-bold text-[#292a2e] mt-3'>Listed All Projects</h1>

      <div className="mt-5 h-82 flex-wrap flex gap-6 pb-5 ">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkProjectCardTwo key={index} />
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCardTwo key={project._id} project={project} />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}

export default GlobalPortfolio;
