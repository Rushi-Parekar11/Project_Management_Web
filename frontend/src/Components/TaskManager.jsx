import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import axios from 'axios';

const TaskManager = ({ projectName }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/project/${projectName}`);
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [projectName]);

  const saveTasksToDB = async (updatedTasks) => {
    try {
      await axios.put(`http://localhost:8081/project/${projectName}`, {
        tasks: updatedTasks,
      });
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const newTask = {
        title: task,
        status: 'Activities',
        createdAt: Date.now(),
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasksToDB(updatedTasks);
      setTask('');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    saveTasksToDB(updatedTasks);
    setActiveDropdown(null);
  };

  const handleDragStart = (index) => {
    setDraggedTaskIndex(index);
  };

  const handleDrop = (status) => {
    const updatedTasks = [...tasks];
    if (draggedTaskIndex !== null) {
      updatedTasks[draggedTaskIndex].status = status;
      setTasks(updatedTasks);
      saveTasksToDB(updatedTasks);
      setDraggedTaskIndex(null);
    }
  };

  const sortedTasks = tasks
    .map((task, index) => ({ ...task, index }))
    .sort((a, b) => a.createdAt - b.createdAt);

  const getStatusColor = (status) => {
    if (status === 'Activities') return 'bg-green-100';
    if (status === 'inprocess') return 'bg-blue-100';
    if (status === 'Complete') return 'bg-red-100';
    return 'bg-muted';
  };

  return (
<div className="min-h-[80vh] pt-[40px] p-8 bg-background text-foreground flex flex-col items-center z-0 mt-18">
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {['Activities', 'inprocess', 'Complete'].map((status) => (
          <div
            key={status}
            className="bg-card border border-2 rounded-xl p-4 shadow-sm flex flex-col gap-3 z-100 max-h-[80vh] "
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
            onDrop={() => handleDrop(status)}
          >
            <h2 className="text-lg font-semibold mb-2 capitalize">
              {status === 'Activities' ? 'Activities' : status === 'inprocess' ? 'In Process' : 'Complete'}
            </h2>

            <div className="flex-1 overflow-y-auto flex z-100 flex-col gap-2 pr-1 ">
              {sortedTasks
                .filter((t) => t.status === status)
                .map((t) => (
                  <div
                    key={t.createdAt}
                    className={`relative flex z-100 flex-wrap justify-between items-start  border-gray-300 border p-3 rounded-xl shadow-sm gap-2 cursor-move ${getStatusColor(t.status)}`}
                    draggable
                    onDragStart={() => handleDragStart(t.index)}
                    onDragEnd={() => setDraggedTaskIndex(null)}
                  >
                    <span className="text-sm font-medium break-words pr-2 w-[calc(100%-24px)]">
                      {t.title}
                    </span>

                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === t.createdAt ? null : t.createdAt)
                      }
                      className="shrink-0"
                    >
                      <ChevronDown size={16} />
                    </button>

                    {activeDropdown === t.createdAt && (
                      <div className="absolute top-10 right-2 z-10 bg-white border rounded shadow-md p-2">
                        <button
                          onClick={() => handleDeleteTask(t.index)}
                          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {status === 'Activities' && (
              <div className="border-t  pt-3 mt-3 sticky bottom-0 bg-card">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 border-gray-400 border px-3 py-2 rounded-md text-sm text-black dark:text-white"
                    placeholder="Enter your task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTask();
                    }}
                  />
                  <button
                    onClick={handleAddTask}
                    className="bg-primary text-white px-4 py-2 bg-black rounded-md hover:bg-primary/90 text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
