import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4444',
});

export async function loginUser(userLogin: { user_email: string; user_password: string }) {
  const response = await api.post('/users/login', userLogin);
  return response.data;
}

export async function registerUser(userRegister: { user_name: string; user_email: string; user_password: string }) {
  const response = await api.post('/users', userRegister);
  return response.data;
}
