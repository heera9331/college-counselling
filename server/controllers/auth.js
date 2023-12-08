import Student from "../models/Student.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fs from "fs";

export const login = async (req, res, next) => {
  console.log("/auth/login");
  try {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    console.log("email - ", email);
    console.log("password - ", password);

    
    // console.log(await User.find())
    let user = await User.findOne({ email: email });

    if (user) {
      if (password === user.password) {
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
              res.status(200).send({
                token: token,
                isAdmin: user.isAdmin,
                userId: user._id,
              });
            }
            // token nahi generate hua
            if (!token) res.status(400).send({ msg: "token generation error" });
          }
        );
      } else {
        res.status(400).send({ msg: "wrong password" });
      }
    } else {
      res.status(401).json({ msg: "user not found" });
    }

    // User.findOne({ email: email }).then((user) => {
    //   if (user) {
    //   } else {
    //     res.status(401).json({ msg: "user not found" });
    //   }
    // });
  } catch (error) {
    res.send({ msg: "error", error });
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
