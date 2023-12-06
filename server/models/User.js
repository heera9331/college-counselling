import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    } 
  },

  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
