import React, { useEffect, useState } from 'react'
import { Search, ListFilter, Plus ,ArrowLeft} from 'lucide-react';
import ProjectCardTwo from '../Components/ProjectCardTwo';
import axios from 'axios';
import SkProjectCardTwo from '../Skeleton Compo/SkProjectCardTwo ';
import { useNavigate } from 'react-router-dom';

function GlobalPortfolio() {
  const [allproject, setallproject] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const alldata = await axios.get('http://localhost:8081/GlobalPortfolio/projects');
        setallproject(alldata.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

// Inside the component
const navigate = useNavigate();

const handleBack = () => {
  navigate(-1);
};

  const filteredProjects = allproject.filter((project) =>
    (project?.projectname || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-[100vh] w-350 pl-10 pt-10'>

<div  className="flex items-center gap-2 p-4 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-[90px] transition-all mt-2 duration-200" onClick={handleBack} >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back</span>
        </div>



      <div className='flex gap-3'>
        <h1 className='text-3xl font-bold'>Global </h1>
        <h1 className='text-3xl font-bold text-[#776aff]'> Project </h1>
        <h1 className='text-3xl font-bold'>Portfolio</h1>
      </div>

      <div className='h-18 w-300 flex items-center gap-3 sticky top-[65px] bg-white mt-9'>
        <ListFilter className='text-[#c4c4c4]' />
        <div className="relative w-[70%]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search Project"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[50%] pl-10 pr-4 py-2 border-2 border-[#c4c4c4] bg-white z-1000 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button className='px-4 py-2 sm:px-5 sm:py-3 ml-6 rounded bg-black text-white text-sm hover:bg-gray-900 transition-all'>
            Create Add Own Project
          </button>
        </div>
      </div>

      <h1 className='text-lg font-bold text-[#292a2e] mt-3'>Listed All Projects</h1>

      <div className="mt-5 h-82 flex-wrap flex gap-10 pb-5">
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
