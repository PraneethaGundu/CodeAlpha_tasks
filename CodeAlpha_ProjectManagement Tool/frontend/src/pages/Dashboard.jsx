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
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Add member input per project
  const [memberInputs, setMemberInputs] = useState({});

  // Project progress
  const [projectProgress, setProjectProgress] = useState({});

  useEffect(() => {
    fetchProjects();
    fetchNotifications();
    fetchStats();
  }, []);

  // ---------------- FETCH PROJECTS ----------------
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      // fetch full project details including members
      const detailedProjects = await Promise.all(
        res.data.map(async (project) => {
          const projectRes = await API.get(`/projects/${project._id}`);
          return projectRes.data;
        })
      );

      setProjects(detailedProjects);

      // calculate progress after loading projects
      calculateAllProjectsProgress(detailedProjects);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- CREATE PROJECT ----------------
  const createProject = async () => {
    if (!name.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      await API.post("/projects", {
        name,
        description,
      });

      setName("");
      setDescription("");
      fetchProjects();
      fetchStats();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  // ---------------- DELETE PROJECT ----------------
  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${projectId}`);
      fetchProjects();
      fetchStats();

      if (selectedProject?._id === projectId) {
        setSelectedProject(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  // ---------------- ADD MEMBER BY EMAIL ----------------
  const addMember = async (projectId) => {
    const email = memberInputs[projectId];

    if (!email || !email.trim()) {
      alert("Enter member email");
      return;
    }

    try {
      await API.put(`/projects/${projectId}/add-member`, {
        email,
      });

      alert("Member added successfully");

      setMemberInputs((prev) => ({
        ...prev,
        [projectId]: "",
      }));

      fetchProjects();

      // if taskboard open for same project, refresh selected project too
      if (selectedProject && selectedProject._id === projectId) {
        const updatedProject = await API.get(`/projects/${projectId}`);
        setSelectedProject(updatedProject.data);
      }
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Failed to add member"
      );
    }
  };

  // ---------------- NOTIFICATIONS ----------------
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- DASHBOARD STATS ----------------
  const fetchStats = async () => {
    try {
      const res = await API.get("/projects/stats/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // ---------------- AUTO PROGRESS CALCULATION ----------------
  const calculateAllProjectsProgress = async (projectsList) => {
    try {
      const progressData = {};

      for (const project of projectsList) {
        const res = await API.get(`/tasks/${project._id}`);
        const tasks = res.data;

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(
          (task) => task.status === "done"
        ).length;

        const progress =
          totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        progressData[project._id] = progress;
      }

      setProjectProgress(progressData);
    } catch (err) {
      console.error("Error calculating project progress:", err);
    }
  };

  // ---------------- SEARCH FILTER ----------------
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

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

        <button onClick={logout}>Logout</button>

        <button onClick={() => setDarkMode(!darkMode)}>
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

        {/* Stats */}
        <h2 id="dashboard-section">Dashboard Stats</h2>

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div className="stat-card">
            <h3>{stats.projects || 0}</h3>
            <p>Projects</p>
          </div>

          <div className="stat-card">
            <h3>{stats.tasks || 0}</h3>
            <p>Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{stats.completed || 0}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>{stats.pending || 0}</h3>
            <p>Pending</p>
          </div>
        </div>

        {/* Notifications */}
        <h2 id="notifications-section">Notifications</h2>

        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="notification-card"
              style={{
                background: darkMode ? "#1f2937" : "#fff",
                color: darkMode ? "white" : "black",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {notification.message}
            </div>
          ))
        )}

        {/* Search */}
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
        <h2 id="projects-section">My Projects</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
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

          <button onClick={createProject}>Create Project</button>
        </div>

        {/* Projects */}
        {filteredProjects.length === 0 ? (
          <p>No matching projects found !!</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>

              {/* Owner */}
              <p style={{ marginBottom: "8px" }}>
                <strong>Owner:</strong>{" "}
                {project.owner?.name || "Unknown"}{" "}
                {project.owner?.email ? `(${project.owner.email})` : ""}
              </p>

              {/* Members List */}
              <div style={{ marginBottom: "12px" }}>
                <strong>Members:</strong>
                {project.members && project.members.length > 0 ? (
                  <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                    {project.members.map((member) => (
                      <li key={member._id}>
                        {member.name} ({member.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No members yet</p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${projectProgress[project._id] || 0}%`,
                  }}
                ></div>
              </div>

              <p style={{ marginTop: "5px" }}>
                Progress: {projectProgress[project._id] || 0}%
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "12px",
                }}
              >
                <button onClick={() => setSelectedProject(project)}>
                  View Tasks
                </button>

                <button
                  onClick={() => deleteProject(project._id)}
                  style={{ background: "#ef4444" }}
                >
                  Delete
                </button>
              </div>

              {/* Add Member by Email */}
              <div style={{ marginTop: "15px" }}>
                <h4 style={{ marginBottom: "10px" }}>Add Member</h4>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter member email"
                    value={memberInputs[project._id] || ""}
                    onChange={(e) =>
                      setMemberInputs({
                        ...memberInputs,
                        [project._id]: e.target.value,
                      })
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      minWidth: "250px",
                    }}
                  />

                  <button onClick={() => addMember(project._id)}>
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Task Board */}
        {selectedProject && (
          <div style={{ marginTop: "20px" }}>
            <TaskBoard project={selectedProject} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;