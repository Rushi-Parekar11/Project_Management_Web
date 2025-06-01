import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp } from "lucide-react"
import { host } from '../api';

function Statistics() {
  const { projectName } = useParams(); 
  const [task,settasks] = useState([]);

  useEffect(() => {
      const fetchdata = async() =>{
        try {
          const res = await axios.get(`${host}/${projectName}`);
           settasks(res.data.tasks);
        } catch (error) {
          console.log(error)
        }
      }
     fetchdata();
  }, [projectName]);

  const statusCount = task.reduce((acc, curr) => {
    const status = curr.status.toLowerCase(); // normalize to lowercase
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  



  const total = task.length
  const data = [
    { label: "Activities", value: statusCount.activities || 0, color: "#60a5fa" },
    { label: "In Process", value: statusCount.inprocess || 0, color: "#facc15" },
    { label: "Completed", value: statusCount.complete || 0, color: "#34d399" },
  ]
  
  

  const radius = 40
  const circumference = 2 * Math.PI * radius
  let offset = 0

  const segments = data.map((item) => {
    const dash = (item.value / total) * circumference
    const segment = (
      <circle
        key={item.label}
        r={radius}
        cx="50%"
        cy="50%"
        fill="transparent"
        stroke={item.color}
        strokeWidth="20"
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeDashoffset={offset}
      />
    )
    offset -= dash
    return segment
  })





  return (
    <>

    <div className='h-[45vh] flex items-center pl-10 '>


      {/* task info card */}
      <div className="bg-white rounded-xl shadow-md border-2 border-[#e5e7eb] p-6 w-full max-w-md ">
        <h2 className="text-xl font-semibold mb-4 text-center">Task Summary</h2>

        <div className="space-y-3 ">
          <div className="flex justify-between items-center ">
            <span className="font-medium text-gray-700">Activities</span>
            <span className="w-24 text-right text-gray-900 font-semibold">{statusCount.Activities}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">In Process</span>
            <span className="w-24 text-right text-gray-900 font-semibold">{statusCount.inprocess}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Completed</span>
            <span className="w-24 text-right text-gray-900 font-semibold">{statusCount.Complete}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">Total Tasks</p>
          <p className="text-3xl font-bold text-black">{task.length}</p>
        </div>
      </div>

      {/* pia chart */}
      <div className="max-w-4xl mx-auto rounded-xl p-6 flex flex-row gap-6 items-center bg-white">
      {/* Donut Chart Section */}
      <div className="relative w-60 h-60 flex-shrink-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
          {segments}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{total}</span>
          <span className="text-sm text-muted-foreground">Tasks</span>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="flex flex-col justify-center gap-4 flex-1">
        <div>
          <h2 className="text-xl font-semibold">Task Status Overview</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm w-full">
          {data.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
          ))}
        </div>

      
      </div>
    </div>

    </div>
    <hr />
    <div className="h-[36vh]"></div>

    </>

  );
}

export default Statistics;
