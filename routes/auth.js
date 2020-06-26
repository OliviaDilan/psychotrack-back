const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).select(
    "+password"
  );
  const isAuthenticated = await (user &&
    user.verifyPassword(req.body.password));
  if (!isAuthenticated) {
    next({
      status: 401,
      message: "The username or password is wrong!",
    });
    return;
  }

  res.json({
    _id: user._id,
    username: user.username,
    token: user.getToken(),
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await new User({
      username: req.body.username,
      password: req.body.password,
    }).save();

    res.json({
      _id: user._id,
      username: user.username,
      token: user.getToken(),
    });
  } catch (err) {
    if (err.code === 11000) {
      next({
        status: 409,
        message: "This username already exists!",
      });
    }
    next();
  }
});

module.exports = router;
