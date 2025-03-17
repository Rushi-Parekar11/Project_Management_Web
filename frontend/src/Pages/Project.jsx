import React from 'react'
import { House,ChartPie ,CalendarRange,UserPlus,Tags,UserRoundPlus,CircleDot,ChevronDown  } from 'lucide-react';


function Project() {
  return (
    <>
    <div className="flex">
   {/* side panel */}
   <div className=" min-h-[91vh] w-[17%] fixed top-[8vh] left-0 border-2 border-l-red">

<div className="h-[10vh] flex items-center pl-5 border-b-2 ">
<div className="h-[37px] w-[37px] bg-[#776aff] font-bold text-white text-md rounded-lg flex justify-center items-center">CR</div>
<div className="flex flex-col ml-4 mb-2">
            <h1 className='text-lg font-medium mb-[-2px]'>rushi</h1>
            <h1 className='text-xs font-medium'>rushikeshparekar11@gmail.com</h1>
</div>
</div>

<div className="w-full h-[74vh]">
<ul className='list-none pl-4 pr-2 flex flex-col gap-2 mt-4'>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<House className='h-4 w-4' /><span className="text-sm font-medium">Home</span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<CircleDot  className='h-4 w-4' /><span className="text-sm font-medium">Project Info </span> <ChevronDown className='h-4 w-4'/>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<ChartPie  className='h-4 w-4' /><span className="text-sm font-medium">Statistics </span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<CalendarRange  className='h-4 w-4' /><span className="text-sm font-medium">Calendar </span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<ChartPie  className='h-4 w-4' /><span className="text-sm font-medium">Statistics </span>
</li>

<li className='flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer  transition-all duration-200 hover:bg-[#ebebeb] text-[#333]'>
<Tags  className='h-4 w-4' /><span className="text-sm font-medium">Tip Notes </span>
</li>

<hr className='mt-10'/>

<h3 className='text-md font-medium pl-3'>project CreatedBy</h3>
<div className="h-[37px] w-[37px] bg-[#776aff] ml-3 font-bold text-white text-md rounded-full flex justify-center items-center">CR</div>

<h3 className='text-md font-medium pl-3 mt-5'>Contributor</h3>
<div className="flex">
<div className="h-[33px] w-[33px] font-bold    ml-3 text-gray-500 text-xl rounded-full flex justify-center items-center outline outline-[4px] outline-dotted outline-gray-500 mr-[3px]"><UserPlus className='h-4 w-4'/></div>
<div className="h-[37px] w-[37px] bg-[#f9aaef] ml-1 font-bold text-white text-md rounded-full flex justify-center items-center">CR</div>
<div className="h-[37px] w-[37px] bg-[#0db3c1] ml-1 font-bold text-white text-md rounded-full flex justify-center items-center">AT</div>
<div className="h-[37px] w-[37px] bg-[#ff642e] ml-1 font-bold text-white text-md rounded-full flex justify-center items-center">PR</div>
</div>
</ul>
</div>

<ul className='px-1'>
    <li className='flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer bg-black text-white transition-all duration-200 hover:bg-[#222]'>
      <UserRoundPlus className='h-5 w-5' />
      <span className="text-sm font-medium">Share the Invite</span>
    </li>
  </ul>



</div>



   {/* main content */}
<div className="border-2 border-black min-h-[106vh] w-[83%]  ml-[17%]">
<div className="h-[75px] flex items-center pl-5 border-2 border-black sticky top-[65px]"></div>

</div>






</div>
    </>
  )
}

export default Project
