import jwt from "jsonwebtoken";
 

const verifyToken = (req, res, next) => {
  try {
    
    console.log(req.body)
    let token = req.body.token || req.params.token;
    console.log(token);
    
    if (!token) {
      res.status(404).send({ msg: "token not found" });
    }

    console.log("verifying signature");
    jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
      if (err) {
        console.log(err);
        res.status(404).send({ error: err });
      } else {
        console.log(payload);
        req.body.isAdmin = payload.isAdmin;

        console.log("signature verified");
        next();
      }
    });
  } catch (error) {
    console.log("verifying signature error", error);
    res.status(404).send({ error });
  }
};

export default verifyToken;
