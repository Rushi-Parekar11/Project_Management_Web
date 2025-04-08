import React, { useRef } from 'react';
import { Download } from 'lucide-react';

const images = [
  { src: 'https://picsum.photos/id/1011/400/300', name: 'Image 1' },
  { src: 'https://picsum.photos/id/1015/400/300', name: 'Image 2' },
  { src: 'https://picsum.photos/id/1016/400/300', name: 'Image 3' },
  { src: 'https://picsum.photos/id/1021/400/300', name: 'Image 4' },
  { src: 'https://picsum.photos/id/1025/400/300', name: 'Image 5' },
];

function ProjectFlow() {
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

  const downloadImage = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'image.jpg';
    link.click();
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-[800px] h-[200px] overflow-x-auto whitespace-nowrap flex gap-2 rounded-lg shadow-lg cursor-grab px-2 select-none"
        ref={carouselRef}
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onDrag}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="h-full w-[220px] border border-gray-200 flex-shrink-0 flex flex-col items-center justify-between pt-2 bg-white rounded-md shadow-sm pb-1 select-none"
          >
            <img
              src={image.src}
              alt={`Slide ${index}`}
              draggable={false}
              className="h-[140px] object-contain rounded-md"
            />
            <div className="text-center mt-1 flex items-center justify-between w-full px-4">
              <p className="text-sm font-medium">{image.name}</p>
              <button
                onClick={() => downloadImage(image.src)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectFlow;
