const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");

//sign token
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "flexhelp",
      sub: userID,
    },
    "flexhelp",
    { expiresIn: "1h" }
  );
};

// registration route
userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  // User.findOne({ username }, (err, user) => {
  //   if (err)
  //     res
  //       .status(500)
  //       .json({ message: { msgBody: "Error has occured", msgError: true } });
  //   if (user)
  //     res.status(400).json({
  //       message: { msgBody: "Username is already taken", msgError: true },
  //     });
  // else {
  const newUser = new User({ username, password, role });
  newUser.save((err) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Account successfully created",
          msgError: false,
        },
      });
  });
  // }
});
// });

// login endpoint route
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

// logout endpoint route
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, succes: true });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else
      res.status(403).json({
        message: { msgBody: "You're not an admin,go away", msgError: true },
      });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

// userRouter.post("/", function () {
//   console.log("this is a POST");
// });
// userRouter.get("/", function () {
//   console.log("this is a GET");
//   res.writeHead(200);
//   res.end();
// });

// userRouter.get("/", (req, res) => {
//   User.findOne().then((users) => res.json(users));
// });

module.exports = userRouter;
