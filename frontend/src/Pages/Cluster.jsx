import React, { useState } from "react";
import { Plus, ArrowLeft, FolderOpen, Users, LayoutDashboard, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cluster = () => {
  const [active, setActive] = useState("Cluster Overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clusterName, setClusterName] = useState("");
  const navigate = useNavigate();

  const items = [
    { name: "Cluster Overview", icon: LayoutDashboard },
    { name: "View Clusters", icon: FolderOpen },
    { name: "Manage Contributors", icon: Users },
  ];

  const handleCreateCluster = () => {
    console.log("New Cluster Created:", clusterName);
    setIsModalOpen(false);
    setClusterName(""); // Reset input after creating
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-300 bg-white fixed h-screen flex flex-col justify-between">
        <ul className="list-none pl-4 pr-2 flex flex-col gap-2 mt-2">
          {/* Back Button */}
          <div
            className="flex items-center gap-2 p-4 cursor-pointer text-gray-700 hover:bg-gray-200 transition-all duration-200"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </div>

          {items.map(({ name, icon: Icon }) => (
            <li
              key={name}
              onClick={() => setActive(name)}
              className={`flex items-center gap-2 w-full h-10 rounded-sm pl-3 pr-2 cursor-pointer border-l-4 transition-all duration-200
                ${
                  active === name
                    ? "bg-gray-300 border-black text-black"
                    : "border-transparent hover:bg-gray-200 text-gray-700"
                }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{name}</span>
            </li>
          ))}

          <hr className="mr-4 my-5 border-gray-400" />

          {/* Create Cluster Button */}
          <li
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 h-10 rounded-sm cursor-pointer border border-gray-300 text-black hover:bg-gray-300 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span className="text-sm font-medium">Create Cluster</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-2xl font-semibold mb-4">{active}</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
            <LayoutDashboard size={32} className="text-gray-700" />
            <h3 className="mt-2 text-lg font-medium">Cluster Overview</h3>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
            <FolderOpen size={32} className="text-gray-700" />
            <h3 className="mt-2 text-lg font-medium">View Clusters</h3>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
            <Users size={32} className="text-gray-700" />
            <h3 className="mt-2 text-lg font-medium">Manage Contributors</h3>
          </div>
          {/* Create New Cluster Card */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="p-6 bg-gray-200 shadow-md rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-300 transition"
          >
            <PlusCircle size={32} className="text-gray-700" />
            <h3 className="mt-2 text-lg font-medium">Create New Cluster</h3>
          </div>
        </div>
      </main>

      {/* Create Cluster Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative space-y-4">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-black hover:border-2 border-black rounded-full w-8 h-8 flex items-center justify-center transition"
            >
              &times;
            </button>

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-black">Create New Cluster</h2>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter Cluster Name"
              value={clusterName}
              onChange={(e) => setClusterName(e.target.value)}
              className="w-full border border-black rounded-md px-4 py-2 text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />

            {/* Create Button */}
            <button
              onClick={handleCreateCluster}
              className="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium border border-black transition"
            >
              Create Cluster
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cluster;
