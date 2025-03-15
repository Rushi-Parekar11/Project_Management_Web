import React from 'react'
import { Search } from 'lucide-react';
import ProjectCardTwo from '../Components/ProjectCardTwo';
import { ListFilter } from 'lucide-react';
import { Plus } from 'lucide-react';

function GlobalPortfolio() {
  return (
    <>
        <div className='min-h-[100vh] w-350  pl-10 pt-10'>
      <h1 className='text-3xl font-bold '>Global Portfolio</h1>
      <hr className="w-[95%] mt-10 mb-4 border border-[#c4c4c4]" />


  <div className='h-13 w-300 flex items-center gap-3'>
  <ListFilter className='text-[#c4c4c4]'/>
<div className="relative w-[70%]">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  <input type="text" placeholder="Search Project" className="w-full pl-10 pr-4 py-2 border-2 border-[#c4c4c4] rounded-md focus:outline-none focus:ring-1 focus:ring-black"/>
</div>   
 </div>


<h1 className='text-lg font-bold text-[#292a2e] mt-3'>Listed All Projects</h1>

<div className="mt-5 h-82 flex-wrap flex gap-10 pb-5">  
<ProjectCardTwo/>
<ProjectCardTwo/>
<ProjectCardTwo/>
<ProjectCardTwo/>
<ProjectCardTwo/>
<ProjectCardTwo/>
<ProjectCardTwo/>
</div>

    </div>
    </>
  )
}

export default GlobalPortfolio
