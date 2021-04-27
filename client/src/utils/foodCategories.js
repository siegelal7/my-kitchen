// const foodCategories = [
//   'Beef',
//   'Poultry',
//   'Vegetarian',
//   'Soup',
//   'Lorem',
//   'Ipsum',
//   'Keto',
// ];
export const foodCategories = [
  {category: 'Beef'},
  {category: 'Poultry'},
  {category: 'Veggie'},
  {category: 'Soup'},
  {category: 'Pasta'},
  {category: 'Pork'},
  {category: 'Dessert'},
  {category: 'Breakfast'},
  {category: 'Baking'},
  {category: 'Keto'},
];
// export const foodChoicesRecipeEntry = () => {
//   const arr = [];
//   for (let i = 0; i < foodCategories.length; i++) {
//     arr.push(foodCategories[i].category);
//   }
//   return arr;
//   // foodCategories.map(blah => blah.category);
// };
export const foodChoicesRecipeEntry = foodCategories.map(i => i.category);

// const justValues = arr => arr.map(foo => Object.values(foo));
// export const foodChoicesRecipeEntry = justValues(foodCategories);
// export const foodChoicesRecipeEntry = () => {
//   return foodCategories.map(itm => Object.values(itm));
// };

// export default foodCategories;
