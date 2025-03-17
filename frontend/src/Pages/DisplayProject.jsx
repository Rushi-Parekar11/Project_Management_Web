import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlignLeft, Copy, ExternalLink } from 'lucide-react';
import { FileChartPie } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import { Plus } from 'lucide-react';
import { FileText } from 'lucide-react';



function DisplayProject() {
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/project/${projectName}`);
        setProjectData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectName]);

  if (!projectData) {
    return <div className="p-8 text-xl">Loading...</div>;
  }

    return (
    <div className="flex">
                    {/* tools div */}
      <div className="border border-2-black w-[12%] min-h-[100vh]" >
      </div>
      
                {/* middel div */}
      <div className="border border-2-black w-[70%] min-h-[100vh]">
        <div className="w-full flex items-center  pl-[15px] mt-[50px] justify-between pr-[80px]">
          <div className="flex items-center gap-3">
            <div className="h-[50px] w-[50px] bg-[#776aff] font-bold text-white text-xl rounded-lg flex justify-center items-center">CR</div>
            <h1 className='text-3xl font-bold'>{projectName}</h1>
          </div>
          <div className='flex items-center gap-3'><ExternalLink /><Copy /></div>
        </div>

        <div className="w-full flex items-center pl-[80px]">
          <h5 className='text-md font-medium'>{projectData.type}</h5>
        </div>

        <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
          <AlignLeft className='h-[25px] w-[25px]' />
          <h1 className='text-lg font-bold'>Description</h1>
        </div>

        <div className="w-full flex items-center pl-[80px] pr-[80px] mt-[5px]">
          <h5 className='text-md font-normal'>{projectData.discription}</h5>
        </div>

        <hr className='w-[90%] ml-[50px] my-[30px] border-green-500' />

        <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
          <FileChartPie className='h-[25px] w-[25px]' />
          <h1 className='text-lg font-bold'>Key Resources</h1>
        </div>

        <div className="flex px-[80px] pt-3 gap-3">
           <label htmlFor="file-upload" className="cursor-pointer"><input type="file" id="file-upload" className="hidden" />
          <div className="flex h-[70px] w-[70px] border-2 rounded-lg border-gray-500 items-center justify-center"><Plus /></div>
          </label>
          
          <div className="flex h-[70px] w-[200px] border-2 rounded-lg border-gray-500 items-center pl-3">
            <div className="text-gray-500 mr-3 "><FileText className='h-[35px] w-[35px]'/></div>
            <div className="flex flex-col justify-start "><h6 className='font-semibold text-gray-800'>Example.pdf</h6><h6 className='text-xs text-gray-600'>PDF | Download</h6></div>
          </div>
        </div>
      



      </div>
  
                {/* users div */}
    <div className="border border-2-black w-[18%] min-h-[100vh] p-4">
  <div className="w-full flex items-center mt-[50px] ml-[10px]">
    <h1 className="text-lg font-semibold text-gray-800">Created by</h1>
  </div>
  <div className="w-full flex items-center mt-[10px] ml-[10px]">
  <div className="h-[50px] w-[50px] bg-[#776aff] font-bold text-white text-xl rounded-full flex justify-center items-center">R</div>
  </div>

  <div className="w-full flex items-center mt-[40px] ml-[10px]">
    <h1 className="text-lg font-semibold text-gray-800">Contributors</h1>
  </div>
  <div className="w-full flex items-center mt-[10px] ml-[10px] gap-[4px]">
  <div className="h-[44px] w-[44px] font-bold text-gray-600 text-xl rounded-full flex justify-center items-center outline outline-[4px] outline-dotted outline-gray-600 mr-[3px]"><UserPlus/></div>
  <div className="h-[50px] w-[50px] bg-[#6a9a23] font-bold text-white text-xl rounded-full flex justify-center items-center">At</div>
  <div className="h-[50px] w-[50px] bg-[#ff991f] font-bold text-white text-xl rounded-full flex justify-center items-center">RP</div>
  </div>


</div>





    </div>
  );
}

export default DisplayProject
