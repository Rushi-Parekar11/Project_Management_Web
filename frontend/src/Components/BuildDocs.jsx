import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextDocumentModel from './Models/TextDocumentModel';
import ImageDocument from './Models/ImageDocument';
import { useEffect, useState } from 'react';
import { AlignLeft, Copy, ExternalLink, FileChartPie, Play, UserPlus, Plus, FileText, Dot, Download, Link } from 'lucide-react';
import { LiaDownloadSolid } from "react-icons/lia";

function BuildDocs() {
  const { projectName } = useParams();

  const [textDocModel, settextDocModel] = useState(false);
  const [ImageModel, setImageDocModel] = useState(false);
  const [projectData, setProjectData] = useState(null);

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
        console.log(res.data)
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
    <>
      <div className="h-[80vh] w-full border-2 border-black">
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

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]" >
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Excel Sheet</span>
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

          <div className="w-4/5 h-full border-2 border-black">

              {/* preview Content START*/}
            {/* <div className="flex">
              <div className="border border-2-black pl-14 pr-5 w-[100%] min-h-[100vh]">
                <div className="w-full flex items-center pl-[15px] mt-[50px] justify-between pr-[80px]">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] bg-[#776aff] font-bold text-white text-xl rounded-lg flex justify-center items-center">
                      {projectName.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-3xl font-bold">{projectName}</h1>
                  </div>
                  <div className="relative flex items-center gap-4 mr-8">
                    <ExternalLink className="cursor-pointer" onClick={() => window.open("https://yourlink.com", "_blank")} />
                    <Copy className="cursor-pointer"  />
                    <Download className="cursor-pointer"/>
                  </div>
                </div>

                <div className="w-full flex items-start pl-[80px] flex-col">
                  <h5 className="text-md font-medium">{projectData.type}</h5>
                  <a href="https://khatabook.com" className="text-md font-medium mt-3 text-blue-800 ">https://khatabook.com/</a>
                </div>

                <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
                  <AlignLeft className="h-[25px] w-[25px]" />
                  <h1 className="text-lg font-bold">Description</h1>
                </div>
                <div className="w-full flex items-center pl-[80px] pr-[80px] mt-[5px]">
                  <h5 className="text-md font-normal">{projectData.discription}</h5>
                </div>

                <hr className="w-[90%] ml-[50px] my-[30px] " />

                <div>
                  <div className="w-full flex items-center gap-2 pl-[46px] mt-[30px]">
                    <FileChartPie className="h-[25px] w-[25px]" />
                    <h1 className="text-lg font-bold">Key Resources</h1>
                  </div>

                  <div className="flex px-[80px] pt-3 gap-3">

                    <div className="flex h-[50px] w-fit min-w-[150px] border-2 border-gray-700 rounded-lg items-center pl-2 pr-3 cursor-pointer group transition-all duration-300">

                      <div className="text-gray-800 mr-3">
                        <FileText className="h-[23px] w-[23px]" />
                      </div>


                      <div className="flex flex-col justify-start">
                        <h6 className="font-semibold text-gray-800 text-[15px]">Example.pdf</h6>
                        <h6 className="text-xs text-gray-600">PDF | Download</h6>
                      </div>


                      <div className="ml-2 opacity-0 w-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <LiaDownloadSolid className="h-7 w-7 text-gray-800" />
                      </div>
                    </div>

                    <div className="flex h-[50px] w-fit min-w-[150px] border-2 border-gray-700 rounded-lg items-center pl-2 pr-3 cursor-pointer group transition-all duration-300">


                      <div className="text-gray-800 mr-3">
                        <FileText className="h-[23px] w-[23px]" />
                      </div>


                      <div className="flex flex-col justify-start">
                        <h6 className="font-semibold text-gray-800 text-[15px]">Example.pdf</h6>
                        <h6 className="text-xs text-gray-600">PDF | Download</h6>
                      </div>


                      <div className="ml-2 opacity-0 w-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <LiaDownloadSolid className="h-7 w-7 text-gray-800" />
                      </div>
                    </div>

                    <div className="flex h-[50px] w-fit min-w-[150px] border-2 border-gray-700 rounded-lg items-center pl-2 pr-3 cursor-pointer group transition-all duration-300">

                      <div className="text-gray-800 mr-3">
                        <FileText className="h-[23px] w-[23px]" />
                      </div>

                      <div className="flex flex-col justify-start">
                        <h6 className="font-semibold text-gray-800 text-[15px]">Example.pdf</h6>
                        <h6 className="text-xs text-gray-600">PDF | Download</h6>
                      </div>


                      <div className="ml-2 opacity-0 w-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <LiaDownloadSolid className="h-7 w-7 text-gray-800" />
                      </div>
                    </div>

                  </div>
                </div>



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
            </div>   */}
            {/* preview Content END */}


            {textDocModel && (
              <TextDocumentModel onClose={() => settextDocModel(false)} />
            )}

            {ImageModel && (
              <ImageDocument onClose={() => setImageDocModel(false)} projectName={projectName}/>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default BuildDocs
