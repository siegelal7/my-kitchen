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

module.exports = router;
