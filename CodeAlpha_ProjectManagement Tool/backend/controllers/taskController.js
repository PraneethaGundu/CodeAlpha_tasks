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

    // Real-time event
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

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    ).populate("assignedTo", "name email");

    io.emit("taskUpdated", task);

    res.json(task);
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

    const deletedTaskId = req.params.id;

    await Task.findByIdAndDelete(deletedTaskId);

    io.emit("taskDeleted", deletedTaskId);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};