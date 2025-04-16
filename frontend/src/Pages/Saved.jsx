import React, { useState } from 'react';

function Saved() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
      <div className="h-[305px] w-full md:w-[770px] flex items-center justify-center flex-col">
            <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?semt=ais_hybrid&w=740" alt="No projects" className="h-[230px] object-contain" />
            <h1 className='text-xl text-[#7684f1] md:text-2xl font-bold mt-2'>No Projects Saved</h1>
          </div>
      </div>
    </div>
  );
}

export default Saved;