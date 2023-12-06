import jwt from "jsonwebtoken";

const verifyAdmin = async (req, res, next) => {
  try {
    let token = req.body.token;

    jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
      if (payload) {
        if (payload.isAdmin) {
          console.log("admin verified");

          next();
        } else {
          console.log("header sent -> verify admin");
          res.status(400).json({ msg: "your not admin" });
          // next();
        }
      } else {
        console.log(err);
        req.status(400).json({ error: err });
      }
    });
  } catch (error) {
    console.log('error in verification');
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export default verifyAdmin;
