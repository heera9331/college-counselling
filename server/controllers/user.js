import User from "../models/User.js";

const registerUser = async (req, res, next) => {
  try {
    let user = req.body.user;

    const newUser = new User(user);
    const registeredUser = await newUser.save();
    console.log(registeredUser);
    if (!registeredUser.errors) {
      res.status(200).send({ user: registeredUser });
    } else {
      res
        .status(500)
        .send({ msg: "user already exits", reason: registeredUser.errors });
    }
  } catch (err) {
    console.log({ msg: "/admin/register" });
    res.status(500).send({ error: err });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.user._id,
      { $set: req.body.user },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    console.log(req.body);

    // return;
    let id = req.query.id;
    let isAdmin = req.body.isAdmin;
    console.log(id);
    // return;
    // check if user is admin using admin can't be deleted
    let tmp = await User.findOne({ _id: id });
    console.log(tmp);

    if (tmp && tmp.isAdmin) {
      if (tmp.isAdmin) console.log("your not authorized to delete admin");
      else res.status(404).send({ reason: "user not found" });
    } else {
      let user = await User.findByIdAndDelete(id);
      if (user) res.send({ msg: "deleted", user: user });
      else res.status(404).json({ msg: "user not found" });
    }

    // res.status(200).send({ msg: "User has been deleted.", user: user });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "error /admin/remove-user -> controller" });
  }
};

const getUser = async (req, res, next) => {
  try {
    let user = null;

    // if id no defined than we find user through email
    if (!req.params.id) {
      user = await User.findOne({ email: req.body.email });
    } else {
      user = await User.findById(req.params.id);
    }
    console.log(req.body.students);
    res.status(200).json({ user: user, students: req.students });
  } catch (err) {
    console.log("error::getUser", err);
    res.status(500).json({ msg: err.message });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next();
  }
};

export { registerUser, getUser, getUsers, updateUser, deleteUser };
