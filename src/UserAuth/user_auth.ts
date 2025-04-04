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

export const addInventory = async(user_id : string, addedData: any) => {
  return await axios.post(`${API_URL}/inventory/add/${user_id}`, addedData, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const updatedQuantities = async(item_id: string, 
 
  decrement: number) => {
  return await axios.patch(`${API_URL}/inventory/delete/${item_id}/${decrement}`, {
    headers: { "Content-Type": "application/json" }
  })
  
}
export const deleteInventory = async(item_id: string, 
  deletedData: any,
 ) => {
  return await axios.delete(`${API_URL}/inventory/delete/${item_id}`, {
    data: deletedData,
    headers: { "Content-Type": "application/json" }
  })
  
}