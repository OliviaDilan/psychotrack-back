const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  firstname: String,
  surname: String,
  age: {
    type: Number,
    default: 0,
  },
});

function autoPopulate(next) {
  this.populate("user");
  next();
}

profileSchema.pre("findOne", autoPopulate);

module.exports = mongoose.model("Profile", profileSchema);
