const router = require("express").Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

// CREATE TASK
router.post("/", auth, taskController.createTask);

// GET TASKS BY PROJECT
router.get("/:projectId", auth, taskController.getTasksByProject);

// UPDATE TASK STATUS
router.put("/:id", auth, taskController.updateTaskStatus);

// DELETE TASK
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;