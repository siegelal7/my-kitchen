const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KitchenSchema = new Schema({
  name: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  groceryList: [String],

  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Kitchen = mongoose.model("Kitchen", KitchenSchema);
module.exports = Kitchen;
