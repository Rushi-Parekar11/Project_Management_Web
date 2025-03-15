import React, { useState } from 'react';

function Saved() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Saved</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Open Modal
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg p-6 relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 text-2xl hover:text-black"
            >
              &times;
            </button>
            <p className="text-gray-800">This is a modal!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Saved;
