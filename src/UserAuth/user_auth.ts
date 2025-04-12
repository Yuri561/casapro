import axios from "axios";


export const API_URL: string = "https://casapro-backend-o0k1.onrender.com";

//user register 
export const userRegister = async (userData: any) => {
  return axios.post(`${API_URL}/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// user Login
export const userLogin = async (formData: any) => {
  return await axios.post(`${API_URL}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


// inventory request/show
export const userInventory = async (user_id: string) => {
    return await axios.post(`${API_URL}/inventory`, {user_id}, {
        headers: {
            "Content-Type": "application/json"
        },
    });
};

// inventory update 
export const updateInventory = async (_id: string, updateData: any) => {
    return await axios.put(`${API_URL}/inventory/${_id}`, updateData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  //adding data to inventory 
  export const addInventory = async (user_id: string, addedData: any) => {
    return await axios.post(
      `${API_URL}/inventory/add/${user_id}`,
      addedData,
      {
        data: addedData,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  
// update quatities 
export const updatedQuantities = async(item_id: string, decrement: number) => {
  return await axios.patch(`${API_URL}/inventory/update-quantity/${item_id}/${decrement}`, {
    headers: { "Content-Type": "application/json" }
  })
  
}

// delete inventory 
export const deleteInventory = async (item_id: string, deletedData: any) => {
  return axios.delete(
    `${API_URL}/inventory/delete/${item_id}`,
    {
      data: deletedData,
      headers: { "Content-Type": "application/json" }
    }
  );
};

// add budget goal
export const addBudget = async  (user_id: string, budgetData: any) => {
  return await axios.post(
    `${API_URL}/budget-goal/add/${user_id}`,
    budgetData,
    {
      headers: {"Content-Type": "application/json"}
    }
  )
}

//show user budget goal
export const showBudget = async (user_id: string) => {
  return await axios.get(`${API_URL}/budget-goal/${user_id}`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
}

// delete budget goal by cat
export const deleteBudget = async (userId: string, category: string) => {
  await axios.delete(`${API_URL}/remove-goal/${userId}`, {
    data: { category }, 
    headers: {
      "Content-Type": "application/json"
    }
  });
};