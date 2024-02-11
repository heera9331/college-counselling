import Student from "../models/Student.js";
import hasStudent from "../utils/hasStudent.js";
import validateStudent from "../utils/validateStudent.js";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res, next) => {
  try {
    console.log("/user/register");
    // let's find teacher name
    let student = req.body.student;
    let token = req.body.token;

    if (hasStudent(req.body.student) == true) {
      return res.status(400).send({ msg: "student already exist", error: {} });
    }
    if (!validateStudent(student)) {
      console.log("validation failed");
      return res.status(400).json({ msg: "validation failed" });
    }

    let payload = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log("token");

    if (!payload) {
      return res.status(400).json({ msg: "unauthorized", error: payload });
    }

    let chat = { msg: student.comment, teacher: payload.email };
    student.chats = chat;
    delete student.comment;
    student.registeredBy = payload.email;

    let resStudent = await Student.insertMany([student]);
    console.log("inserted", resStudent);
    if (resStudent) {
      return res.status(200).send({ student: resStudent });
    }

    return res.status(400).send({ msg: "something went wrong" });
  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
  }
};

export const getStudent = async (req, res, next) => {
  try {
    let id = req.body.id || req.query.studentId;
    console.log("student controller find through id");

    if (!id) {
      return res.status(404).json({
        error: "search term not there",
        msg: "define id or student id",
      });
    }
    let student = await Student.findById(id);

    if (!student) {
      return res.status(404).send({ error: student });
    }

    return res.status(200).json({ student });
  } catch (err) {
    res.status(505).send({ error: err });
  }
};

// only used by admin
// /user/get-students
// -> admin/get-students
// admin/dashboard/get-students
// /admin/view-reports

export const getStudents = async (req, res, next) => {
  try {
    let query = req.query;
    console.log(req.query);
    let searchKeyword = query.query || "";
    let pageSize = query.size || 15;
    let currentPage = query.page || 1;

    // filters
    let district = query.district || "";
    let status = query.status || "";
    let category = query.category || "";

    let registeredBy = query.registeredBy || "";
    let sortBy = query.sortBy != "" ? query.sortBy : "name" || "name";
    let order = Number(query.order) || 1; // 1  -> asc, -1 -> desc

    const searchQuery = {
      $or: [
        { name: searchKeyword },
        { name: { $regex: new RegExp(`^${searchKeyword}`, "i") } },
        { fatherName: { $regex: new RegExp(`^${searchKeyword}`, "i") } },
        { mobile: { $regex: new RegExp(`^${searchKeyword}`, "i") } },
      ],
    };

    // Check if filters are specified
    if (district || status || category || registeredBy) {
      // Initialize the additional conditions for the AND search
      const additionalConditions = {};

      // Add conditions for each specified filter
      if (district) {
        additionalConditions.district = district;
      }
      if (status) {
        additionalConditions.status = status;
      }
      if (category) {
        additionalConditions.category = category;
      }

      if (registeredBy) {
        additionalConditions.registeredBy = registeredBy;
      }

      // Add the additional conditions to the search query
      Object.assign(searchQuery, additionalConditions);
    }

    let total = await Student.countDocuments(searchQuery);

    // Perform the search in the User collection
    try {
      let students = await Student.find(searchQuery)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ [sortBy]: order });

      res.json({ query: searchKeyword, students, total });

      console.log("data sent -> /admin/search");
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "error while search", error });
    }
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
    console.log("search data sent /admin/search");
    return res.json({ query: searchKeyword, result: users, total });
  } catch (error) {
    console.log(error);
    res.status(505).json({ error });
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    let student = req.student;
    let newChat = student.newChat;
    let studentId = student._id;

    const updatedStudent = { ...student };
    // delete id and chat
    delete updatedStudent.id; // We don't want to update the _id field
    delete updatedStudent.newChat;
    delete updatedStudent.chats;

    console.log("student", student);
    console.log("to be updated", student);

    const ack = await Student.updateOne(
      { _id: studentId },
      {
        $push: { chats: newChat },
        $set: updatedStudent,
      }
    );

    console.log("updated ack", ack);
    console.log("chat ", newChat);
    res.status(200).json({ msg: "successfully updated", student: ack });
  } catch (err) {
    console.log("student updating error", err);
    return res.status(500).send({ error: err });
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    let id = req.query.id || req.query.studentId;
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
