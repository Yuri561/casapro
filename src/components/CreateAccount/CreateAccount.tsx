import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../UserAuth/user_auth";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const CreateAccount: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await userRegister(data);
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center sm:text-center min-h-screen bg-gray-100">
      <h2 className="text-3xl text-center font-bold text-gray-900 mb-6">
        Create Your Casa Pro Account
      </h2>
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
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required", 
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            
           }
        )}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="w-full cursor-pointer bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
