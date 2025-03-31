import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../UserAuth/user_auth";


const [formData, setFormData] = useState({username: "", password: ""})
const [, setError] = useState("")
const navigate = useNavigate();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
}

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
        const response = await userLogin(formData);
        if(response.status === 200 ){
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("../../Pages/userDashboard");
        };
    }
    catch (error) {
        setError("Invalid credentials please try again!")
        console.log(error)
    }
}


const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Login to Casa Pro</h2>
      <form onSubmit={handleSubmit}
      className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <input
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <button className="w-full bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
