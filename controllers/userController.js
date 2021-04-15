const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

// const crypto = require("crypto");

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await await db.User.findOne({ email }).populate({
      path: "kitchens",
      populate: { path: "participants" },
    });
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    if (!token) throw Error("Couldn't sign the token");

    res.status(200).json({
      token,
      // user: {
      id: user._id,
      username: user.username,
      email: user.email,
      kitchens: user.kitchens,
      recipes: user.recipes,
      // },
    });
  } catch (e) {
    res.status(400).json({ msg: e.msg });
  }
});

router.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await db.User.findOne({ email }).populate({
      path: "kitchens",
      populate: { path: "participants" },
    });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new db.User({
      username,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      // user: {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      kitchens: savedUser.kitchens,
      recipes: savedUser.recipes,
      // },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/api/user/:id", (req, res) => {
  const id = req.params.id;

  db.User.findById(id)

    .populate({ path: "recipes" })
    .populate({ path: "kitchens", populate: { path: "participants" } })
    .populate({ path: "kitchens", populate: { path: "recipes" } })
    // .populate({ path: "kitchens", populate: { path: "owner" } })
    .then((found) => {
      res.json(found);
    });
});

router.get("/api/finduser/:name", async (req, res) => {
  const name = req.params.name;
  db.User.find({ username: { $regex: name } })
    .then((found) => {
      // console.log(found);
      if (found.length > 0) {
        res.json(found);
        return;
      }

      const deleteFirstLetter = name.split("").slice(1).join("");
      // console.log(deleteFirstLetter.split("").slice(0, 7)).join("");
      db.User.find({ username: { $regex: deleteFirstLetter } })
        .then((nowFound) => {
          console.log("got here");
          res.json(nowFound);
        })
        .catch((error) => res.status(400).json(error));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
