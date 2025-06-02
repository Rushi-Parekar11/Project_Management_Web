import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CloudUpload } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { host } from '../../api';

function ImageDocument({ onClose,projectName }) {
  const { project } = useParams();
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
    let [loading, setLoading] = useState(false);


  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const openFilePicker = () => {
    document.getElementById('upload-image').click();
  };

    //   uploading file  //
    const handleSubmit = async (e) => {
      setLoading(true)
        console.log(project)
        e.preventDefault();
        if (!image) {
          toast.error("No image selected");
          return;
        }
      
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "dokjanImage");
        data.append("cloud_name", "dqw9hj5x6");
      
        try {
          setUploading(true);
          const res = await fetch("https://api.cloudinary.com/v1_1/dqw9hj5x6/image/upload", {
            method: "POST",
            body: data,
          });
      
          const uploadedData = await res.json();
          const imageUrl = uploadedData.url;
          toast.success("Upload successful!");
      
          // Get username from localStorage
          const user = JSON.parse(localStorage.getItem("user"));

          // Now send to your backend
          const backendRes = await fetch(`${host}project/${projectName}/docimage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              imageUrl,
              ImageText: `${image.name}` 
            })
          });
          setImage(null);
          setLoading(false)
          window.location.reload();

      
          const result = await backendRes.json();
          console.log(result);
        } catch (err) {
          console.error("Upload failed:", err);
          toast.error("Upload failed");
          setLoading(false)
        } finally {
          setUploading(false);
        }
      };
      
      
  

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 px-4">
        <div className="relative w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 text-black">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>

          {/* Upload Form */}
          <form
            onSubmit={handleSubmit}
            onDragEnter={handleDrag}
            className="space-y-6"
          >
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="upload-image"
            />

                {/* Choose Image Button */}
                <button
              type="button"
              onClick={openFilePicker}
              className="w-[45%] border flex items-center gap-2 items-center border-black text-black py-1 rounded-md hover:bg-black hover:text-white transition duration-300"
            >
              <CloudUpload className='h-4 w-4 ml-11' /> Uploade file from Computer
            </button>

            {/* Drag-and-drop area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDrag}
              onDragLeave={() => setDragActive(false)}
              className={`h-[150px] border-2 border-dashed rounded-xl p-8 text-center flex justify-center items-center transition-colors duration-300 ${
                dragActive ? 'border-black bg-gray-100' : 'border-gray-300'
              }`}
            >
              <label htmlFor="upload-image" className="cursor-pointer">
                {image ? (
                  <p className="text-gray-800">{image.name}</p>
                ) : (
                  <p className="text-gray-500">Drag & drop file here</p>
                )}
              </label>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            >
            {!loading ? "  Upload file" :  <ClipLoader color='white' className='w-8' size='25px' aria-label="Loading Spinner" data-testid="loader"/>}

            
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ImageDocument;
