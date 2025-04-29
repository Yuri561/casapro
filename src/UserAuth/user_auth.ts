import axios from "axios";

export const API_URL = "https://casapro-backend-o0k1.onrender.com";

// Basic config function to automatically add token
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    withCredentials: true,
  };
};

// --------------------- AUTH ---------------------

// User register
export const userRegister = async (userData: any) => {
  return axios.post(`${API_URL}/register`, userData, {
    headers: { "Content-Type": "application/json" },
  });
};

// User login
export const userLogin = async (formData: any) => {
  return axios.post(`${API_URL}/login`, formData, {
    headers: { "Content-Type": "application/json" },
  });
};

// User logout
export const userLogout = async () => {
  return axios.post(`${API_URL}/logout`, null, getAuthConfig());
};

// Verify user
export const verifyUser = async () => {
  return axios.get(`${API_URL}/verify`, getAuthConfig());
};

// --------------------- INVENTORY ---------------------

// Fetch inventory
export const userInventory = async () => {
  return axios.post(`${API_URL}/inventory`, {}, getAuthConfig());
};

// Update an inventory item
export const updateInventory = async (_id: string, updateData: any) => {
  return axios.put(`${API_URL}/inventory/${_id}`, updateData, getAuthConfig());
};

// Add a new inventory item
export const addInventory = async (addedData: any) => {
  return axios.post(`${API_URL}/inventory/add`, addedData, getAuthConfig());
};

// Update item quantities
export const updatedQuantities = async (item_id: string, decrement: number) => {
  return axios.patch(`${API_URL}/inventory/update-quantity/${item_id}/${decrement}`, {}, getAuthConfig());
};

// Delete an inventory item
export const deleteInventory = async (item_id: string) => {
  return axios.delete(`${API_URL}/inventory/delete/${item_id}`, getAuthConfig());
};

// --------------------- HISTORY ---------------------

// Fetch inventory history
export const getInventoryHistory = async () => {
  return axios.get(`${API_URL}/inventory/history`, getAuthConfig());
};

// --------------------- BUDGET ---------------------

// Add a budget goal
export const addBudget = async (budgetData: any) => {
  return axios.post(`${API_URL}/budget-goal/add`, budgetData, getAuthConfig());
};

// Fetch all budget goals
export const showBudget = async () => {
  return axios.get(`${API_URL}/budget-goal`, getAuthConfig());
};

// Delete a budget goal
export const deleteBudget = async (category: string) => {
  return axios.delete(`${API_URL}/remove-goal/`, {
    ...getAuthConfig(),
    data: { category },
  });
};