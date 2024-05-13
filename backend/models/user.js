const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Freelancer = require("./freelancer");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: 5,
    maxlength: 1024,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  roles: {
    type: [String],
    required: [true, "Role is required"],
    enum: ["client", "freelancer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre("remove", async function (next) {
  try {
    // If the user is a freelancer, delete the freelancer details
    if (this.roles.includes("freelancer")) {
      const freelancer = await Freelancer.findOne({ userId: this._id });
      if (freelancer) {
        await Freelancer.deleteOne({ userId: this._id });
      }
    }
  } catch (error) {
  }
});

module.exports = mongoose.model("User", userSchema);
