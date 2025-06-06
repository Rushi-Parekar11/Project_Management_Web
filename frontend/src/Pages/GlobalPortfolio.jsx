import React, { useEffect, useState } from 'react';
import { Search, ListFilter, Plus, ArrowLeft } from 'lucide-react';
import ProjectCardTwo from '../Components/ProjectCardTwo';
import axios from 'axios';
import SkProjectCardTwo from '../Skeleton Compo/SkProjectCardTwo ';
import { useNavigate } from 'react-router-dom';

function GlobalPortfolio() {
  const [allproject, setallproject] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [islogin, setIsLogin] = useState(false);
  const [username, setusername] = useState("Test Mode");
  const navigate = useNavigate();

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

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
      setusername(localStorage.getItem('LoggedInUser'));
    };
    checkLogin();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const filteredProjects = allproject.filter((project) =>
    (project?.projectname || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-20 pt-8">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300 pb-4">
        {/* Back Button */}
        <div
          className="flex items-center gap-2 p-2 sm:p-3 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-fit rounded transition-all"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back</span>
        </div>

        {/* Title */}
        <div className="flex flex-wrap gap-2 px-2 sm:px-4 mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Global</h1>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#776aff]">Project</h1>
          <h1 className="text-2xl sm:text-3xl font-bold">Portfolio</h1>
        </div>

        {/* Search & Button */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 px-2 sm:px-4 mt-6 w-full">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <ListFilter className="text-[#c4c4c4]" />
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Project"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#c4c4c4] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
          <button
            className="px-3 py-2 flex items-center gap-2 bg-black text-white text-sm rounded hover:bg-gray-900 transition-all w-full sm:w-auto"
            onClick={
              islogin
                ? () => navigate(`/${username}/dashboard`)
                : () => navigate('/login')
            }
          >
            <Plus size={16} />
            Add Your Project
          </button>
        </div>
      </div>

      {/* Project List */}
      <h1 className="text-lg font-semibold text-[#292a2e] mt-6">Listed All Projects</h1>
      <div className="mt-5 flex flex-wrap gap-6 justify-center sm:justify-start">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkProjectCardTwo key={index} />
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCardTwo key={project._id} project={project} />
          ))
        ) : (
          <p className="text-gray-600 mt-4">No projects found.</p>
        )}
      </div>
    </div>
  );
}

export default GlobalPortfolio;
