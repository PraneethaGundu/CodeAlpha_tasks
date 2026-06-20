const express = require("express");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* Create Comment */
router.post(
  "/create",
  authMiddleware,
  async (req, res) => {
    try {
      const comment = await Comment.create({
        post: req.body.post,
        user: req.user.id,
        text: req.body.text,
      });

      res.json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    }).populate("user", "username");

    res.json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;