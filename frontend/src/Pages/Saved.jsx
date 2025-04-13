import React, { useState } from 'react';

function Saved() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1 className='ml-[400px] mt-11 font-semibold text-2xl'>No projects saved</h1>


    </div>
  );
}

export default Saved;
