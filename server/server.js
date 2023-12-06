import express from "express";
import connectDB from "./utils/ConnectDB.js";
import AdminRoute from "./routes/admin.js";
import UserRoute from "./routes/user.js";
import AuthRoute from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import User from "./models/User.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Middleware for parsing URL-encoded request bodies

// app.get("/test", async (req, res, next) => {
//   console.log(req.);

//   res.json({ msg: "working" });
// });

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/user", UserRoute);
app.use("/auth", AuthRoute);

app.get("/", (req, res, next) => {
  res.send({ msg: "reply from server" });
});

app.get("/test", async (req, res, next) => {
  // let newUser = await User.insertMany([
  //   { name: "test", email: "test@gmail.com", password: "test", isAdmin: false },
  // ]);

  let users = await User.find();

  res.json({ users });
});

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log("ip address:port number - " + PORT);

  connectDB(process.env.MONGODB_URL);
  // connectDB(process.env.MONGODB_URL_LOCAL);

  console.log("connections success");
});
