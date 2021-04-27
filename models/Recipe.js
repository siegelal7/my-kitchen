const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {
    type: String,
  },
  instructions: {
    // type: Array,
    type: String,
  },
  author: {
    type: String,
  },
  category: { type: String },
  ingredients: [
    {
      type: String,
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
