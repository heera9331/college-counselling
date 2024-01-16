import express from "express";
import connectDB from "./utils/ConnectDB.js";
import AdminRoute from "./routes/admin.js";
import UserRoute from "./routes/user.js";
import AuthRoute from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
 
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Middleware for parsing URL-encoded request bodies 

app.use(bodyParser.urlencoded({ extended: true }));

// --- server side routing

// admin routing
app.use("/admin", AdminRoute);

// normal user or counsellor routing
app.use("/user", UserRoute);

// auth routing for authentication and authorization, token verification
app.use("/auth", AuthRoute);

// simple testing route, checking route, server is working or not?
app.get("/", (req, res, next) => {
  res.send({ msg: "reply from server" });
}); 

// server is running on post -> 8000
const PORT = process.env.PORT || 8000; 
app.listen(PORT, "0.0.0.0", () => {
  console.log("ip address:port number - " + PORT);

  // establishing the connection with mongo database (NoSQL Database)
  connectDB(process.env.MONGODB_URL); 
  console.log("connections success");
});
