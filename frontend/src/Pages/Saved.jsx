import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { toast, ToastContainer } from 'react-toastify';
import ProjectCardFour from '../Components/ProjectCardFour';
import SkProjectCardSeven from '../Skeleton Compo/SkProjectCardSeven';
import { host } from '../api';

function Saved() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();
  const [disprojects, setdisprojects] = useState([]);
  const navigate = useNavigate();
  const [islogin,setIsLogin] = useState(false);
  


  useEffect(() => {
    setIsLogin(true);
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${host}/${username}/dashboard/displaysave`);
        setdisprojects(res.data.savedProjects);
        console.log(disprojects);
        setIsLogin(false)
      } catch (error) {
        console.log(error);
        setIsLogin(false)
      }
    };
    if (username) fetchdata();
  }, [username]);


  return (
    <>

<div className="flex h-[20vh] w-full justify-center"><h1 className='text-3xl font-bold'>Saved Projects</h1></div>


{islogin ? (
  <div className="flex flex-wrap gap-2">
{
  Array.from({ length: 4 }).map((_, index) => (
    <SkProjectCardSeven key={index} />
  ))
}
</div>
) : disprojects.length <= 0 ? (
  <div className="flex flex-col items-center justify-center h-[60%] p-4 sm:p-6 md:p-8">
    <div className="w-full max-w-4xl mx-auto">
      <div className="h-[305px] w-full md:w-[770px] flex items-center justify-center flex-col">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?semt=ais_hybrid&w=740"
          alt="No projects"
          className="h-[230px] object-contain"
        />
        <h1 className="text-xl text-[#7684f1] md:text-2xl font-bold mt-2">
          No Projects Saved
        </h1>
      </div>
    </div>
  </div>
) : (
  <div className="flex w-full flex-wrap gap-1 mt-[-40px]">
    {disprojects.map((project) => (
      <ProjectCardFour key={project._id} project={project} />
    ))}
  </div>
)}





    </>
  );
}

export default Saved;