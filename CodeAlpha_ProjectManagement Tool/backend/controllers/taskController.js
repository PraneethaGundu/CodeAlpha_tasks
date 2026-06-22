const Task = require("../models/Task");
const Notification = require("../models/Notification");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const io = req.app.get("io");

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      project: req.body.projectId,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
    });

    // Notification for assigned user
    if (task.assignedTo) {
      await Notification.create({
        user: task.assignedTo,
        message: `You were assigned task: ${task.title}`,
      });
    }

    io.emit("taskCreated", task);

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    }).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const io = req.app.get("io");

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Only assigned user can update this task
    if (
      !task.assignedTo ||
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Only assigned user can update this task",
      });
    }

    task.status = req.body.status;
    await task.save();

    const updatedTask = await Task.findById(task._id).populate(
      "assignedTo",
      "name email"
    );

    io.emit("taskUpdated", updatedTask);

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const io = req.app.get("io");

    const task = await Task.findById(req.params.id).populate("project");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const isOwner =
      task.project.owner.toString() === req.user.id;

    const isAssignedUser =
      task.assignedTo &&
      task.assignedTo.toString() === req.user.id;

    if (!isOwner && !isAssignedUser) {
      return res.status(403).json({
        message: "Only project owner or assigned user can delete this task",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    io.emit("taskDeleted", req.params.id);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};