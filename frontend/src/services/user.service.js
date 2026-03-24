import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_URL = `${BASE_URL}/users/`;

const getUserProfile = () => {
  return axios.get(API_URL + "me", { headers: authHeader() });
};

const updateProfile = (userData) => {
  return axios.put(API_URL + "me", userData, { headers: authHeader() });
};

const changePassword = (oldPassword, newPassword) => {
  return axios.put(
    API_URL + "me/change-password",
    null,
    {
      params: { oldPassword, newPassword },
      headers: authHeader(),
    }
  );
};

const userService = {
  getUserProfile,
  updateProfile,
  changePassword,
};

export default userService;
