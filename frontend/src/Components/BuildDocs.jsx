import React from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TextDocumentModel from './Models/TextDocumentModel';
import ImageDocument from './Models/ImageDocument';
import FileDocument from './Models/FileDocument';
import { useEffect, useState } from 'react';
import { AlignLeft, Copy, ExternalLink, Eye, FileChartPie, Play, UserPlus, Plus, FileText, Dot, Download, Link } from 'lucide-react';
import { LiaDownloadSolid } from "react-icons/lia";
import PreviewImageSlider from './PreviewImageSlider';
import SkProjectCardFour from '../Skeleton Compo/SkProjectCardFour';



function BuildDocs() {
  const { projectName } = useParams();

  const [textDocModel, settextDocModel] = useState(false);
  const [ImageModel, setImageDocModel] = useState(false);
  const [FileModel, setFileDocModel] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [imageLength, setImageLength] = useState(0);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  

  const iconMap = {
    Dot: Dot,
    AlignLeft: AlignLeft,
    Copy: Copy,
    ExternalLink: ExternalLink,
    FileChartPie: FileChartPie,
    Play: Play,
    UserPlus: UserPlus,
    Plus: Plus,
    FileText: FileText
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/project/${projectName}`);
        setProjectData(res.data);
        setFiles(res.data.docFile || []);
        setImageLength(res.data.docImage?.length || 0);
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectName]);

  if (!projectData) {
    return <SkProjectCardFour/>;
  }

  const handleCopyClick = () => {
    const link = "https://yourlink.com"; // Replace this with actual dynamic link
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Copied!'))
      .catch(() => setMessage('Failed to Copy'));
    setTimeout(() => setMessage(''), 2000);
  };




  return (
    <>

      <div className="h-[85vh] w-full ">
        <div className="flex h-full">
          <div className="w-1/5 h-full border-2 border-black">

            <li className="flex items-center justify-center  w-full h-10 pl-3 pr-2 cursor-pointer  transition-all duration-200 bg-black text-white">
              <span className="text-md font-medium">Attachments</span>
            </li>


            <ul className="list-none pl-4 pr-2 flex flex-col gap-2 mt-4">
              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]"
                onClick={() => settextDocModel(true)}
              >
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Text Documentation</span>
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]"
                onClick={() => setImageDocModel(true)}
              >
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Images (JPEG,JPG,PNG,GIF)</span>
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]"
                onClick={() => setFileDocModel(true)} >
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">PDFs and other raw files</span>
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Links</span><Link className='h-3 w-3' />
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Audio</span>
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Video</span>
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Chart</span>
              </li>

            </ul>
          </div>

          <div className="w-4/5 h-full flex flex-col  items-center bg-[#f3f4f6]">

            {/* Opened Section */}
            <div className="flex h-[40px] w-[200px] border border-black rounded-md overflow-hidden my-3 bg-white">
              <div className="flex items-center gap-1 px-3 bg-gray-100 w-1/2 text-sm font-medium text-black">
                <Eye className="w-4 h-4" />
                preview
              </div>
              <div className="w-[1px] bg-black" />
              <button
              onClick={()=>navigate(`/documentation/${projectName}`)}
                className="w-1/2 text-sm font-semibold text-blue-600 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-1 px-2"
              >
              View  Real
              </button>

            </div>



            {/* preview Content START*/}
            <div className="border-[1px] bg-white border-gray-500 w-[60%] min-h-[60vh] pb-[6px] overflow-hidden">
              {/* Header */}
              <div className="w-full flex items-center pl-[7px] mt-[20px] justify-between pr-[40px]">
                <div className="flex items-center gap-3">
                  <div className="h-[22px] w-[22px] bg-[#776aff] font-bold text-white text-sm rounded-md flex justify-center items-center ml-3">
                    {projectName.charAt(0).toUpperCase()}
                  </div>
                  <h1 className="text-sm font-bold">{projectName}</h1>
                </div>
                <div className="relative flex items-center gap-2">
                  <ExternalLink className="cursor-pointer h-3 w-3" />
                  <Copy className="cursor-pointer h-3 w-3" />
                  <Download className="cursor-pointer h-3 w-3"/>
                  {message && (
                    <span className="absolute top-8 left-0 bg-gray-800 text-white text-sm p-1 rounded">
                      {message}
                    </span>
                  )}
                </div>
              </div>

              {/* Type */}
              <div className="pl-[54px] mt-0">
                <h5 className="text-[10px] font-medium">{projectData.type}</h5>
              </div>

              {/* Description */}
              <div className="w-full flex items-center gap-1 pl-[36px] mt-[10px]">
                <AlignLeft className="h-[12px] w-[12px]" />
                <h1 className="text-[9px] font-bold">Description</h1>
              </div>
              <div className="pl-[54px] pr-[50px] mt-[5px]">
                <h5 className="text-[7px] font-normal">{projectData.discription}</h5>
              </div>

              <hr className="w-[80%] ml-[50px] my-[15px]" />

              {/* Key Resources */}
              <div>
                <div className="w-full flex items-center gap-1 pl-[36px] mt-[8px]">
                  <FileChartPie className="h-[12px] w-[12px]" />
                  <h1 className="text-[9px] font-bold">Key Resources</h1>
                </div>

                {files.length > 0 || imageLength > 0 ? (
                  <>
                    {files.length > 0 && (
                      <div className="flex px-[50px] pt-1 mt-0 gap-3 flex-wrap ">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex h-[20px] w-fit min-w-[55px] border-[1px] border-gray-600 rounded-[3px] items-center pl-1 pr-2 cursor-pointer group"
                          >
                            <FileText className="text-gray-800 mr-1 h-[10px] w-[10px]" />
                            <div className="flex flex-col justify-start">
                              <h6 className="font-semibold text-gray-800 text-[7px]">
                                {file.fileText.slice(0, 11)}..
                              </h6>
                              <h6 className="text-[5px] text-gray-600">PDF | Download</h6>
                            </div>
                    
                          </div>
                        ))}
                      </div>
                    )}

                    {imageLength > 0 && <PreviewImageSlider projectData={projectData} />}
                  </>
                ) : (
                  <div className="text-gray-500 pl-[53px] pt-2 text-[8px]">No file & Image Data.</div>

                )}
              </div>

              {/* Text Documentation */}
              <div>
                <div className="w-full flex items-center gap-1 pl-[36px] mt-[10px]">
                  <FileChartPie className="h-[12px] w-[12px]" />
                  <h1 className="text-[9px] font-bold">Text Documentation</h1>
                </div>

                {projectData.docText?.length > 0 ? (
                  projectData.docText.map((doc, index) => {
                    const IconComponent = doc.textnamelogo !== 'None' ? iconMap[doc.textnamelogo] : null;
                    return (
                      <div key={index} className="border-2 border-white relative mb-1 pr-[18px]">
                        <div className="w-full ml-[50px] flex items-center gap-2 pl-[5px] mt-[6px] relative">
                          {IconComponent && (
                            <span className="absolute left-[-20px] flex justify-center items-center w-6 h-6">
                              <IconComponent className="w-7 h-17" />
                            </span>
                          )}
                          <h1 className="text-[8px] font-bold">{doc.textname}</h1>
                        </div>
                        <div className="pl-[55px] pr-[30px] pt-1 text-[7px]">
                          <h2>{doc.textContent}</h2>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-500 pl-[55px] pt-2 text-[8px]">No text documentation available.</div>
                )}
              </div>
            </div>
            {/* preview Content END */}
            <p className='text-md text-blue-400 hover:text-blue-800 my-1 cursor-pointer' onClick={()=>navigate(`/documentation/${projectName}`)}>Click to view All ...</p>

            {textDocModel && (
              <TextDocumentModel onClose={() => settextDocModel(false)} />
            )}

            {ImageModel && (
              <ImageDocument onClose={() => setImageDocModel(false)} projectName={projectName} />
            )}

            {FileModel && (
              <FileDocument onClose={() => setFileDocModel(false)} projectName={projectName} />
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default BuildDocs
