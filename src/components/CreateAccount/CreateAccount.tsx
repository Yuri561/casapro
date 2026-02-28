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
  const [serverError, setServerError] = useState("");

  const password = watch("password");

  const passwordStrength = useMemo(() => {
    if (!password) return { label: "", color: "" };

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const conditions = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

    if (password.length >= 8 && conditions >= 3) {
      return { label: "Strong", color: "text-green-500" };
    } else if (password.length >= 6 && conditions >= 2) {
      return { label: "Medium", color: "text-yellow-500" };
    } else {
      return { label: "Weak", color: "text-red-500" };
    }
  }, [password]);

  const onSubmit = async (data: FormData) => {
    setServerError("");

    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }

    try {
      const response = await userRegister(data);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
      setServerError(
        error.response?.data?.error ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] px-4">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]">

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Your Account
        </h2>

        {serverError && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
          />
          {errors.username && (
            <p className="text-red-400 text-xs">{errors.username.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {passwordStrength.label && (
            <p className={`text-xs ${passwordStrength.color}`}>
              Strength: {passwordStrength.label}
            </p>
          )}

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-3 right-4 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateAccount;