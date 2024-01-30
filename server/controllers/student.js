import Student from "../models/Student.js";
import validateStudent from "../utils/validateStudent.js";
import jwt from "jsonwebtoken";

export const registerStudent = (req, res, next) => {
  console.log("/user/register");
  // let's find teacher name
  let student = req.body.student;
  let token = req.body.token;
  let date = new Date().toTimeString();

  jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
    if (payload) {
      student.registeredBy = payload.email;
      student.date = date;
    } else {
      console.log(err);
      res.status(404).json({ error: err });
    }
  });

  console.log(student);
  if (!validateStudent(student)) {
    console.log("validation failed");
    return res.status(400).json({ msg: "validation failed" });
  }

  Student.insertMany(student)
    .then((value) => {
      console.log("value", value);
      res.status(201).send({ student: value });
    })
    .catch((err) => {
      // bad request
      console.log("student insertmany", err);
      res.status(400).send({ msg: "user already exist", error: err });
    });
};

export const getStudent = (req, res, next) => {
  try {
    let id = req.body.id;
    console.log("student controller find through id");
    // if counsellor is admin then we send all info of student
    if (req.body.isAdmin) {
      Student.findOne({ _id: id })
        .then((value) => {
          console.log(value);
          res.status(200).send({ student: value });
        })
        .catch((reason) => {
          res.status(505).send({ error: reason });
        });
    } else {
      Student.findOne(
        {
          _id: id,
          status: { $in: ["PENDING", "NOTINTERESTED", "PARTIALINTERESTED"] },
        },
        { mobile: 1, name: 1, email: 1, chats: 1, status: 1 }
      )
        .then((value) => {
          if (value) {
            console.log(value);
            res.status(200).send({ student: value });
          } else {
            res.status(200).send({
              id: id,
              msg: "student already interested or not exists",
            });
          }
        })
        .catch((err) => {
          if (err) {
            res.status(400).send({ msg: "student not found" });
          }
        });
    }
  } catch (err) {
    res.status(505).send({ error: err });
  }
};

// only used by admin
// /user/get-students
// -> admin/get-students
// admin/dashboard/get-students
// /admin/view-reports

export const getStudents = (req, res, next) => {
  try {
    let searchKeyword = req.query.query;
    console.log(searchKeyword);
    const searchQuery = {
      $or: [
        { name: { $regex: searchKeyword, $options: "i" } },
        { email: { $regex: searchKeyword, $options: "i" } },
      ],
    };

    // Perform the search in the User collection
    Student.find(searchQuery)
      .then((users) => {
        console.log(users);
        res.send({ query: searchKeyword, result: users });
        console.log("data sent -> /admin/search");
      })
      .catch((err) => {
        console.log("error while search");
        res.status(400).json({ msg: "error while search", error: err });
      });
  } catch (err) {
    console.log(err);
    res.status(505).json({ error: err });
  }
};

// get students by category

export const getStudentByCategory = async (req, res, next) => {
  try {
    let currentPage = req.query.page || 1;
    let pageSize = req.query.size || 15;
    let searchKeyword = req.query.query;
    let status = req.body.status;
    console.log(status);
    // Perform the search in the User collection
    let total = await Student.countDocuments({ status });
    let users = await Student.find({ status })
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);

    return res.json({ query: searchKeyword, result: users, total });
    // old code
    // Student.find({ status: status })
    //   .then((users) => {
    //     console.log(users);
    //     res.send({ query: searchKeyword, result: users });
    //     console.log("data sent -> /admin/search");
    //   })
    //   .catch((err) => {
    //     console.log("error while search");
    //     res.json({ msg: "error while search", error: err });
    //   });
  } catch (error) {
    console.log(error);
    res.status(505).json({ error });
  }
};

// only used by admin
export const updateStudent = (req, res, next) => {
  try {
    let id = req.body.id;
    let newChat = req.body.chat;

    // normal counsellor
    if (!req.body.isAdmin) {
      const result = User.findByIdAndUpdate(
        { id: id },
        { $push: { chats: newChat } },
        { new: true }
      );

      result.then((ack, err) => {
        if (ack) {
          res.status(200).send({ msg: "updated" });
        } else {
          res.send({ msg: "error", reason: err });
        }
      });
    } else {
      // admin
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(505).send({ error: err });
  }
  next();
};

export const deleteStudent = async (req, res, next) => {
  try {
    let id = req.query.id;
    console.log(id);
    const del = await Student.findByIdAndDelete(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    console.log(del);
    res.status(200).json({ student: del });
  } catch (err) {
    res.status(500).send({ error: err });
  }
  next();
};
