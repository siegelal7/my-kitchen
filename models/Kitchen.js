const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KitchenSchema = new Schema({
  name: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  groceryList: [{ type: String }],
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Kitchen = mongoose.model("Kitchen", KitchenSchema);
module.exports = Kitchen;
