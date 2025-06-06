import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkProjectCardFive = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full md:w-[85%] px-4 md:px-10 py-6">
        {/* Back Button */}
        <div className="flex items-center gap-2 w-fit mb-4">
          <Skeleton width={20} height={20} circle />
          <Skeleton width={50} height={15} />
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
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
        <div className="mb-4">
          <Skeleton width={100} height={15} />
        </div>

        {/* Description */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton width={25} height={25} />
          <Skeleton width={100} height={18} />
        </div>
        <div className="mb-6">
          <Skeleton count={3} height={10} />
        </div>

        <hr className="my-6" />

        {/* Key Resources */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton width={25} height={25} />
            <Skeleton width={140} height={18} />
          </div>
          <div className="flex flex-wrap gap-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={180} height={50} />
            ))}
          </div>
        </div>

        {/* Text Documentation */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton width={25} height={25} />
            <Skeleton width={160} height={18} />
          </div>
          <div className="space-y-4">
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
      <div className="hidden md:block md:w-[18%] border-l border-gray-300 px-4 py-6">
        {/* Created By */}
        <div className="mb-10">
          <Skeleton width={100} height={20} />
          <div className="flex items-center gap-3 mt-3">
            <Skeleton width={50} height={50} circle />
            <div>
              <Skeleton width={100} height={15} />
              <Skeleton width={120} height={12} />
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div>
          <Skeleton width={100} height={20} />
          <div className="flex flex-col gap-3 mt-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
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
