import express from "express";
import { login } from "../controllers/auth.js";
import verifyToken from "../utils/verifyToken.js";
import jwt from "jsonwebtoken";

const AuthRoute = express.Router();

AuthRoute.get("/", (req, res, next) => {
  console.log("get auth route");
  next();
});

// /auth/login
AuthRoute.post("/login", login);

// /auth/register
// AuthRoute.post("/register", verifyToken, register);

// for frontend purpose, /auth/verify -> used for token verification
AuthRoute.post("/verify-token", verifyToken);

AuthRoute.post("/verify-token/:token", (req, res) => {
  let token = req.params.token || req.body.token;
  if (!token) {
    res.json({ msg: "token not found" });
  }

  jwt.verify(token, process.env.PRIVATE_KEY, (error, payload) => {
    if (payload) {
      console.log(payload);
      res.send({ isAuthenticated: true });
    } else {
      res.status(401).json({ error });
    }
  });
});

export default AuthRoute;
