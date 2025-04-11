// Components/SkeletonCard.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCard() {
  return (
    <div className="h-[300px] w-[300px] rounded-md shadow-md border-2 border-[#dddedd] p-4">
      <div className="flex justify-between items-center mb-3">
        <Skeleton circle height={44} width={44} />
        <Skeleton height={20} width={20} />
      </div>
      <Skeleton height={20} width={150} className="mb-2" />
      <Skeleton height={16} width={80} className="mb-2" />
      <Skeleton count={2} height={14} className="mb-1" />
      <Skeleton height={8} width={`100%`} className="mt-4 mb-2" />
      <Skeleton height={8} width={`80%`} />


    </div>
  );
}

export default SkeletonCard;
