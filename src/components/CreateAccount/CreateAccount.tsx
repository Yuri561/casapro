import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../UserAuth/user_auth";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateAccount: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordStrength = useMemo(() => {
    if (!password) return { label: "", color: "" };

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?\":{}|<>]/.test(password);

    const conditions = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

    if (password.length >= 8 && conditions >= 3) {
      return { label: "✅ Strong", color: "text-green-600" };
    } else if (password.length >= 6 && conditions >= 2) {
      return { label: "⚠️ Medium", color: "text-yellow-500" };
    } else {
      return { label: "❌ Weak", color: "text-red-500" };
    }
  }, [password]);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
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
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3 right-4 text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}
        {passwordStrength.label && (
          <p className={`text-sm mb-3 ${passwordStrength.color}`}>
            Password Strength: {passwordStrength.label}
          </p>
        )}

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: "Please confirm your password" })}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-3 right-4 text-gray-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
