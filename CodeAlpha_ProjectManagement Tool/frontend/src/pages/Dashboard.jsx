import { useEffect, useState } from "react";
import API from "../api/api";
import TaskBoard from "../components/TaskBoard";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [projectProgress, setProjectProgress] = useState({});
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchProjects();
    fetchNotifications();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
      const progressObj = {};

for (const project of res.data) {
  progressObj[project._id] =
    await calculateProgress(project._id);
}

setProjectProgress(progressObj);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async () => {
    try {
      await API.post("/projects", {
        name,
        description,
      });

      setName("");
      setDescription("");

      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (projectId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/projects/${projectId}`);

    fetchProjects();

    if (selectedProject?._id === projectId) {
      setSelectedProject(null);
    }

    alert("Project deleted successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to delete project");
  }
};

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/projects/stats/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

  const filteredProjects = projects.filter((project) =>
  project.name.toLowerCase().includes(search.toLowerCase())
);

const calculateProgress = async (projectId) => {
  try {
    const res = await API.get(`/tasks/${projectId}`);

    const tasks = res.data;

    if (tasks.length === 0) {
      return 0;
    }

    const completed = tasks.filter(
      (task) => task.status === "done"
    ).length;

    return Math.round(
      (completed / tasks.length) * 100
    );
  } catch (err) {
    console.error(err);
    return 0;
  }
};

  return (
  <div
  className={`dashboard-layout ${darkMode ? "dark" : ""}`}
  style={{
    background: darkMode ? "#111827" : "white",
    color: darkMode ? "white" : "black",
    minHeight: "100vh",
  }}
>
  {/* Sidebar */}
  <div className="sidebar">
    <h2>ProjectHub</h2>

    <button
      onClick={() =>
        document
          .getElementById("dashboard-section")
          .scrollIntoView({ behavior: "smooth" })
      }
    >
      Dashboard
    </button>

    <button
      onClick={() =>
        document
          .getElementById("projects-section")
          .scrollIntoView({ behavior: "smooth" })
      }
    >
      Projects
    </button>

    <button
      onClick={() =>
        document
          .getElementById("notifications-section")
          .scrollIntoView({ behavior: "smooth" })
      }
    >
      Notifications
    </button>

    <button onClick={logout}>
      Logout
    </button>
    <button
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
</button>
  </div>

    {/* Main Content */}
    <div
      className="main-content"
      style={{
        maxWidth: "1200px",
        width: "100%",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>Project Management Dashboard</h1>
      </div>

     {/* Dashboard Stats */}
<h2 id="dashboard-section">Dashboard Stats</h2>

<div className="stats-grid">
  <div className="stat-card">
    <h4>📁 Projects</h4>
    <h2>{stats.projects || 0}</h2>
  </div>

  <div className="stat-card">
    <h4>📝 Tasks</h4>
    <h2>{stats.tasks || 0}</h2>
  </div>

  <div className="stat-card">
    <h4>✅ Completed</h4>
    <h2>{stats.completed || 0}</h2>
  </div>

  <div className="stat-card">
    <h4>⏳ Pending</h4>
    <h2>{stats.pending || 0}</h2>
  </div>
      </div>

      {/* Notifications */}
      <h2 id="notifications-section">
  Notifications
</h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notification) => (
         <div
  key={notification._id}
  className="notification-card"
>
            {notification.message}
          </div>
        ))
      )}

      <input
  type="text"
  placeholder="🔍 Search Projects..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>

      {/* Create Project */}
      <h2 id="projects-section">
  My Projects
</h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createProject}>
          Create Project
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <p>No matching projects found !!</p>
      ) : (
        filteredProjects.map((project) => (
         <div
      key={project._id}
      className="card"
    >
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
  width: `${
    projectProgress[project._id] || 0
  }%`,
}}
        ></div>
      </div>

      <p style={{ marginTop: "5px" }}>
       Progress: {projectProgress[project._id] || 0}%
      </p>

      <button
        onClick={() => setSelectedProject(project)}
      >
        View Tasks
      </button>

      <button
        onClick={() => deleteProject(project._id)}
      >
        Delete
      </button>
    </div>
  ))
)}

{/* Task Board */}
{selectedProject && (
  <div style={{ marginTop: "20px" }}>
    <TaskBoard project={selectedProject} />
  </div>
)}
</div> </div> ); } export default Dashboard;
