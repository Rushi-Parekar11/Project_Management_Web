import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlignLeft, Copy, ExternalLink, FileChartPie, Play, UserPlus, Plus, FileVideo, FileText, Dot } from 'lucide-react';

function DisplayProject() {
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [message, setMessage] = useState("");
  const iconMap = {
    Dot: Dot,
    AlignLeft: AlignLeft,
    Copy: Copy,
    ExternalLink: ExternalLink,
    FileChartPie: FileChartPie,
    Play: Play,
    UserPlus: UserPlus,
    Plus: Plus,
    FileVideo: FileVideo,
    FileText: FileText
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/documentation/${projectName}`);
        setProjectData(res.data);
        console.log(res.data.docText)
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectName]);

  if (!projectData) {
    return <div className="p-8 text-xl">Loading...</div>;
  }

  const handleCopyClick = () => {
    const link = "https://yourlink.com"; // Replace with the actual link
    navigator.clipboard.writeText(link)
      .then(() => setMessage(" Copied!"))
      .catch(() => setMessage("Failed to Copy"));

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="flex">


      {/* Main Content */}
      <div className="border border-2-black pl-14 pr-5 w-[85%] min-h-[100vh]">
        {/* Header */}
        <div className="w-full flex items-center pl-[15px] mt-[50px] justify-between pr-[80px]">
          <div className="flex items-center gap-3">
            <div className="h-[50px] w-[50px] bg-[#776aff] font-bold text-white text-xl rounded-lg flex justify-center items-center">
              {projectName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold">{projectName}</h1>
          </div>
          <div className="relative flex items-center gap-3 mr-8">
            <ExternalLink className="cursor-pointer" onClick={() => window.open("https://yourlink.com", "_blank")} />
            <Copy className="cursor-pointer" onClick={handleCopyClick} />
            {message && (
              <span className="absolute top-8 left-0 bg-gray-800 text-white text-sm p-1 rounded">
                {message}
              </span>
            )}
          </div>
        </div>

        {/* Type */}
        <div className="w-full flex items-start pl-[80px] flex-col">
          <h5 className="text-md font-medium">{projectData.type}</h5>
          {/* <a href="https://khatabook.com" className="text-md font-medium mt-3 text-blue-800 ">https://khatabook.com/</a> */}
        </div>

        {/* Description */}
        <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
          <AlignLeft className="h-[25px] w-[25px]" />
          <h1 className="text-lg font-bold">Description</h1>
        </div>
        <div className="w-full flex items-center pl-[80px] pr-[80px] mt-[5px]">
          <h5 className="text-md font-normal">{projectData.discription}</h5>
        </div>






        <hr className="w-[90%] ml-[50px] my-[30px] " />

        {/* Key Resources */}
        {/* <div>
        <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
          <FileChartPie className="h-[25px] w-[25px]" />
          <h1 className="text-lg font-bold">Key Resources</h1>
        </div>

        <div className="flex px-[80px] pt-3 gap-3">
          <div className="flex h-[70px] w-fit pr-3 border-2 rounded-lg border-gray-500 items-center pl-2">
            <div className="text-gray-500 mr-3">
              <FileText className="h-[35px] w-[35px]" />
            </div>
            <div className="flex flex-col justify-start">
              <h6 className="font-semibold text-gray-700">Example.pdf</h6>
              <h6 className="text-xs text-gray-600">PDF | Download</h6>
            </div>
          </div>

          <div className="flex h-[70px] w-fit pr-3 border-2 rounded-lg border-gray-500 items-center pl-2">
            <div className="text-gray-500 mr-3">
              <FileText className="h-[35px] w-[35px]" />
            </div>
            <div className="flex flex-col justify-start">
              <h6 className="font-semibold text-gray-700">Prototype.png</h6>
              <h6 className="text-xs text-gray-600">PNG | Download</h6>
            </div>
          </div>

          <div className="flex h-[70px] w-fit border-2 rounded-lg border-gray-500 items-center pl-2 pr-3">
            <div className="text-gray-500 mr-3">
              <FileText className="h-[35px] w-[35px]" />
            </div>
            <div className="flex flex-col justify-start">
              <h6 className="font-semibold text-gray-700">DataFlowDiagram.pdf</h6>
              <h6 className="text-xs text-gray-600">PDF | Download</h6>
            </div>
          </div>

          <div className="flex h-[70px] w-fit border-2 flex flex-col gap-1 rounded-lg border-gray-500 items-center pt-2 pl-2 pr-2">
            <div className="text-gray-500 mr-3">
              <FileVideo  className="h-[30px] w-[30px]" />
            </div>
            <div className="flex flex-col justify-start">
              <h6 className="text-sm font-medium text-gray-500">Work Video.mp4</h6>
            </div>
          </div>

          <div className="flex h-[70px] w-fit border-2 rounded-lg border-gray-500 items-center pl-2 pr-3">
            <div className="text-gray-500 mr-3">
              <FileText className="h-[35px] w-[35px]" />
            </div>
            <div className="flex flex-col justify-start">
              <h6 className="font-semibold text-gray-700">Certificate.pdf</h6>
              <h6 className="text-xs text-gray-600">PDF | Download</h6>
            </div>
          </div>

        </div>
        </div> */}



      {projectData.docText.map((doc, index) => {
  const IconComponent = doc.textnamelogo !== "None" ? iconMap[doc.textnamelogo] : null;

  return (
    <div key={index} className="border-2 border-white relative mb-4">
  <div className="w-full ml-[70px] flex items-center gap-2 pl-[8px] mt-[10px] relative ">
    {IconComponent && (
      <span className="absolute left-[-20px] flex justify-center items-center w-6 h-6">
        <IconComponent className="w-11 h-11" />
      </span>
    )}
    <h1 className="text-lg font-bold">{doc.textname}</h1>
  </div>
  <div className="pl-[80px] pt-1">
    <h2>{doc.textContent}</h2>
  </div>
</div>

  );
})}






      </div>

      {/* Sidebar - Users */}
      <div className="border border-2-black w-[18%] min-h-[100vh] p-4">
        {/* Created By */}
        <div className="w-full flex items-center mt-[50px] ml-[10px]">
          <h1 className="text-lg font-semibold text-gray-800">Created by</h1>
        </div>

        <div className="w-full flex items-center mt-[10px] ml-[10px] gap-3">
          <div className="h-[50px] w-[50px] bg-[#776aff] font-bold text-white text-xl rounded-full flex justify-center items-center">
            {projectData.createdby?.name?.slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div className="text-sm">
            <p className="font-semibold">{projectData.createdby?.name || 'Unknown'}</p>
            <p className="text-xs text-gray-500">{projectData.createdby?.email || 'No email'}</p>
          </div>
        </div>

        {/* Contributors */}
        <div className="w-full flex items-center mt-[40px] ml-[10px]">
          <h1 className="text-lg font-semibold text-gray-800">Contributors</h1>
        </div>
        <div className="w-full flex flex-col justify-start items-center mt-[10px]  gap-[4px] pr-10">

          {projectData?.contributor && projectData.contributor.length > 0 ? (
            projectData.contributor.map((con, index) => (
              <div key={index} className="w-[200px] h-[60px] border-2 border-gray-300 rounded-lg flex pl-2 items-center cursor-pointer hover:shadow-md hover:border-gray-400">
                <div className="h-[40px] w-[40px] bg-[#776aff] font-medium text-white text-sm rounded-lg flex justify-center items-center">
                  {con.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-sm ml-3">
                  <p className="font-semibold text-gray-700">{con.name}</p>
                  <p className="text-xs text-gray-500">{con.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='mr-16'>  <p className="text-gray-500 mr-5">No contributors</p></div>

          )}






        </div>
      </div>
    </div>
  );
}

export default DisplayProject;
