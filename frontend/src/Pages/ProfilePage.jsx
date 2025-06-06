import React, { useEffect, useState } from 'react';
import { Copy, Pencil } from 'lucide-react';
import ProjectCardThree from '../Components/ProjectCardThree';
import { useParams } from 'react-router-dom';
import SkProjectCardSix from '../Skeleton Compo/SkProjectCardSix';
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";
import { host } from '../api';

function ProfilePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${host}${username}/dashboard`);
        setProjects(res.data.projects);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <>
      {!loading ? (
        <div className="flex justify-center bg-[#f3f4f6] px-2 sm:px-4">
          <div className="min-h-screen w-full sm:w-[95%] md:w-[90%] lg:w-[75%] rounded-xl mt-5 overflow-hidden bg-white shadow-md">

            {/* Profile Background */}
            <div className="relative w-full h-[30vh]">
              <img
                src="https://media.licdn.com/dms/image/v2/C4D1BAQGpOaPiKAggCw/company-background_10000/company-background_10000/0/1583773465764/tambua_health_cover?e=2147483647&v=beta&t=1_MCOf1RV1Ds7R7frpk7LOSleMRBcEUgd2vKJsqFbVM"
                alt="profile background"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-[-55px] left-5 sm:left-[57px] z-10">
                <div className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] rounded-full bg-[#776aff] text-4xl sm:text-5xl border-2 border-white flex justify-center items-center text-white font-bold shadow-md">
                  <FaUserAlt className="h-[40px] w-[40px] sm:h-[55px] sm:w-[55px]" />
                </div>
              </div>
            </div>

            {/* Username and Buttons */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-[10vh] mt-[65px] px-5">
              <h1 className="text-2xl font-bold">{username}</h1>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <div className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                  <Copy className="h-5 w-5" />
                </div>
                <div className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                  <Pencil className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="px-5 py-3 flex justify-between items-start gap-2 flex-col sm:flex-row">
              <div className="flex-1">
                <h1 className="font-semibold text-lg">About</h1>
                <p className="text-sm mt-1">
                  I am a pre-final year B.Tech CSE student passionate about web development, with experience in the MERN stack and Java. I enjoy creating dynamic, user-friendly web applications and am eager to learn and grow. Open to internships and collaborative opportunities to apply my skills and gain practical experience. Let's connect and work on impactful projects together!
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <div className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                  <Pencil className="h-[17px] w-[17px]" />
                </div>
              </div>
            </div>

            <hr className="border-black mx-5" />

            {/* Projects Section */}
            <div className="px-5 pt-4">
              <h1 className="font-semibold text-lg mb-4">Project Documents</h1>
<div className="w-full min-h-[200px] flex flex-wrap gap-6 justify-start">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <ProjectCardThree key={index} data={project} className="cursor-pointer" />
                  ))
                ) : (
                  <div className="flex flex-col items-center w-full">
                    <img
                      src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?semt=ais_hybrid&w=740"
                      alt="No Projects"
                      className="h-[200px] object-contain"
                    />
                    <h1 className="font-semibold text-center mt-2">No Projects Found</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkProjectCardSix />
      )}
    </>
  );
}

export default ProfilePage;
