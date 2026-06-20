const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const Post = require("../models/Post");

/* Get Logged-in User Profile */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get(
  "/myposts",
  authMiddleware,
  async (req, res) => {
    try {
      const posts = await Post.find({
        user: req.user.id,
      });

      res.json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* Follow User */
router.put("/follow/:id", authMiddleware, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!userToFollow.followers.includes(req.user.id)) {
      userToFollow.followers.push(req.user.id);
      currentUser.following.push(req.params.id);

      await userToFollow.save();
      await currentUser.save();
    }

    res.json({
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Unfollow User */
router.put("/unfollow/:id", authMiddleware, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    userToUnfollow.followers =
      userToUnfollow.followers.filter(
        (id) => id.toString() !== req.user.id
      );

    currentUser.following =
      currentUser.following.filter(
        (id) => id.toString() !== req.params.id
      );

    await userToUnfollow.save();
    await currentUser.save();

    res.json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
const upload =
  require("../middleware/upload");

router.post(
  "/upload-profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      user.profilePic =
        req.file.path;

      await user.save();

      res.json({
        message:
          "Profile picture uploaded",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get(
  "/all",
  authMiddleware,
  async (req, res) => {
    try {
      const users = await User.find(
        {},
        "-password"
      );

      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
router.get(
  "/profile/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.params.id
      );

      const posts = await Post.find({
        user: req.params.id,
      });

      res.json({
        user,
        posts,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
router.put(
  "/updatebio",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      user.bio = req.body.bio;

      await user.save();

      res.json({
        message: "Bio updated successfully",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;