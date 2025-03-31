import axios 

const API_URL: any = "https://casapro-backend-o0k1.onrender.com";

export const userRegister = async (userData: any) =>{
    return axios.post(`${API_URL}/register`, userData)
}

export const userLogin = async (userData: any) =>{
    return axios.post(`${API_URL}/login`, userData)
}