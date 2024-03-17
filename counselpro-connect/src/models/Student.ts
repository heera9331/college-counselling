import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },
    villege: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    marks10: {
      type: Number,
      required: true,
    },
    marks12: {
      type: Number,
      required: true,
    },
    caste: {
      type: String,
      required: true,
    },
    registeredBy: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
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

    course: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
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

const Student =
  mongoose.models.student || mongoose.model("student", studentSchema);

export default Student;