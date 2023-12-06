import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    registeredBy: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      default: "student@gmail.com",
    },
    city: {
      type: String,
    },
    villege: {
      type: String,
    },
    address: {
      type: String,
    },
    marks: {
      type: Number,
    },
    school: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    status: {
      type: String,
      enum: ["PENDING", "INTERESTED", "NOTINTERESTED", "PARTIALINTERESTED"],
      default: "PENDING",
    },
    route: {
      type: String,
      enum: [
        "BANDA",
        "RAHLI",
        "SAGAR",
        "BUXWAHA",
        "GARHAKOTA",
        "DAMOH",
        "CHATTARPUR",
        "OTHER",
      ],
      required: true,
    },
    stream: {
      type: String,
      enum: ["CSE", "CE", "EC", "ME", "AI/ML", "OTHER"],
      default: "OTHER",
    },
    category: {
      type: String,
      enum: ["GEN", "OBC", "ST", "SC"],
      required: true,
    },
    chats: [chatSchema],
  },
  { timestamps: true }
);

const Student = mongoose.model("student", studentSchema);

export default Student;
