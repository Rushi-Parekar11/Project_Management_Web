import React from 'react'
import { LayoutPanelLeft } from 'lucide-react';
import { Star } from 'lucide-react';
import { Users } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { CalendarRange } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
import { ListFilterPlus } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom'
import YourProject from './YourProject';


function YourWork() {
  return (
    <>
    <div className='flex'>
    <div className="h-[92vh] w-[15%] border-r border-[#dddedd] flex flex-col justify-between sticky top-15">
    <ul className='list-none pl-4 flex flex-col gap-3 mt-5'>
      <li className='flex justify-start items-center gap-2 w-56 h-9 rounded-sm pl-2 cursor-pointer bg-[#e2e2e2]'><LayoutPanelLeft className='h-4 w-4 '/> Your Project </li>
      <li className='flex justify-start items-center gap-2 w-56 h-9 rounded-sm pl-2 cursor-pointer hover:bg-[#d2dee9]'><Star className='h-4 w-4 '/> Saved</li>
      <li className='flex justify-start items-center gap-2 w-56 h-9 rounded-sm pl-2 cursor-pointer hover:bg-[#d2dee9]'><Users className='h-4 w-4 '/> Workmates</li>
      <li className='flex justify-start items-center gap-2 w-56 h-9 rounded-sm pl-2 cursor-pointer hover:bg-[#d2dee9]'><LayoutGrid className='h-4 w-4 '/>Global Portfolio</li>
      <li className='flex justify-start items-center gap-2 w-56 h-9 rounded-sm pl-2 cursor-pointer hover:bg-[#d2dee9]'><CalendarRange className='h-4 w-4 '/> Calendar</li>
      <li className='flex justify-start items-center gap-2 w-56 h-9 rounded-sm pl-2 cursor-pointer hover:bg-[#d2dee9]'><ListFilterPlus className='h-4 w-4 '/> Filters</li>
    </ul>  
<ul>
<li className='flex justify-center items-center gap-2 w-62.5 h-13 rounded-sm  cursor-pointer bg-black text-white ml-0.5'><UserRoundPlus className='h-5 w-5 '/> Share the Invite</li>
</ul>
     </div>


     <div className="w-[85%] h-[140vh] border border-red-600">
     
     </div>

    </div>
      
    </>
  )
}

export default YourWork
