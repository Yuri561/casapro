import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin} from "../../UserAuth/user_auth";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

  interface FormData {
    username: string;
    password: string;
  }

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const onSubmit = async (data: FormData) => {
    setError("");
    setLoading(true);
  
    try {
      const response = await userLogin(data);
      if (response.status === 200) {
        const {  user } = response.data;
        setIsAuthenticated(true);
        localStorage.setItem("username", user.username);
        localStorage.setItem("user_id", user.user_id);    
        localStorage.setItem("token",  response.data.token);             
        navigate("/dashboard");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Login error. Please try again.");
        console.log('error:', error);
      } else {
        setError("Login failed. Please check your credentials.");
      }
      console.error("Error during login:", error);
    } finally {
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
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: /^[a-z]+$/,
              message: "Username must contain only lowercase letters",
            },
          })}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          required
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>
        )}
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          required
        />
         {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-teal-500 cursor-pointer text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
