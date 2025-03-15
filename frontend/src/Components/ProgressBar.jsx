import React from "react";

function ProgressBar({ percentage }) {
  return (
    <div className="w-[90%] max-w-md mx-auto flex flex-col items-start mt-2">
      {/* Percentage Text */}
      <div
        className="text-xs font-medium mb-1"
        style={{ marginLeft: `${percentage}%`, transform: 'translateX(-50%)' }}
      >
        {percentage}%
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
