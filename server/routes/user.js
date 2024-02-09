import express from "express";
import verifyToken from "../utils/verifyToken.js";
import Student from "../models/Student.js";
import {
  getStudent,
  getStudents,
  registerStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.js";

import jwt from "jsonwebtoken";
import { getUser } from "../controllers/user.js";
import User from "../models/User.js";

const UserRoute = express.Router();

// user/eourere45454
UserRoute.get("/:id", verifyToken, (req, res, next) => {
  res.send({ msg: "array kam kar to raha hu" });
});

// /user/register
UserRoute.post("/register", verifyToken, (req, res, next) => {
  registerStudent(req, res, next);
});

UserRoute.post("/recent-students", verifyToken, async (req, res) => {
  try {
    let currentPage = req.query.page || 1;
    let pageSize = req.query.size || 15;

    console.log(req.query);
    let totalStudent = await Student.countDocuments({});
    let students = await Student.find()
      .select(["-chats"])
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);

    if (students) {
      console.log(students);
      res.status(200).send({ students, total: totalStudent });
    } else {
      res.status(200).send({ msg: "students not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ reason: "error during finding recent student", err: error });
  }
});

// user/search?query="heera"&page=1&size=15
UserRoute.post("/search", verifyToken, async (req, res, next) => {
  getStudents(req, res, next);
});

// user/search?studentId="65c3dd2afa31d837c236bf53"
UserRoute.post("/searchById", verifyToken, async (req, res, next) => {
  getStudent(req, res, next);
});

// user/student/email="heera9331"
UserRoute.post("/student/:id", verifyToken, (req, res) => {
  try {
    getStudent(req, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error -> /user/student/:email" });
  }
});

// const [chat, setChat] = React.useState({
//   email: email,
//   reply: "",
//   field: "",
//   status: "",
// });

// /user/student/update/:email

// sample chat structure
// chat = {
//   msg: "",
//   teacher: "",
//   timestamp: "",optional
// }
UserRoute.post("/update-student", verifyToken, (req, res, next) => {
  if (!req.body.student) {
    return res.status(404).json({ error: "student not found" });
  }
  let student = req.body.student;

  let chat = {};
  chat.msg = student.comment || "";

  jwt.verify(req.body.token, process.env.PRIVATE_KEY, (error, payload) => {
    if (error) {
      console.log(error);
      return res.status(404).json({ error: "token verification error" });
    } else {
      chat.teacher = payload.email;
      student.newChat = chat;
    }
  });
  req.student = student;

  console.log("updating");

  updateStudent(req, res, next);
});
UserRoute.post("/remove-student", verifyToken, deleteStudent);

UserRoute.post("/student/update/:id", verifyToken, async (req, res, next) => {
  let id = req.body.chatData.id;
  let chatData = req.body.chatData;
  let token = req.body.token;
  const chat = {};
  chat.msg = chatData.reply;

  jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
    if (payload) {
      let userEmail = payload.email;
      // teacher mail
      chat.teacher = userEmail;
      console.log("debug checks2");
    } else {
      console.log("error in payload", err);
      res.status(404).send({ err, msg: "not success" });
    }
  });

  // interested
  console.log("check 1");
  if (chatData.status === "INTERESTED") {
    chat.course = chatData.field;
    console.log(chatData);
    // return;
    Student.findOneAndUpdate(
      { _id: id },
      {
        $push: { chats: chat },
        $set: {
          status: chatData.status,
          school: chatData.school,
          marks: chatData.marks,
          stream: chatData.field,
        },
      },
      { new: true }
    )
      .then((ack1) => {
        console.log(ack1);
        res.status(200).send({ ack1: ack1 });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // not interested or  pending
  else if (
    chatData.status === "NOTINTERESTED" ||
    chatData.status === "PENDING"
  ) {
    // save chat

    console.log("check 2");
    let ack = await Student.findByIdAndUpdate(
      { _id: id },
      { $push: { chats: chat }, $set: { status: chatData.status } },
      { new: true }
    );
    console.log(ack);
    // Student.findOneAndUpdate(
    //   { _id: id },
    //   { $push: { chats: chat }, $set: { status: chatData.status } },
    //   { new: true }
    // )
    //   .then((ack) => {
    //     console.log("check 3");
    //     res.json({ msg: "messages updated", ack: ack.chats });
    //   })
    //   .catch((err) => {
    //     console.log("check 4");
    //     res.status(400).json({ msg: "error", reason: err });
    //   });

    res.send("OK");
  } else {
    console.log(chatData);
    console.log("check 5");
    res.send({ msg: "status not defined" });
  }
});

// /user/profile?profileId=656c2da21dec2fdbb0b2310c
UserRoute.post("/profile", verifyToken, async (req, res, next) => {
  try {
    let currentPage = req.query.page || 1;
    let pageSize = req.query.size || 15;

    console.log(pageSize);
    let userId = req.query.profileId;
    console.log(userId);
    let tmp = await User.findById(userId);
    let email = tmp.email;
    let user = await User.findById(userId);

    let total = await Student.countDocuments({
      registeredBy: user.email,
    });

    let students = await Student.find({ registeredBy: email })
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);

    res.json({ user, students, total });
  } catch (error) {
    res.status(501).json(error);
  }
});

export default UserRoute;
