import axios from "axios";
import { Product } from "../components/Hooks/useInventory";

export const API_URL = "https://casapro-backend-o0k1.onrender.com";

// Config for all auth-based requests
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// const userConfig = {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   }
// }
// --------------------- AUTH ---------------------

export const userRegister = async (userData: any) => {
  return axios.post(`${API_URL}/register`, userData, config);
};

export const userLogin = async (formData: any) => {
  return axios.post(`${API_URL}/login`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};


export const userLogout = async () => {
  return axios.post(`${API_URL}/logout`, null, config);
};

// export const verifyUser = async () => {
//   return axios.get(`${API_URL}/verify`, userConfig);
// };

// --------------------- INVENTORY ---------------------

export const userInventory = async () => {
  return axios.post(`${API_URL}/inventory`, {}, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,  
  });
};
export const updateInventory = async (_id: string, updateData: any) => {
  return axios.put(`${API_URL}/inventory/${_id}`, updateData, config);
};

export const addInventory = async (addedData: any) => {
  return axios.post(`${API_URL}/inventory/add`, addedData, config);
};

export const updatedQuantities = async (item_id: string, decrement: number) => {
  return axios.patch(`${API_URL}/inventory/update-quantity/${item_id}/${decrement}`, {}, config);
};

export const deleteInventory = async (item_id: string, _item?: Product) => {
  return axios.delete(`${API_URL}/inventory/delete/${item_id}`, config);
};

// --------------------- HISTORY ---------------------

export const getInventoryHistory = async () => {
  return axios.get(`${API_URL}/inventory/history`, config);
};

// --------------------- BUDGET ---------------------

export const addBudget = async (budgetData: any) => {
  return axios.post(`${API_URL}/budget-goal/add`, budgetData, config);
};

export const showBudget = async () => {
  return axios.get(`${API_URL}/budget-goal`, config);
};

export const deleteBudget = async (category: string) => {
  return axios.delete(`${API_URL}/remove-goal/`, {
    ...config,
    data: { category }, 
  });
};
