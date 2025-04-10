import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';

function PreviewImageSlider({ projectData }) {
    const [images] = useState(projectData?.docImage || []);
    const carouselRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    const startDragging = (e) => {
        isDown = true;
        carouselRef.current.classList.add('cursor-grabbing');
        startX = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft = carouselRef.current.scrollLeft;
    };

    const stopDragging = () => {
        isDown = false;
        carouselRef.current.classList.remove('cursor-grabbing');
    };

    const onDrag = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    
    
    return (
        <div className="w-full flex justify-center ">
            <div
                className="w-[800px] items-center bg-[#f3f4f6] h-[80px] mt-3  mx-11 mb-1 border-2 border-gray-300 overflow-x-auto whitespace-nowrap flex gap-1 rounded-md shadow-md cursor-grab px-3 select-none "
                ref={carouselRef}
                onMouseDown={startDragging}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
                onMouseMove={onDrag}
            >
                {images.map((image, index) => (
                    <div
  key={index}
  className="w-[70px] h-[70px] border-2 border-gray-200 flex-shrink-0 flex flex-col items-center justify-between bg-white rounded-md shadow-sm select-none"
>
  <img
    src={image.imageUrl}
    alt={`Slide ${index}`}
    draggable={false}
    className="w-full h-[50px] object-contain rounded-sm mt-1"
  />
  <div className="text-center flex items-center justify-between w-full px-3 mb-1 mt-1">
    <p className="text-[4px] font-medium truncate text-[11px] text-gray-500">{image.ImageText}</p>
    <button
      className="text-blue-600 hover:text-blue-800"
    >
      <Download size={8} className='text-gray-700 hover:text-blue-500' />
    </button>
  </div>
</div>

                ))}
            </div>
        </div>
    );
}

export default PreviewImageSlider;
