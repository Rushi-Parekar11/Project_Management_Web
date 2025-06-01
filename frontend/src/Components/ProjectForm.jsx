import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { host } from "../api";


export default function ProjectForm({ onClose, username }) {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    description: "",
    type: "General"
  });
    let [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true)

    e.preventDefault();
    try {
      const response = await axios.post(`${host}/${username}/dashboard`, {
        projectname: project.name,
        discription: project.description,
        type: project.type
      });

    //  console.log("Project Created:", response.data);
      toast.success("Project Created successfully !");
      setTimeout(() => {
        navigate(`/project/${project.name}`);
        setLoading(false)
      }, 1000);
      
    } catch (error) {
      setLoading(false)
      console.error("Error creating project ", error.response?.data || error.message);
      toast.error("Failed to create project ",error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 px-4">
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-xl p-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create New Project <span className="text-black/60">({username})</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
              placeholder="e.g., AI Weather App"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              required
              placeholder="Brief overview of your project..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Type
            </label>
            <select
              name="type"
              value={project.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Personal">Personal</option>
              <option value="Company">Company</option>
              <option value="Marketing">Marketing</option>
              <option value="Research">Research</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
          >
           {!loading ? "Create Project" :  <ClipLoader color='white' className='w-8' size='30px' aria-label="Loading Spinner" data-testid="loader"/>}

          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
