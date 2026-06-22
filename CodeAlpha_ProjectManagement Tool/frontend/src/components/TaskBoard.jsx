import { useEffect, useState } from "react";
import API from "../api/api";
import socket from "../socket";
import CommentSection from "./CommentSection";

function TaskBoard({ project, darkMode }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [memberId, setMemberId] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const currentUserId = user?._id;

  const isOwner =
    projectDetails?.owner?._id === currentUserId ||
    projectDetails?.owner === currentUserId;

  useEffect(() => {
    if (!project) return;

    fetchTasks();
    fetchProjectMembers();
    fetchCurrentUser();

    socket.on("taskCreated", fetchTasks);
    socket.on("taskUpdated", fetchTasks);
    socket.on("taskDeleted", fetchTasks);

    return () => {
      socket.off("taskCreated", fetchTasks);
      socket.off("taskUpdated", fetchTasks);
      socket.off("taskDeleted", fetchTasks);
    };
  }, [project]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${project._id}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setCurrentUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjectMembers = async () => {
    try {
      const res = await API.get(`/projects/${project._id}`);
      setProjectDetails(res.data);
      setMembers(res.data.members || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addMember = async () => {
    if (!memberId.trim()) return;

    try {
      await API.put(`/projects/${project._id}/add-member`, {
        userId: memberId,
      });

      alert("Member added successfully");
      setMemberId("");
      fetchProjectMembers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add member");
    }
  };

  const createTask = async () => {
    if (!title.trim()) return;

    try {
      await API.post("/tasks", {
        title,
        description: "",
        projectId: project._id,
        assignedTo,
        dueDate,
      });

      setTitle("");
      setAssignedTo("");
      setDueDate("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const TaskCard = ({ task }) => {
    const isAssignedUser =
      currentUser &&
      task.assignedTo &&
      task.assignedTo._id === currentUser._id;

    const canDelete =
      isOwner || (task.assignedTo && task.assignedTo._id === currentUserId);

    return (
      <div
        className="task-card"
        style={{
          background: darkMode ? "#1f2937" : "#fff",
          color: darkMode ? "#fff" : "#111827",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "14px",
          boxShadow: darkMode
            ? "0 4px 12px rgba(0,0,0,0.35)"
            : "0 4px 12px rgba(0,0,0,0.08)",
          border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
        }}
      >
        <h4
          style={{
            marginBottom: "8px",
            color: darkMode ? "#fff" : "#111827",
          }}
        >
          {task.title}
        </h4>

        <p
          style={{
            marginBottom: "6px",
            color: darkMode ? "#d1d5db" : "#374151",
          }}
        >
          👤 {task.assignedTo?.name || "Unassigned"}
        </p>

        {task.dueDate && (
          <p
            className="due-date"
            style={{
              marginBottom: "6px",
              color: darkMode ? "#d1d5db" : "#374151",
            }}
          >
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}

        {task.dueDate &&
          new Date(task.dueDate) < new Date() &&
          task.status !== "done" && (
            <p
              className="overdue"
              style={{
                color: "#ef4444",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              ⚠ Overdue
            </p>
          )}

        {isAssignedUser ? (
          <select
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "8px",
              marginBottom: "10px",
              background: darkMode ? "#111827" : "#fff",
              color: darkMode ? "#fff" : "#111827",
              border: darkMode ? "1px solid #4b5563" : "1px solid #d1d5db",
            }}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        ) : (
          <p
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              fontWeight: "bold",
              color:
                task.status === "done"
                  ? "green"
                  : task.status === "in-progress"
                  ? "orange"
                  : "#2563eb",
            }}
          >
            Status: {task.status}
          </p>
        )}

        {canDelete && (
          <button
            style={{
              background: "#ef4444",
              marginTop: "8px",
              width: "100%",
            }}
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        )}

        <div style={{ marginTop: "14px" }}>
          <CommentSection taskId={task._id} />
        </div>
      </div>
    );
  };

  const Column = ({ title, tasks }) => (
    <div
      className="kanban-column"
      style={{
        flex: 1,
        minWidth: "280px",
        background: darkMode ? "#111827" : "#f8fafc",
        borderRadius: "14px",
        padding: "16px",
        border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
      }}
    >
      <h3
        style={{
          marginBottom: "15px",
          color: darkMode ? "#f9fafb" : "#111827",
          textAlign: "center",
        }}
      >
        {title}
      </h3>

      {tasks.length === 0 ? (
        <p style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}>No tasks</p>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2
        style={{
          marginBottom: "20px",
          color: darkMode ? "#ffffff" : "#111827",
        }}
      >
        Tasks for {project.name}
      </h2>

      {/* OWNER SECTION */}
      {isOwner && (
        <div
          style={{
            background: darkMode ? "#1f2937" : "#ffffff",
            border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "22px",
            boxShadow: darkMode
              ? "0 4px 12px rgba(0,0,0,0.35)"
              : "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginBottom: "14px",
              color: darkMode ? "#ffffff" : "#111827",
            }}
          >
            Add Member
          </h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <input
              type="text"
              placeholder="Enter member user ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "10px",
                borderRadius: "8px",
                border: darkMode ? "1px solid #4b5563" : "1px solid #d1d5db",
                background: darkMode ? "#111827" : "#fff",
                color: darkMode ? "#fff" : "#111827",
              }}
            />

            <button onClick={addMember}>Add Member</button>
          </div>

          <h4
            style={{
              marginBottom: "12px",
              color: darkMode ? "#ffffff" : "#111827",
            }}
          >
            Members
          </h4>

          {members.length === 0 ? (
            <p style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}>
              No members added yet
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {members.map((m) => (
                <div
                  key={m._id}
                  style={{
                    background: darkMode ? "#111827" : "#eff6ff",
                    color: darkMode ? "#f9fafb" : "#1e3a8a",
                    border: darkMode ? "1px solid #374151" : "1px solid #bfdbfe",
                    borderRadius: "999px",
                    padding: "10px 14px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {m.name} ({m.email})
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE TASK */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "25px",
          padding: "18px",
          borderRadius: "12px",
          background: darkMode ? "#1f2937" : "#f8fafc",
          border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
        }}
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "10px",
            borderRadius: "8px",
            border: darkMode ? "1px solid #4b5563" : "1px solid #d1d5db",
            background: darkMode ? "#111827" : "#fff",
            color: darkMode ? "#fff" : "#111827",
          }}
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          style={{
            minWidth: "180px",
            padding: "10px",
            borderRadius: "8px",
            border: darkMode ? "1px solid #4b5563" : "1px solid #d1d5db",
            background: darkMode ? "#111827" : "#fff",
            color: darkMode ? "#fff" : "#111827",
          }}
        >
          <option value="">Assign Member</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: darkMode ? "1px solid #4b5563" : "1px solid #d1d5db",
            background: darkMode ? "#111827" : "#fff",
            color: darkMode ? "#fff" : "#111827",
          }}
        />

        <button onClick={createTask}>Add Task</button>
      </div>

      {/* KANBAN BOARD */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "25px",
          flexWrap: "wrap",
        }}
      >
        <Column title="TODO" tasks={todoTasks} />
        <Column title="IN PROGRESS" tasks={inProgressTasks} />
        <Column title="DONE" tasks={doneTasks} />
      </div>
    </div>
  );
}

export default TaskBoard;