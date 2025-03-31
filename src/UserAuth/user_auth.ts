import axios from "axios";

const API_URL: string = "https://casapro-backend-o0k1.onrender.com";

// User Registration
export const userRegister = async (userData: any) => {
  return axios.post(`${API_URL}/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// User Login
export const userLogin = async (formData: any) => {
  return await axios.post(`${API_URL}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
