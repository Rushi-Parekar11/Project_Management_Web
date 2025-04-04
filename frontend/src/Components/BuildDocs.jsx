import React, { useState } from 'react'
import {Plus ,Link  } from 'lucide-react';
import TextDocumentModel from './Models/TextDocumentModel';

function BuildDocs() {
  const [textDocModel,settextDocModel]=useState(false);
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

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]" >
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">PDF,JPEG,PNG,GIF</span> 
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]" >
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Excel Sheet</span> 
              </li>

              <li className="flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]">
                <Plus className="h-4 w-4" /><span className="text-sm font-medium">Links</span><Link className='h-3 w-3'/>
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

      {textDocModel && (
       <TextDocumentModel onClose={()=>settextDocModel(false)}/>
      )}
    </div>
  </div>
</div>
    
    </>
  )
}

export default BuildDocs
