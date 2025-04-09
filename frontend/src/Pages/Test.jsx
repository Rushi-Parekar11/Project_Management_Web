import React, { useEffect, useState } from 'react'

function Test() {
    const [images,setimages]=useState([]);
useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:8081/test");
      const data = await res.json();
      console.log("Fetched images:", data);
      setimages(data);
    };
  
    fetchImages();
  }, []);
  
  return (
    <>
      <div>
        <h1>Show images </h1>
<div className="flex flex-wrap gap-3">        {images.map((image, index) => {
  return (
    <div
      key={index}
      className="card"
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "10px",
      }}
    >
      <img
        src={image.secure_url}
        alt={`Image ${index}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
})}</div>


      </div>
    </>
  )
}

export default Test
