const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Task = require("../models/Task");
// Add Comment
exports.addComment = async (req, res) => {
  try {
    const io = req.app.get("io");

    const comment = await Comment.create({
      task: req.body.taskId,
      user: req.user.id,
      text: req.body.text,
    });
    const task = await Task.findById(req.body.taskId);

if (
  task.assignedTo &&
  task.assignedTo.toString() !== req.user.id
) {
  await Notification.create({
    user: task.assignedTo,
    message: `New comment on task: ${task.title}`,
  });
}

    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name");

    io.emit("commentAdded", populatedComment);

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      task: req.params.taskId,
    }).populate("user", "name");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};