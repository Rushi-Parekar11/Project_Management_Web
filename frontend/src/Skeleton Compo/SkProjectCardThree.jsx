// Components/SidebarSkeleton.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkProjectCardThree() {
  return (
    <div className="min-h-[91vh] w-[17%] fixed top-[8vh] left-0  px-4 pt-2">
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Skeleton circle height={16} width={16} />
            <Skeleton height={16} width={120} />
          </div>
        ))}

        <hr className="my-4" />

        <h3 className="text-md font-medium pl-1"><Skeleton width={100} /></h3>
        <Skeleton circle height={37} width={37} className="ml-1" />

        <h3 className="text-md font-medium pl-1 mt-3"><Skeleton width={100} /></h3>

        <div className="h-[47px] w-[170px] mb-2">
          <Skeleton height={47} />
        </div>

        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton circle height={35} width={35} />
            <div className="flex flex-col">
              <Skeleton width={100} height={14} />
              <Skeleton width={130} height={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkProjectCardThree;
