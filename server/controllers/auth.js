import Student from "../models/Student.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fs from "fs";

export const login = async (req, res, next) => {
  console.log("/auth/login");
  try {
    let email = req.body.email;
    let password = req.body.password;
    console.log("email - ", email);
    console.log("password - ", password);

    if (!email || !password) {
      return res.json({ error: "Missing fields" });
    }

    // console.log(await User.find())
    let user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    // generating token -> payload is {isAdmin: true and email: "admin email"}
    // jwt.sign(payload, "secrete key", callback==> (err, token)

    jwt.sign(
      { email: user.email, isAdmin: user.isAdmin },
      process.env.PRIVATE_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        console.log(token);
        // error nahi hai
        if (!err) {
          console.log("logined");
          return res.send({
            token: token,
            isAdmin: user.isAdmin,
            userId: user._id,
          });
        }
        // token nahi generate hua

        return res.json({ error: "token generation error" });
      }
    );
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
};

// export const register = (req, res, next) => {

//   console.log("/auth/register");
//   // let's find teacher name
//   let student = req.body.student;
//   let token = req.body.token;
//   let date = new Date();

//   jwt.verify(token,process.env.PRIVATE_KEY, (err, payload) => {
//     if (payload) {
//       student.registeredBy = payload.email;
//       student.date = date;
//     }
//   });

//   console.log(student);

//   Student.insertMany(student)
//     .then((value) => {
//       console.log("value", value);
//       res.status(201).send({ student: value });
//     })
//     .catch((err) => {
//       // bad request
//       res.status(400).send({ reason: 'user already exist' });
//     });
// };
