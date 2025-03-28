import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp } from "lucide-react"

function Statistics() {
  const { projectName } = useParams(); 
  const [task,settasks] = useState([]);

  useEffect(() => {
      const fetchdata = async() =>{
        try {
          const res = await axios.get(`http://localhost:8081/project/${projectName}`);
           settasks(res.data.tasks);
           console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }
     fetchdata();
  }, [projectName]);

  const statusCount = task.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});



  const total = task.length
  const data = [
    { label: "Activities", value: statusCount.Activities, color: "#60a5fa" }, // blue-400
    { label: "In Process", value: statusCount.inprocess, color: "#facc15" }, // yellow-400
    { label: "Completed", value: statusCount.Complete, color: "#34d399" }, // green-400
    
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
          <p className="text-sm text-muted-foreground">Last 6 Months</p>
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

        <div className="flex items-center gap-2 mt-2 text-sm font-medium">
          Trending up by 5.2% this month
          <TrendingUp className="h-4 w-4 text-green-500" />
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
