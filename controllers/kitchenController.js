const router = require("express").Router();
const db = require("../models");

const getKitchenById = (id) => {
  db.Kitchen.findById(id).populate("owner").populate("participants");
  // .then((found) => res.json(found))
  // .catch((err) => res.status(400).json(err));
};

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
  getKitchenById(req.params.id)
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

// add an item to grocery list
router.put("/api/additem/:id", (req, res) => {
  // console.log(req.body);
  const payload = Object.keys(req.body)[0];
  // console.log(payload);
  const id = req.params.id;
  db.Kitchen.findByIdAndUpdate(
    id,
    { $push: { groceryList: payload } },
    { new: true }
  )
    .then((newNew) => {
      // console.log(newNew._id);
      db.User.findById(newNew.owner)
        .populate("recipes")
        .populate("kitchens")
        .then((found) => {
          // console.log("eh");
          res.json(found);
        });
    })
    .catch((err) => res.status(400).json(err));
});

//Delete a kitchen
router.delete("/api/kitchen/:id", (req, res) => {
  // console.log(req.params.id);
  // db.Kitchen.findByIdAndDelete(req.params.id).then((del) => {
  //   res.json(del);
  // });
  db.Kitchen.findByIdAndDelete(req.params.id).then((del) =>
    db.User.findByIdAndUpdate(del.owner, {
      $pull: { kitchens: del._id },
    })
      .then((removedBoth) => res.json(removedBoth))
      .catch((err) => res.status(400).json(err))
  );
});

module.exports = router;
