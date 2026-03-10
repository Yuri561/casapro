import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../UserAuth/user_auth";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const onSubmit = async (data: FormData) => {
    setError("");
    setLoading(true);

    try {
      const response = await userLogin(data);

      if (response.status === 200) {
        const { user, token } = response.data;

        setIsAuthenticated(true);
        localStorage.setItem("username", user.username);
        localStorage.setItem("user_id", user.user_id);
        localStorage.setItem("token", token);
        console.log("user_id:", user.user_id)
        navigate("/dashboard");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
        "Login failed. Please check your credentials."
      );
      console.error("Login error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

      {loading && <LoadingAnimation />}

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]">

        {/* Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Login to access your Casa Pro dashboard
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Username */}
          <div>
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
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-0 outline-none"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-2">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-0 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-400 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;