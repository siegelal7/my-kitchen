import axios from 'axios';
// import {response} from 'express';
export const postRecipe = (data, id) => {
  axios.post(`http://192.168.56.1:3001/api/recipes/${id}`, data);
};

export const getRecipes = async () => {
  const response = await axios.get('http://192.168.56.1:3001/api/recipes');
  return response;
};

export const registerUser = user => {
  const response = axios.post('http://192.168.56.1:3001/api/register', user);
  return response;
};

export const loginUser = user => {
  const response = axios.post('http://192.168.56.1:3001/api/login', user);
  return response;
};

// export const getUser = () => {
//   const response = axios.get(`http://192.168.56.1:3001/api/user`);
//   return response;
// };
// export const getUser = (id, token) => {
//   const response = axios.get(`http://192.168.56.1:3001/api/user/${id}`, {
//     headers: {
//       'x-auth-token': token,
//     },
//   });
//   return response;
// };
