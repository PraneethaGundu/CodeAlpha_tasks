const router = require("express").Router();

const projectController = require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post("/", auth, projectController.createProject);

// GET USER PROJECTS
router.get("/", auth, projectController.getUserProjects);

// GET SINGLE PROJECT
router.get("/stats/dashboard", auth, projectController.getStats);
router.get("/:id", auth, projectController.getProjectById);

// ADD MEMBER
router.put("/:id/add-member", auth, projectController.addMember);

// DELETE PROJECT
router.delete("/:id", auth, projectController.deleteProject);
router.put("/:id/add-member", auth, projectController.addMember);
module.exports = router;