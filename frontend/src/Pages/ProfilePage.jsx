import React, { useEffect, useState } from 'react'
import { Copy, Pencil } from 'lucide-react';
import ProjectCardThree from '../Components/ProjectCardThree';
import { useParams } from 'react-router-dom';
import NoProjects from '../assets/NoProjects.png'
import SkProjectCardSix from '../Skeleton Compo/SkProjectCardSix';
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { host } from '../api';



function ProfilePage() {
  const [projects, setProjects] = useState([]);
  const [userinfo, setuserinfo] = useState({});
  let [loading, setLoading] = useState(false);


  const { username } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${host}/${username}/dashboard`);
        setProjects(res.data.projects);
                setLoading(false)
      } catch (error) {
        console.log(error);
                setLoading(false)
      }
    }
        fetchData();
  }, [])

  console.log(projects.length)

  return (
    <>

      {!loading ?
        <div className="flex justify-center bg-[#f3f4f6]">
          <div className="min-h-[120vh] w-[75%]  rounded-xl mt-5 overflow-hidden bg-white">
            <div className="relative w-full h-[30vh]">
              <img src="https://media.licdn.com/dms/image/v2/C4D1BAQGpOaPiKAggCw/company-background_10000/company-background_10000/0/1583773465764/tambua_health_cover?e=2147483647&v=beta&t=1_MCOf1RV1Ds7R7frpk7LOSleMRBcEUgd2vKJsqFbVM"
                alt="profile background" className="w-full h-full object-cover" />

              <div className="absolute bottom-[-55px] left-[57px] z-10">
                <div className="w-[130px] h-[130px] rounded-full bg-[#776aff] cursor-pointer text-5xl border-2 border-white flex justify-center items-center text-white font-bold shadow-md">
                  <FaUserAlt className='h-[55px] w-[55px]'/>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between h-[10vh] mt-[55px]">
              <div className='w-[20%] pl-[95px] items-center flex h-full  '><h1 className='text-2xl  font-bold'>{username}</h1> 
          </div>
              <div className="flex gap-1 mt-2 pr-3">
                <div className="h-[40px] w-[40px] rounded-full flex items-center justify-center hover:bg-gray-300"><Copy className='h-[20px] w-[20px]' /></div>
                <div className="h-[40px] w-[40px] rounded-full flex items-center justify-center hover:bg-gray-300"><Pencil className='h-[20px] w-[20px]' /></div>
              </div>
            </div>

            <div className=" pl-2 pb-2 flex ">
              <div className='w-[97%] px-7'><h1 className='font-semibold text-lg'>About</h1>
                <p className='text-sm '>I am a pre-final year B.Tech CSE student passionate about web development, with experience in the MERN stack and Java. I enjoy creating dynamic, user-friendly web applications and am eager to learn and grow. Open to internships and collaborative opportunities to apply my skills and gain practical experience. Let's connect and work on impactful projects together!</p>
              </div>
              <div className="w-[3%]">
                <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center hover:bg-gray-300"><Pencil className='h-[17px] w-[17px]' /></div>
              </div>
            </div>

            <hr className='border-black mt-3' />

            <div className="w-full">
              <h1 className='font-semibold text-lg mt-4 ml-2'>Project Documents</h1>
              <div className="w-full min-h-[200px] py-4 px-2 flex flex-wrap gap-8 pl-7">
    {projects.length > 0 ?   projects.map((project, index) => (
  <ProjectCardThree key={index} data={project} className='cursor-pointer' />
)) :  <div> <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?semt=ais_hybrid&w=740" alt="no Projects" className='h-[230px]'/> <h1 className='font-semibold ml-[70px]'>No Projects Found</h1></div> }
</div>
            </div>

          </div>
        </div>
        : <SkProjectCardSix />
      }
    </>
  )
}

export default ProfilePage