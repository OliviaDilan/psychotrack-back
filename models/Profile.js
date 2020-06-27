const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

function autoPopulate(next) {
  this.populate("user");
  next();
}

profileSchema.pre('find', autoPopulate)
profileSchema.pre('findOne', autoPopulate)

module.exports = mongoose.model("Profile", profileSchema);
