const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const Comment = require("../models/Comment");
const upload =require("../middleware/upload");
/* Create Post */

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const post = await Post.create({
        user: req.user.id,
        content: req.body.content,
        image: req.file
          ? req.file.path
          : "",
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* Get All Posts */

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/like/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const alreadyLiked = post.likes.includes(
      req.user.id
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );

      await post.save();

      return res.json({
        message: "Post unliked",
      });
    }

    post.likes.push(req.user.id);

    await post.save();

    res.json({
      message: "Post liked",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      await Post.findByIdAndDelete(req.params.id);

      res.json({
        message: "Post deleted successfully",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
router.put(
  "/edit/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      post.content = req.body.content;

      await post.save();

      res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post(
  "/comment/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const comment = await Comment.create({
        post: req.params.id,
        user: req.user.id,
        text: req.body.text,
      });

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
); 

module.exports = router;