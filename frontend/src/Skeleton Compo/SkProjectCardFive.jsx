import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkProjectCardFive = () => {
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="pl-14 pr-5 w-[85%] min-h-[100vh]">
        {/* Back Button */}
        <div className="flex items-center gap-2 p-4 w-[90px] mt-6">
          <Skeleton width={20} height={20} circle />
          <Skeleton width={50} height={15} />
        </div>

        {/* Header */}
        <div className="w-full flex items-center justify-between pl-[15px] pr-[80px] mt-[10px]">
          <div className="flex items-center gap-3">
            <Skeleton width={40} height={40} circle />
            <Skeleton width={120} height={20} />
          </div>
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={20} height={20} circle />
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="pl-[80px] mt-2">
          <Skeleton width={100} height={15} />
        </div>

        {/* Description */}
        <div className="flex items-center gap-2 pl-[46px] mt-[30px]">
          <Skeleton width={25} height={25} />
          <Skeleton width={100} height={18} />
        </div>
        <div className="pl-[80px] pr-[80px] mt-[5px]">
          <Skeleton count={3} height={10} />
        </div>

        <hr className="w-[90%] ml-[50px] my-[30px]" />

        {/* Key Resources */}
        <div className="pl-[46px] mt-[30px]">
          <div className="flex items-center gap-2">
            <Skeleton width={25} height={25} />
            <Skeleton width={140} height={18} />
          </div>
          <div className="flex px-[80px] pt-3 mt-2 gap-3 flex-wrap">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={180} height={50} />
            ))}
          </div>
        </div>

        {/* Text Documentation */}
        <div className="pl-[46px] mt-[30px]">
          <div className="flex items-center gap-2">
            <Skeleton width={25} height={25} />
            <Skeleton width={160} height={18} />
          </div>
          <div className="mt-3 space-y-4 pl-[80px] pr-[70px]">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton width={120} height={18} />
                <Skeleton count={2} height={10} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-[18%] min-h-[100vh] p-4 border-l border-gray-300">
        {/* Created By */}
        <div className="mt-[50px] ml-[10px]">
          <Skeleton width={100} height={20} />
          <div className="flex items-center mt-[10px] gap-3">
            <Skeleton width={50} height={50} circle />
            <div className="text-sm">
              <Skeleton width={100} height={15} />
              <Skeleton width={120} height={12} />
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div className="mt-[40px] ml-[10px]">
          <Skeleton width={100} height={20} />
          <div className="flex flex-col gap-2 mt-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Skeleton width={40} height={40} circle />
                <div>
                  <Skeleton width={80} height={15} />
                  <Skeleton width={100} height={10} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkProjectCardFive;
