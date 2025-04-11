import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkProjectCardFour = () => {
  return (
    <div className="h-[80vh] w-full ">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-1/5 h-full border-2 border-[#ededed] p-3">
          <Skeleton height={40} width={'80%'} className="mb-4 mx-auto" />
          <div className="flex flex-col gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} height={35} className="rounded-sm" />
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-4/5 h-full  flex flex-col items-center">
          {/* Top Toggle */}
          <Skeleton height={40} width={'180px'} className="mb-4 mx-auto" />

          {/* Preview Content */}
          <div className="border-2 border-[#ededed] w-[60%] min-h-[65vh] pb-[6px] p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Skeleton circle width={22} height={22} />
                <Skeleton width={100} height={15} />
              </div>
              <Skeleton width={60} height={10} />
            </div>

            {/* Type */}
            <Skeleton width={80} height={10} className="ml-6 mb-4" />

            {/* Description */}
            <Skeleton width={100} height={12} className="ml-6 mb-1" />
            <Skeleton count={2} height={10} className="ml-6 mb-4" />

            {/* Key Resources */}
            <Skeleton width={100} height={12} className="ml-6 mb-2" />
            <div className="flex gap-2 flex-wrap ml-6 mb-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} width={60} height={20} />
              ))}
            </div>

            {/* Text Documentation */}
            <Skeleton width={130} height={12} className="ml-6 mb-2" />
            <div className="flex flex-col gap-2 ml-6">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <Skeleton width={100} height={10} />
                  <Skeleton count={2} width={`80%`} height={8} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkProjectCardFour
