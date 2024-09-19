// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', status: 'pending' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get('/api/projects');
    setProjects(res.data);
  };

  const addProject = async (e) => {
    e.preventDefault();
    await axios.post('/api/projects', newProject);
    setNewProject({ title: '', status: 'pending' });
    fetchProjects();
  };

  return (
    <div className="App">
      <h1>Mainbow Project Management</h1>
      <form onSubmit={addProject}>
        <input
          type="text"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          placeholder="Project Title"
        />
        <select
          value={newProject.status}
          onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Project</button>
      </form>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.title} - {project.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// frontend/package.json (追加部分のみ)
{
  "proxy": "http://localhost:5000"
}
