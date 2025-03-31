import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../UserAuth/user_auth";

const Login: React.FC = () => {
    // ✅ State for form data and error handling
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    // ✅ Handle input changes correctly
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Submit form and handle login request
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            // ✅ Send login data to Flask API
            const response = await userLogin(formData);

            // ✅ Check if login is successful
            if (response.status === 200) {
                // ✅ Store user data in local storage
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/userDashboard"); // ✅ Correct path
            }
        } catch (error: any) {
            // ✅ Handle errors correctly
            if (error.response && error.response.data) {
                // If Flask returns an error message
                setError(error.response.data.error || "Login error. Please try again.");
            } else {
                // Generic error message
                setError("Login failed. Please check your credentials.");
            }
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Login to Casa Pro</h2>

            {/* ✅ Show error message if there's an error */}
            {error && (
                <div className="text-red-500 mb-4 bg-red-100 px-4 py-2 rounded-lg">
                    {error}
                </div>
            )}

            {/* ✅ Login form */}
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
