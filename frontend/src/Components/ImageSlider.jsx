import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';

function ImageSlider({ projectData }) {
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

    const downloadImage = async (src) => {
        try {
            const response = await fetch(src, { mode: 'cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image.jpg'; // You can customize this
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };
    
    

    return (
        <div className="w-full flex justify-center">
            <div
                className="w-[1030px] bg-[#f3f4f6] h-[207px] mt-3 pt-1 ml-3 mb-1 border-2 border-gray-200 overflow-x-auto whitespace-nowrap flex gap-2 rounded-lg shadow-lg cursor-grab px-2 select-none "
                ref={carouselRef}
                onMouseDown={startDragging}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
                onMouseMove={onDrag}
            >
                {images.map((image, index) => (
                    <div
  key={index}
  className="w-[220px] h-[188px] border-2 border-gray-200 flex-shrink-0 flex flex-col items-center justify-between bg-white rounded-md shadow-sm select-none"
>
  <img
    src={image.imageUrl}
    alt={`Slide ${index}`}
    draggable={false}
    className="w-full h-[150px] object-contain rounded-sm mt-1"
  />
  <div className="text-center flex items-center justify-between w-full px-5 mb-1">
    <p className="text-sm font-medium truncate text-[11px] text-gray-500">{image.ImageText}</p>
    <button
      onClick={() => downloadImage(image.imageUrl)}
      className="text-blue-600 hover:text-blue-800"
    >
      <Download size={18} className='text-gray-700 hover:text-blue-500' />
    </button>
  </div>
</div>

                ))}
            </div>
        </div>
    );
}

export default ImageSlider;
