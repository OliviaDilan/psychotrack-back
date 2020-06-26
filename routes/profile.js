const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// const User = mongoose.model("User");
const Profile = mongoose.model("Profile");

router.get("/profile", async (req, res) => {
  const profile = await Profile.findOne({ user: { _id: req.user._id } });
  res.json(profile);
});

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profile = await new Profile({
      firstname: req.body.firstname,
      surname: req.body.surname,
      age: req.body.age,
      user: req.user._id,
    }).save();
    res.json(profile);
  }
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let profile = await Profile.findOne({ user: { _id: req.user._id } });
    profile.firstname = req.body.firstname;
    profile.surname = req.body.surname;
    profile.age = req.body.age;
    profile = await profile.save();
    res.json(profile);
  }
);

module.exports = router;
