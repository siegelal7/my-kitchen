const router = require("express").Router();
const db = require("../models");
// const auth = require("../middleware/auth");

// router.get("/api/videouploads", (req, res) => {
//   db.ContentCreator.find({})
//     .populate("kits")
//     .then((found) => {
//       res.json(found);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });
router.post("/api/recipes", (req, res) => {
  db.Recipe.create(req.body)
    .then((newRec) => {
      res.json(newRec);
    })
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
