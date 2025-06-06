import React, { useState } from "react";
import {
  Plus,
  ArrowLeft,
  FolderOpen,
  Users,
  Lock,
  LayoutDashboard,
  PlusCircle,
  Menu
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cluster = () => {
  const [active, setActive] = useState("Cluster Overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clusterName, setClusterName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
    { name: "Cluster Overview", icon: LayoutDashboard },
    { name: "View Clusters", icon: FolderOpen },
    { name: "Manage Contributors", icon: Users },
  ];

  const handleCreateCluster = () => {
    console.log("New Cluster Created:", clusterName);
    setIsModalOpen(false);
    setClusterName("");
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden absolute top-4 left-4 z-50 text-black"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={28} />
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-300 flex flex-col justify-between transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <ul className="list-none pl-4 pr-2 flex flex-col gap-2 mt-14 md:mt-2">
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
                onClick={() => {
                  setActive(name);
                  setSidebarOpen(false); // Close sidebar on mobile tap
                }}
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
        <main className="flex-1 p-4 md:p-6 bg-gray-100 md:ml-64 mt-16 md:mt-0 overflow-y-auto w-full">
          <h1 className="text-2xl font-semibold mb-4">{active}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div
              onClick={() => setIsModalOpen(true)}
              className="p-6 bg-gray-200 shadow-md rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-300 transition"
            >
              <PlusCircle size={32} className="text-gray-700" />
              <h3 className="mt-2 text-lg font-medium">Create New Cluster</h3>
            </div>
          </div>
        </main>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative space-y-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-black hover:border-2 border-black rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                &times;
              </button>

              <h2 className="text-2xl font-semibold text-black">Create New Cluster</h2>

              <input
                type="text"
                placeholder="Enter Cluster Name"
                value={clusterName}
                onChange={(e) => setClusterName(e.target.value)}
                className="w-full border border-black rounded-md px-4 py-2 text-sm bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />

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

      {/* Coming Soon Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-30">
        <div className="flex flex-col items-center text-white space-y-4 text-center px-4 max-w-xl">
          <Lock size={48} />
          <p className="text-lg font-semibold">Available in Future Version</p>
          <p className="text-sm">
            A Cluster in DOKJAN is created by mentors or teachers to group and manage multiple student projects.
          </p>
          <p className="text-sm">
            It helps track project documentation, updates, and assignments from one place for better academic oversight.
          </p>
        </div>
      </div>
    </>
  );
};

export default Cluster;
