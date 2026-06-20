import { useEffect, useState } from "react";
import API from "../api/api";
import socket from "../socket";
import CommentSection from "./CommentSection";

function TaskBoard({ project }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!project) return;

    fetchTasks();
    fetchProjectMembers();

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

  const fetchProjectMembers = async () => {
    try {
      const res = await API.get(`/projects/${project._id}`);
      setMembers(res.data.members);
    } catch (err) {
      console.error(err);
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
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const todoTasks = tasks.filter(t => t.status === "todo");
  const inProgressTasks = tasks.filter(t => t.status === "in-progress");
  const doneTasks = tasks.filter(t => t.status === "done");

  const TaskCard = ({ task }) => (
    <div className="task-card">
      <h4>{task.title}</h4>

      <p>
        👤 {task.assignedTo?.name || "Unassigned"}
      </p>

      {task.dueDate && (
        <p className="due-date">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      {task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "done" && (
          <p className="overdue">⚠ Overdue</p>
        )}

      <select
        value={task.status}
        onChange={(e) => updateStatus(task._id, e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button
        style={{ background: "#ef4444" }}
        onClick={() => deleteTask(task._id)}
      >
        Delete
      </button>

      <CommentSection taskId={task._id} />
    </div>
  );

  const Column = ({ title, tasks }) => (
    <div className="kanban-column">
      <h3>{title}</h3>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))
      )}
    </div>
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2> Tasks for {project.name}</h2>

      {/* CREATE TASK */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Assign Member</option>
          {members.map(m => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={createTask}>
          Add Task
        </button>
      </div>

      {/* KANBAN BOARD */}
      <div style={{ display: "flex", gap: "20px", marginTop: "25px" }}>
        <Column title="TODO" tasks={todoTasks} />
        <Column title="IN PROGRESS" tasks={inProgressTasks} />
        <Column title="DONE" tasks={doneTasks} />
      </div>
    </div>
  );
}

export default TaskBoard;