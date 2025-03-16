import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Project() {
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/project/${projectName}`);
        setProjectData(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectName]);

  return (
    <div>
      <h1>Project: {projectName}</h1>
      {projectData ? (
        <>
          <p><strong>Description:</strong> {projectData.discription}</p>
          <p><strong>Type:</strong> {projectData.type}</p>
          <p><strong>Created By:</strong> {projectData.createdby?.email}</p>
        </>
      ) : (
        <p>Loading or project not found...</p>
      )}
    </div>
  );
}

export default Project;
