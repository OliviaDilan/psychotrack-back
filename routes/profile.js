const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = mongoose.model("Profile");

router.get(
  "/profile",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const exists = await Profile.exists({user: req.user._id})
    if (!exists) {
      return res.json()
    }
    const profile = await Profile.findOne({user: req.user._id});
    res.json(profile);
  });

router.post(
  "/profile",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
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
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    let profile = await Profile.findOne({user: req.user._id});
    profile.firstname = req.body.firstname;
    profile.surname = req.body.surname;
    profile.age = req.body.age;
    profile = await profile.save();
    res.json(profile);
  }
);

router.delete(
  "/profile",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    let profile = await Profile.findOne({user: req.user._id});
    await Profile.deleteOne({_id: profile._id});
    res.json({
      message: "deleted",
    });
  }
);

module.exports = router;
