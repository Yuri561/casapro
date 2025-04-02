import axios from "axios";

export const API_URL: string = "https://casapro-backend-o0k1.onrender.com";


export const userRegister = async (userData: any) => {
  return axios.post(`${API_URL}/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const userLogin = async (formData: any) => {
  return await axios.post(`${API_URL}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


// inventory request
export const userInventory = async (user_id: string) => {
    return await axios.post(`${API_URL}/inventory`, {user_id}, {
        headers: {
            "Content-Type": "application/json"
        },
    });
};

export const updateInventory = async (_id: string, updateData: any) => {
    return await axios.put(`${API_URL}/inventory/${_id}`, updateData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  