import axios from 'axios';
// import {response} from 'express';
export const postRecipe = async (data, id) => {
  return await axios.post(`http://10.0.0.50:3001/api/recipes/${id}`, data);
};

export const postRecipeToKitchen = async (kitchen, payload) => {
  return await axios.post(
    `http://10.0.0.50:3001/api/kitchen/newrecipe/${kitchen}`,
    payload,
  );
};

export const getLimitRecipes = async () => {
  const response = await axios.get('http://10.0.0.50:3001/api/limitrecipes');
  // const response = await axios.get('http://192.168.56.1:3001/api/recipes');
  return response;
};

export const getAllRecipes = async () => {
  const response = await axios.get('http://10.0.0.50:3001/api/recipes');
  // const response = await axios.get('http://192.168.56.1:3001/api/recipes');
  return response;
};

export const registerUser = user => {
  const response = axios.post('http://10.0.0.50:3001/api/register', user);
  return response;
};

export const loginUser = user => {
  const response = axios.post('http://10.0.0.50:3001/api/login', user);
  return response;
};

export const searchForUser = async user => {
  const response = await axios.get(
    `http://10.0.0.50:3001/api/finduser/${user}`,
  );
  return response;
};

export const fetchKitchens = async id => {
  return await axios.get(`http://10.0.0.50:3001/api/user/${id}`);
};

export const friendToKitchen = async (idToAdd, _id) => {
  return await axios.put(
    `http://10.0.0.50:3001/api/addparticipant/${_id}`,
    idToAdd,
  );
};

// export const getUser = (id, token) => {
//   const response = axios.get(`http://192.168.56.1:3001/api/user/${id}`, {
//     headers: {
//       'x-auth-token': token,
//     },
//   });
//   return response;
// };
