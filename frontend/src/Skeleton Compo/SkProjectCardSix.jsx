
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkProjectCardSix = () => {
  return (
    <div className="flex justify-center bg-[#f3f4f6]">
      <div className="min-h-[120vh] w-[75%] rounded-xl mt-5 overflow-hidden bg-white">
        
        {/* Banner */}
        <div className="relative w-full h-[30vh]">
          <Skeleton height="100%" width="100%" />
          <div className="absolute bottom-[-55px] left-[57px] z-10">
            <Skeleton circle width={130} height={130} />
          </div>
        </div>

        {/* User Info */}
        <div className="w-full flex justify-between h-[10vh] mt-[55px] px-4">
          <div className='flex flex-col'>
            <Skeleton width={150} height={20} />
            <Skeleton width={200} height={15} />
          </div>
          <div className="flex gap-2 mt-2">
            <Skeleton circle width={40} height={40} />
            <Skeleton circle width={40} height={40} />
          </div>
        </div>

        {/* About */}
        <div className="px-4 mt-4 flex items-start gap-2">
          <div className="flex-1">
            <Skeleton width={100} height={20} />
            <Skeleton count={3} />
          </div>
          <Skeleton circle width={30} height={30} />
        </div>


        {/* Project Cards */}
        <div className="px-7 mt-4">
          <Skeleton width={180} height={20} />
          <div className="flex flex-wrap gap-8 mt-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="w-[280px] h-[180px] bg-white border rounded-lg shadow p-4">
                <Skeleton height={20} width={`80%`} />
                <Skeleton height={15} width={`60%`} className="mt-2" />
                <Skeleton height={10} width={`100%`} className="mt-4" count={3} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkProjectCardSix;
