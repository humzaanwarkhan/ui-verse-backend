const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "participant"],
      default: "participant",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
