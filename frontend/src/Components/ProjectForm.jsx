import { useState } from "react";
import axios from "axios";

export default function ProjectForm({ onClose, username }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
    type: ""
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/${username}/dashboard`, {
        projectname: project.name,
        discription: project.description,
        type: project.type
      });

      console.log("✅ Project Created:", response.data);
      alert("Project created successfully!");
      onClose();

    } catch (error) {
      console.error("❌ Error creating project:", error.response?.data || error.message);
      alert("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 px-4">
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Create New Project {username}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <select
              name="type"
              value={project.type}
              onChange={handleChange}
              required
              className="w-[60%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="" disabled>Select Project Type</option>
              <option value="school">School Project</option>
              <option value="software">Software</option>
              <option value="webdev">Web Development Project</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

