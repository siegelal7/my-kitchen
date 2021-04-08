const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //   name: {
  //     type: String,
  //     // required: true,
  //   },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  kitchens: [{ type: Schema.Types.ObjectId, ref: "Kitchen" }],
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
