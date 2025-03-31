import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../UserAuth/user_auth";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Login: React.FC = () => {
    // ✅ State for form data and error handling
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    // ✅ Handle input changes correctly
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 
        setLoading(true);
        try {
     
            const response = await userLogin(formData);
            if (response.status === 200) {
    
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/dashboard"); 
            }
        } catch (error: any) {
      
            if (error.response && error.response.data) {
        
                setError(error.response.data.error || "Login error. Please try again.");
            } else {
     
                setError("Login failed. Please check your credentials.");
            }
            console.error("Error during login:", error);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading && <LoadingAnimation />}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Login to Casa Pro</h2>

  
            {error && (
                <div className="text-red-500 mb-4 bg-red-100 px-4 py-2 rounded-lg">
                    {error}
                </div>
            )}

   
            <form
                onSubmit={handleSubmit}
                className="w-96 bg-white p-6 rounded-lg shadow-lg"
            >
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="Username"
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-teal-500 cursor-pointer text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
