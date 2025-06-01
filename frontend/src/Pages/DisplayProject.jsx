import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  AlignLeft, Copy, ExternalLink, FileChartPie, Play,
  UserPlus, Plus, FileVideo, FileText, Dot, Download, ArrowLeft
} from 'lucide-react';
import { LiaDownloadSolid } from 'react-icons/lia';
import ImageSlider from '../Components/ImageSlider';
import SkProjectCardFive from '../Skeleton Compo/SkProjectCardFive';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { host } from '../api';


function DisplayProject() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [imageLength, setImageLength] = useState(0);
  const printRef = useRef();


  const iconMap = {
    Dot,
    AlignLeft,
    Copy,
    ExternalLink,
    FileChartPie,
    Play,
    UserPlus,
    Plus,
    FileVideo,
    FileText,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${host}/documentation/${projectName}`);
        setProjectData(res.data);
        setFiles(res.data.docFile || []);
        setImageLength(res.data.docImage?.length || 0);
      } catch (err) {
        console.error('Error fetching project:', err);
      }
    };

    fetchData();
  }, [projectName]);

  if (!projectData) return <SkProjectCardFive/>;




  const handleBack = () => {
    navigate(-1);
  };


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          text: 'Have a look at this cool page:',
          url: window.location.href,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this device/browser.');
    }
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      .then(() => setMessage('Copied!'))
      .catch(() => setMessage('Failed to Copy'));
    setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  const handleDownload = async () => {
    if (!printRef.current) return;
    const canvas = await html2canvas(printRef.current);
    const data = canvas.toDataURL('image/png');
  
    const link = document.createElement('a');
    link.href = data;
    link.download = `${projectName}.png`;
    link.click();
  };
  
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="pl-14 pr-5 w-[85%] min-h-[100vh] pb-[70px]" ref={printRef} >
        {/* Back Button */}
        <div
          className="flex items-center gap-2 p-4 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-[90px] transition-all mt-6 duration-200 rounded"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back</span>
        </div>

        {/* Header */}
        <div className="w-full flex items-center pl-[15px] mt-[10px] justify-between pr-[80px]">
          <div className="flex items-center gap-3">
            <div className="h-[40px] w-[40px] bg-[#776aff] font-bold text-white text-xl rounded-lg flex justify-center items-center ml-3">
              {projectName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold">{projectName}</h1>
          </div>
          <div className="relative flex items-center gap-4">
            <ExternalLink className="cursor-pointer h-5 w-5"  onClick={handleShare} />
            <Copy className="cursor-pointer h-5 w-5"       onClick={handleCopy} />
            <Download className="cursor-pointer h-5 w-5" onClick={handleDownload} />
            {message && (
              <span className="absolute top-8 left-0 bg-gray-800 text-white text-sm p-1 rounded">
                {message}
              </span>
            )}
          </div>
        </div>

        {/* Type */}
        <div className="pl-[80px] mt-2">
          <h5 className="text-sm font-medium">{projectData.type}</h5>
        </div>

        {/* Description */}
        <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
          <AlignLeft className="h-[25px] w-[25px]" />
          <h1 className="text-md font-bold">Description</h1>
        </div>
        <div className="pl-[80px] pr-[80px] mt-[5px]">
          <h5 className="text-sm font-normal">{projectData.discription}</h5>
        </div>

        <hr className="w-[90%] ml-[50px] my-[30px]" />

        {/* Key Resources */}
        <div>
          <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
            <FileChartPie className="h-[25px] w-[25px]" />
            <h1 className="text-md font-bold">Key Resources</h1>
          </div>

          {files.length > 0 || imageLength > 0 ? (
            <>
              {files.length > 0 && (
                <div className="flex px-[80px] pt-3 mt-2 gap-3 flex-wrap">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex h-[50px] w-fit min-w-[150px] border-2 border-gray-700 rounded-lg items-center pl-2 pr-3 cursor-pointer group"
                    >
                      <FileText className="text-gray-800 mr-3 h-[23px] w-[23px]" />
                      <div className="flex flex-col justify-start">
                        <h6 className="font-semibold text-gray-800 text-[15px]">
                          {file.fileText.slice(0, 11)}..
                        </h6>
                        <h6 className="text-xs text-gray-600">PDF | Download</h6>
                      </div>
                      <div className="ml-2 opacity-0 w-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <LiaDownloadSolid
                          className="h-7 w-7 text-gray-800"
                          onClick={() => handleDownload(file.fileUrl, `${file.fileText || 'file'}.pdf`)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {imageLength > 0 && <ImageSlider projectData={projectData} />}
            </>
          ) : (
            <div className="text-gray-500 pl-[80px] pt-4 text-sm">No file & Image Data.</div>
          )}
        </div>

        {/* Text Documentation */}
        <div>
          <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
            <FileChartPie className="h-[25px] w-[25px]" />
            <h1 className="text-md font-bold">Text Documentation</h1>
          </div>

          {projectData.docText?.length > 0 ? (
            projectData.docText.map((doc, index) => {
              const IconComponent = doc.textnamelogo !== 'None' ? iconMap[doc.textnamelogo] : null;
              return (
                <div key={index} className="border-2 border-white relative mb-4 pr-[18px]">
                  <div className="w-full ml-[70px] flex items-center gap-2 pl-[8px] mt-[10px] relative">
                    {IconComponent && (
                      <span className="absolute left-[-20px] flex justify-center items-center w-6 h-6">
                        <IconComponent className="w-11 h-11" />
                      </span>
                    )}
                    <h1 className="text-md font-bold">{doc.textname}</h1>
                  </div>
                  <div className="pl-[80px] pr-[70px] pt-1 text-[15px]">
                    <h2>{doc.textContent}</h2>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 pl-[80px] pt-4 text-sm">No text documentation available.</div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-[18%] min-h-[100vh] p-4 border-l border-gray-300">
        {/* Created By */}
        <div className="mt-[50px] ml-[10px]">
          <h1 className="text-lg font-semibold text-gray-800">Created by</h1>
          <div className="flex items-center mt-[10px] gap-3">
            <div className="h-[50px] w-[50px] bg-[#776aff] font-bold text-white text-xl rounded-full flex justify-center items-center">
              {projectData.createdby?.name?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="text-sm">
              <p className="font-semibold">{projectData.createdby?.name || 'Unknown'}</p>
              <p className="text-xs text-gray-500">{projectData.createdby?.email || 'No email'}</p>
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div className="mt-[40px] ml-[10px]">
          <h1 className="text-lg font-semibold text-gray-800">Contributors</h1>
          <div className="flex flex-col gap-2 mt-3">
            {projectData?.contributor && projectData.contributor.length > 0 ? (
              projectData.contributor.map((con, index) => (
                <div key={index} className="w-[200px] h-[60px] border-2 border-gray-300 rounded-lg flex items-center pl-2 cursor-pointer hover:shadow-md hover:border-gray-400">
                  <div className="h-[40px] w-[40px] bg-[#776aff] font-medium text-white text-sm rounded-lg flex justify-center items-center">
                    {con.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="font-semibold text-gray-700">{con.name}</p>
                    <p className="text-xs text-gray-500">{con.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No contributors</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayProject;
