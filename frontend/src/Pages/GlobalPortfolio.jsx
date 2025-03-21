import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react';
import ProjectCardTwo from '../Components/ProjectCardTwo';
import { ListFilter } from 'lucide-react';
import { Plus } from 'lucide-react';
import axios from 'axios';

function GlobalPortfolio() {

  const [allproject,setallproject] = useState([]);


  useEffect(()=>{
    const fetchdata = async () =>{
      try {
        const alldata = await axios.get('http://localhost:8081/GlobalPortfolio/projects');
        setallproject(alldata.data)
      console.log(allproject);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  },[])
  return (
    <>
        <div className='min-h-[100vh] w-350  pl-10 pt-10'>
    <div className='flex gap-3'>
    <h1 className='text-3xl font-bold '>Global </h1>
    <h1 className='text-3xl font-bold text-[#776aff]'> Project </h1>
    <h1 className='text-3xl font-bold '>Portfolio</h1>
    </div> 


  <div className='h-18 w-300 flex items-center gap-3 sticky top-[64px]  bg-white mt-9'>
  <ListFilter className='text-[#c4c4c4]'/>
<div className="relative w-[70%]">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  <input type="text" placeholder="Search Project" className="w-[50%] pl-10 pr-4 py-2 border-2 border-[#c4c4c4] rounded-md focus:outline-none focus:ring-1 focus:ring-black"/>
  <button className='px-4 py-2 sm:px-5 sm:py-3 rounded bg-black text-white text-sm hover:bg-gray-900 transition-all'>Search</button>  
  <button className='px-4 py-2 sm:px-5 sm:py-3 ml-6 rounded bg-black text-white text-sm hover:bg-gray-900 transition-all'>Create Add Own Project</button>  
</div> 
 </div>


<h1 className='text-lg font-bold text-[#292a2e] mt-3'>Listed All Projects</h1>

<div className="mt-5 h-82 flex-wrap flex gap-10 pb-5">  

{allproject.map((project)=>(
   <ProjectCardTwo key={project._id} project={project}/>
))}

</div>

    </div>
    </>
  )
}

export default GlobalPortfolio
