import express, { response } from "express";
import verifyToken from "../utils/verifyToken.js";
import verifyAdmin from "../utils/verifyAdmin.js";
import validateUser from "../utils/validateUser.js";

import {
  registerUser,
  deleteUser,
  updateUser,
  getUsers,
  getUser,
} from "../controllers/user.js";

import {
  deleteStudent,
  getStudentByCategory,
  getStudents,
  getStudent,
  updateStudent,
} from "../controllers/student.js";

// importing model
import User from "../models/User.js";
import Student from "../models/Student.js";

const AdminRoute = express.Router();

// register new counsellor -> admin/register
AdminRoute.post(
  "/register",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      let user = req.body.user;

      if (!validateUser(user)) {
        res.send({
          msg: "user validation error or required fields are missing",
        });
      }

      registerUser(req, res, next);
    } catch (err) {
      res.send({ error: err });
    }
  }
);

AdminRoute.post("/update-user", (req, res, next) => {
  req.body.token = req.query.token;
  // add params
  req.params.id = req.query.id;
  // verifyToken(req, res, next);
  console.log(req.body);
  updateUser(req, res, next);

  // res.send({ msg: "ha work kar raha kush" });
});

// /admin/user/search

AdminRoute.post(
  "/user/search",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      let query = req.query;
      let token = query.token;
      console.log(token);
      req.body.token = token;

      let searchKeyword = query.query;
      console.log(searchKeyword);

      const searchQuery = {
        $or: [
          { name: { $regex: searchKeyword, $options: "i" } },
          { email: { $regex: searchKeyword, $options: "i" } },
        ],
      };

      // Perform the search in the User collection
      User.find(searchQuery)
        .then((users) => {
          res.send({ query: searchKeyword, result: users });
          console.log("data sent -> /admin/user/search");
        })
        .catch((err) => {
          console.log("error while search");
          res.send({ msg: "error while search" + err });
        })
        .limit(15);
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "error" });
    }
  }
);

// search by id
// /admin/user/search
AdminRoute.post(
  "/user/searchById",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      console.log(req.body);
      let user = await User.findById(req.body.userId);
      console.log(user);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

// /admin/student/search

AdminRoute.post(
  "/student/search",
  verifyToken,
  verifyAdmin,
  (req, res, next) => {
    try {
      let query = req.query;
      let token = query.token;
      console.log(token);
      req.body.token = token;

      let searchKeyword = query.query;
      console.log(searchKeyword);

      const searchQuery = {
        $or: [
          { name: { $regex: searchKeyword, $options: "i" } },
          { email: { $regex: searchKeyword, $options: "i" } },
        ],
      };

      // Perform the search in the User collection
      Student.find(searchQuery)
        .then((students) => {
          console.log(students);
          res.send({ query: searchKeyword, result: students });
          console.log("data sent -> /admin/student/search");
        })
        .catch((err) => {
          console.log("error while search");
          res.send({ msg: "error while search " + err });
        });
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "error" });
    }
  }
);

AdminRoute.post(
  "/remove-student",
  verifyToken,
  verifyAdmin,
  (req, res, next) => {
    try {
      console.log(req.query.id);
      deleteStudent(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }
);

AdminRoute.post(
  "/remove-user",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    console.log(req.body);

    // verifyAdmin(req, res, next);
    deleteUser(req, res, next);
    // res.send({ msg: "working" });
  }
);

// update student by admin using student object id

AdminRoute.post(
  "/update-student",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      let _id = req.body.student._id;
      let updated = req.body.student;

      console.log("updated", updated);

      let reponse = await Student.updateOne({ _id }, { $set: updated });

      if (reponse) {
        res.status(200).json({ response });
      } else {
        res.status(400).json({ error });
      }
    } catch (error) {
      console.log("problem -/admin/update-student/");
      res.status(400).json({ error });
    }
  }
);

// /admin/dashboard/get-students
AdminRoute.post(
  "/dashboard/get-students",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      console.log("/admin/dashboard/get-students");
      getStudentByCategory(req, res, next);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);

// /admin/view-report/student/id

AdminRoute.post(
  "/view-report/get-student",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    console.log(req.body);
    getStudent(req, res, next);

    // res.json({ msg: "Working" });
  }
);

// /view-report/get-counsellor/:id
AdminRoute.post(
  "/view-report/get-counseller",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    req.params.id = req.body.id;
    getUser(req, res, next);
  }
);

AdminRoute.post(
  "/dashboard/get-counsellors",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      console.log("/admin/dashboard/get-counsellors");
      getUsers(req, res, next);
    } catch (error) {
      console.log("Error :: dashboard.get-counsellors");
      res.status(404).json({ error: error });
    }
  }
);

// for frontend
// /admin/view-reports
AdminRoute.post("/view-reports", verifyToken, verifyAdmin, (req, res, next) => {
  // getStudents require query to search student
  req.query.query = "";
  getStudents(req, res, next);
  // res.json({ msg: "working" });
});

export default AdminRoute;
