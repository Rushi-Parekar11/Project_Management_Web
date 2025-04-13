import React, { useEffect, useState } from 'react'

function Workmates() {
  const [username,setusername]=useState('User');

  useEffect(()=>{
    setusername(localStorage.getItem('LoggedInUser'))
  },[])


  return (
    <div className='pl-9'>
<h1 className="text-2xl font-semibold">
  Hi <span className="text-[#776aff] font-bold">Username</span>, please create a cluster to view the workments.
</h1>
      <h1 className='text-sm'>No cluster found </h1>
    </div>
  )
}

export default Workmates
