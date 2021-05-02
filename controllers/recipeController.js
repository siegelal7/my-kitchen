const router = require("express").Router();
const db = require("../models");
// const auth = require("../middleware/auth");

router.post("/api/recipes/:id", (req, res) => {
  const id = req.params.id;

  db.Recipe.create(req.body)
    .then((newNew) => {
      db.User.findByIdAndUpdate(
        id,
        { $push: { recipes: newNew._id } },
        { new: true }
      )
        .then((all) => {
          res.json(all);
        })
        .catch((err) => res.status(400).json(err));
    })
    // added not tested
    .catch((err) => res.status(400).json(err));
});

router.get("/api/recipes", (req, res) => {
  db.Recipe.find({})
    .then((all) => {
      res.json(all);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/limitrecipes", (req, res) => {
  db.Recipe.find({})
    .limit(15)
    .then((all) => {
      res.json(all);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/recipes/:name", (req, res) => {
  const name = req.params.name;
  db.Recipe.find({ title: { $regex: name } })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
