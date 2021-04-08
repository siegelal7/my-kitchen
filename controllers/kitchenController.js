const router = require("express").Router();
const db = require("../models");

router.post("/api/kitchen", (req, res) => {
  console.log(req.body);
  db.Kitchen.create(req.body)
    .then((newKitchen) =>
      db.User.findByIdAndUpdate(
        req.body.owner,
        {
          $push: { kitchens: newKitchen._id },
        },
        { new: true }
      )
        .then((response) => {
          res.json(response);
        })
        .catch((error) => res.status(400).json(error))
    )
    .catch((err) => res.status(400).json(err));
});

router.get("/api/kitchen/:id", (req, res) => {
  db.Kitchen.findById(req.params.id)
    .populate("owner")
    .populate("participants")
    .then((found) => res.json(found))
    .catch((err) => res.status(400).json(err));
});

router.put("/api/addparticipant/:id", (req, res) => {
  //   console.log(req.body);
  const newPerson = Object.keys(req.body)[0];
  //   console.log(newPerson);
  //   const found = db.Kitchen.findById(req.params.id);
  //   console.log(found);
  //   found.update({ $push: { participants: newPerson } });
  db.Kitchen.findByIdAndUpdate(
    req.params.id,
    {
      $push: { participants: newPerson },
    },
    { new: true }
  )
    .then((nowNow) => {
      res.json(nowNow);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
