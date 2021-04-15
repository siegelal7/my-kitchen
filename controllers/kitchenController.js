const router = require("express").Router();
const db = require("../models");

// New kitchen route
router.post("/api/kitchen", (req, res) => {
  // console.log(req.body);
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

// Get a kitchen with all the info
router.get("/api/kitchen/:id", (req, res) => {
  // getKitchenById(req.params.id)
  db.Kitchen.findById(req.params.id)
    .populate("owner")
    .populate("participants")
    .populate("recipes")
    .then((found) => res.json(found))
    .catch((err) => res.status(400).json(err));
});

//  add a user to a kitchen
router.put("/api/addparticipant/:id", (req, res) => {
  const newPerson = Object.keys(req.body)[0];

  db.Kitchen.findByIdAndUpdate(
    req.params.id,
    {
      $push: { participants: newPerson },
    },
    { new: true }
  )
    .populate({ path: "participants", select: "-password -email" })
    .then(
      (nowNow) =>
        // res.json(nowNow);
        db.User.findByIdAndUpdate(
          newPerson,
          {
            $push: { kitchens: nowNow._id },
          },
          { new: true }
        ).then((newnewnew) => {
          // console.log("got here");
          res.json(newnewnew);
        })
      // .catch((error) => res.status(400).json(error))
    )
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
        // .populate("kitchens")
        .populate({ path: "kitchens", populate: { path: "recipes" } })
        .populate({ path: "kitchens", populate: { path: "participants" } })
        .then((found) => {
          // console.log("eh");
          res.json(found);
        });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete a kitchen
router.delete("/api/kitchen/:id", (req, res) => {
  db.Kitchen.findByIdAndDelete(req.params.id).then((del) =>
    db.User.findByIdAndUpdate(
      del.owner,
      {
        $pull: { kitchens: del._id },
      },
      { new: true }
    )
      .then((removedBoth) => res.json(removedBoth))
      .catch((err) => res.status(400).json(err))
  );
});

// add an existing recipe to a kitchen specifically
router.put("/api/kitchen/addrecipe/:id", (req, res) => {
  const body = Object.keys(req.body)[0];
  console.log(body);
  const id = req.params.id;
  db.Kitchen.findByIdAndUpdate(id, { $push: { recipes: body } }, { new: true })
    .populate("recipes")
    .then((newNew) => res.json(newNew))
    .catch((err) => res.status(400).json(err));
});

const both = (newNew, id, res, req) => {
  // console.log(newNew);
  db.User.findByIdAndUpdate(req.body.authorId, {
    $push: { recipes: newNew._id },
  }).then((resp) =>
    db.Kitchen.findByIdAndUpdate(
      id,
      { $push: { recipes: newNew._id } },
      { new: true }
    )
      .populate("recipes")
      // .populate({ path: "kitchens", populate: { path: "recipes" } })
      .then((response) => res.json(response))
  );
};

// add a NEW RECIPE to a kitchen specifically
router.post("/api/kitchen/newrecipe/:id", (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  db.Recipe.create(req.body)
    .then(
      (newNew) => both(newNew, id, res, req)
      // db.Kitchen.findByIdAndUpdate(
      //   id,
      //   { $push: { recipes: newNew._id } },
      //   { new: true }
      // )
      //   .populate("recipes")
      //   // .populate({ path: "kitchens", populate: { path: "recipes" } })
      //   .then((response) => res.json(response))
    )
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
