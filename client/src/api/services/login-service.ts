import { axiosInstance } from '@/lib/axios';
import LoginInfo from '../models/LoginInfo';

export default function login(user: LoginInfo) {
  const api = import.meta.env.VITE_API_URL;

  return axiosInstance.post(`${api}/login`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Error while logging in: ', error);
    throw error;
  });
}