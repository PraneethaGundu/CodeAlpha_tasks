const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

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
    if (!project.members.some((m) => m._id.toString() === req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD MEMBER BY EMAIL (only owner)
exports.addMember = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can add members" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    if (project.members.includes(user._id)) {
      return res.status(400).json({ message: "User is already a project member" });
    }

    project.members.push(user._id);
    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate("owner", "name email")
      .populate("members", "name email");

    res.json({
      message: "Member added successfully",
      project: updatedProject,
    });
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
    // Projects where logged-in user is a member
    const userProjects = await Project.find({
      members: { $in: [req.user.id] },
    });

    const projectIds = userProjects.map(
      (project) => project._id
    );

    // Count only tasks assigned to the logged-in user
    const projects = userProjects.length;

    const tasks = await Task.countDocuments({
      project: { $in: projectIds },
      assignedTo: req.user.id,
    });

    const completed = await Task.countDocuments({
      project: { $in: projectIds },
      assignedTo: req.user.id,
      status: "done",
    });

    const pending = await Task.countDocuments({
      project: { $in: projectIds },
      assignedTo: req.user.id,
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