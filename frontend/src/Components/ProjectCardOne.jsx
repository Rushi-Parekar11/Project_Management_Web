import React from 'react'
import { Ellipsis } from 'lucide-react';
import { Calendar1 } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { LockOpen } from 'lucide-react';
import { ClockAlert } from 'lucide-react';
import { UserRound } from 'lucide-react';
import ProgressBar from './ProgressBar';

function ProjectCardOne() {
  return (
    <>
      <div className='h-[305px] w-[300px] rounded-md shadow-md border-1 border-gray-300'>
<div className="pt-4 pl-4 flex items-center justify-between pr-3">
    <div className="h-11 w-11 bg-[#776aff] font-bold text-white rounded-lg flex justify-center items-center">CR</div>
    <Ellipsis className="text-gray-500" />
</div>
<div className="pl-4"><h1 className='text-lg font-bold text-[#2f3035] mt-2'>CryptoCraft</h1></div>
<div className="pl-4"><h1 className='text-sm font-medium text-gray-700 mb-2'>Web dev</h1></div>
<div className="px-4"><h1 className='text-sm text-gray-600'>CryptoCraft, a crypto lear application where users can create accounts, ... </h1></div>



<div className="mt-5"><ProgressBar percentage={85} /></div>

<div className='px-4 mt-10 flex justify-between'>
    <div className='h-8 w-[90px] bg-[#e7e7e7] flex items-center justify-center text-xs text-gray-700 gap-1'><ClockAlert className='h-4 w-4'/> <h3 className='flex'>3 days ago</h3></div>
    
    <div className="flex items-center space-x-[-12px]">
  <div className="w-8 h-8 rounded-full bg-[#e7e7e7] text-gray-500 flex items-center justify-center text-xs font-bold z-30 border-2 border-white"><UserRound className='h-4 w-4'/></div>
  <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-20 border-2 border-white"><UserRound className='h-4 w-4'/></div>
  <div className="w-8 h-8 rounded-full  bg-[#e7e7e7] text-gray-500  flex items-center justify-center text-xs font-bold z-10"><UserRound className='h-4 w-4'/></div>
</div>


</div>
      </div>
    </>
  )
}

export default ProjectCardOne
