const Project = require("../models/Project");
const Task = require("../models/Task");
// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id], // owner is member
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PROJECTS OF USER
exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    }).populate("owner", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE PROJECT
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // access check
    if (!project.members.some(m => m._id.toString() === req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD MEMBER (only owner)
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can add members" });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
    }

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PROJECT (only owner)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can delete" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const projects = await Project.countDocuments({
      members: { $in: [req.user.id] },
    });

    const tasks = await Task.countDocuments();

    const completed = await Task.countDocuments({
      status: "done",
    });

    const pending = await Task.countDocuments({
      status: { $ne: "done" },
    });

    res.json({
      projects,
      tasks,
      completed,
      pending,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
  } catch (err) {
    console.error(err);
  }
};
