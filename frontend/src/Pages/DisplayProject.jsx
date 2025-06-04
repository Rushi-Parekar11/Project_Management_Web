import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  AlignLeft, Copy, ExternalLink, FileChartPie, Play,
  UserPlus, Plus, FileVideo, FileText, Dot, Download, ArrowLeft
} from 'lucide-react';
import { LiaDownloadSolid } from 'react-icons/lia';
import ImageSlider from '../Components/ImageSlider';
import SkProjectCardFive from '../Skeleton Compo/SkProjectCardFive';
import html2canvas from 'html2canvas';
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
        const res = await axios.get(`${host}documentation/${projectName}`);
        setProjectData(res.data);
        setFiles(res.data.docFile || []);
        setImageLength(res.data.docImage?.length || 0);
      } catch (err) {
        console.error('Error fetching project:', err);
      }
    };

    fetchData();
  }, [projectName]);

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
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this device/browser.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage('Copied!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setMessage('Failed to Copy');
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

  if (!projectData) return <SkProjectCardFive />;

  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full md:w-[85%] min-h-[100vh] pb-14 md:pl-8 pr-3" ref={printRef}>
        {/* Back Button */}
        <div
          className="flex items-center gap-1.5 p-2 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-[75px] transition-all mt-4 duration-200 rounded"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xs font-medium">Back</span>
        </div>

        {/* Header */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center pl-3 mt-2 justify-between sm:pr-16 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#776aff] font-bold text-white text-lg rounded-lg flex justify-center items-center ml-2">
              {projectName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-xl font-bold">{projectName}</h1>
          </div>
          <div className="relative flex items-center gap-3 pl-2">
            <ExternalLink className="cursor-pointer h-4 w-4" onClick={handleShare} />
            <Copy className="cursor-pointer h-4 w-4" onClick={handleCopy} />
            <Download className="cursor-pointer h-4 w-4" onClick={handleDownload} />
            {message && (
              <span className="absolute top-7 left-0 bg-gray-800 text-white text-xs p-1 rounded">
                {message}
              </span>
            )}
          </div>
        </div>

        {/* Type */}
        <div className="pl-6 mt-1">
          <h5 className="text-xs font-medium">{projectData.type}</h5>
        </div>

        {/* Description */}
        <div className="w-full flex items-center gap-1.5 pl-3 mt-4">
          <AlignLeft className="h-4 w-4" />
          <h1 className="text-sm font-semibold">Description</h1>
        </div>
        <div className="pl-6 pr-6 mt-1">
          <h5 className="text-xs font-normal">{projectData.discription}</h5>
        </div>

        <hr className="w-[90%] ml-4 my-6" />

        {/* Key Resources */}
        <div>
          <div className="w-full flex items-center gap-1.5 pl-3 mt-4">
            <FileChartPie className="h-4 w-4" />
            <h1 className="text-sm font-semibold">Key Resources</h1>
          </div>

          {files.length > 0 || imageLength > 0 ? (
            <>
              {files.length > 0 && (
                <div className="flex px-6 pt-2 mt-1 gap-2 flex-wrap">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex h-10 w-fit min-w-[140px] border-2 border-gray-700 rounded-lg items-center pl-1.5 pr-2 cursor-pointer group"
                    >
                      <FileText className="text-gray-800 mr-2 h-5 w-5" />
                      <div className="flex flex-col justify-start">
                        <h6 className="font-semibold text-gray-800 text-[13px]">
                          {file.fileText.slice(0, 11)}..
                        </h6>
                        <h6 className="text-xs text-gray-600">PDF | Download</h6>
                      </div>
                      <div className="ml-1 opacity-0 w-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <LiaDownloadSolid
                          className="h-6 w-6 text-gray-800"
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
            <div className="text-gray-500 pl-6 pt-2 text-xs">No file & Image Data.</div>
          )}
        </div>

        {/* Text Documentation */}
        <div>
          <div className="w-full flex items-center gap-1.5 pl-3 mt-4">
            <FileChartPie className="h-4 w-4" />
            <h1 className="text-sm font-semibold">Text Documentation</h1>
          </div>

          {projectData.docText?.length > 0 ? (
            projectData.docText.map((doc, index) => {
              const IconComponent = doc.textnamelogo !== 'None' ? iconMap[doc.textnamelogo] : null;
              return (
                <div key={index} className="border-2 border-white relative mb-3 pr-4">
                  <div className="w-full ml-16 flex items-center gap-1.5 pl-2 mt-2 relative">
                    {IconComponent && (
                      <span className="absolute left-[-16px] flex justify-center items-center w-5 h-5">
                        <IconComponent className="w-8 h-8" />
                      </span>
                    )}
                    <h1 className="text-sm font-semibold">{doc.textname}</h1>
                  </div>
                  <div className="pl-6 pr-6 pt-1 text-[13px]">
                    <h2>{doc.textContent}</h2>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 pl-6 pt-2 text-xs">No text documentation available.</div>
          )}
        </div>
      </div>

      {/* Sidebar - Hidden on small screens */}
      <div className="hidden md:block w-[18%] min-h-[100vh] p-3 border-l border-gray-300">
        {/* Created By */}
        <div className="mt-12 ml-2">
          <h1 className="text-base font-semibold text-gray-800">Created by</h1>
          <div className="flex items-center mt-2 gap-2">
            <div className="h-10 w-10 bg-[#776aff] font-bold text-white text-lg rounded-full flex justify-center items-center">
              {projectData.createdby?.name?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="text-xs">
              <p className="font-semibold">{projectData.createdby?.name || 'Unknown'}</p>
              <p className="text-[10px] text-gray-500">{projectData.createdby?.email || 'No email'}</p>
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div className="mt-10 ml-2">
          <h1 className="text-base font-semibold text-gray-800">Contributors</h1>
          <div className="flex flex-col gap-1.5 mt-2">
            {projectData?.contributor && projectData.contributor.length > 0 ? (
              projectData.contributor.map((con, index) => (
                <div
                  key={index}
                  className="w-[190px] h-[55px] border-2 border-gray-300 rounded-lg flex items-center pl-2 cursor-pointer hover:shadow-md hover:border-gray-400"
                >
                  <div className="h-9 w-9 bg-[#776aff] font-medium text-white text-sm rounded-lg flex justify-center items-center">
                    {con.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-2 text-xs">
                    <p className="font-semibold text-gray-700">{con.name}</p>
                    <p className="text-[10px] text-gray-500">{con.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs">No contributors</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayProject;
